---
template: BlogPost
language: en
author: Santeri Salonen
slug: /gcp-deployment-manager-with-bigquery
date: 2022-05-18T13:26:50.761Z
title: Simple serverless data pipeline with GCP
disabled: true
---
I am a big fan of using AWS Cloudformation when setting up data pipelines. With Cloudformation you can write your project requirements down as a YML-configuration file.

Previous projects or pieces of a previous project can then be re-used. There is a tough learning curve, though.

Lately most of my work have involved using Google Cloud Platform (GCP) and BigQuery. GCP's "Cloudformation" is called Deployment Manager. It works roughly the same but there are differences as well, like the need to set up a lot of things still manually, through the console.

In this post I wanted to share some of the findings - in the form of step-by-step guide: How to setup a data pipeline with DM, BigQuery and Cloud functions.

The goal is simple: fetch number of daily users from a Google Analytics property and store it BigQuery table.

The key idea is that every piece of this pipeline is part of the source code (well, almost at least).

## Prerequisites

First we need to create or to have access to a Google Cloud project. 

We also need a service account with sufficient access rights. This could in theory be created through Deployment Manager but I found that overly cumbersome. 

So it is better to just accept the limitations are create these manually through the console.

![Google Cloud Platform - create a service account](/assets/create-a-service-account-gcp.png)

Once the service account is created, we need to download the keyfile. 

![Download service account keyfile (JSON)](/assets/download-service-account-key.png)

Next we will provide our service account enough access rights.

1. In Google Cloud Console, service account needs to have IAM role with Big Query Admin. (This is not exactly needed for the purpose of this tutorial but any real world application would likely need jobs.create -permission.

2. You need to also log into Google Analytics and give this service account at least read-access to the property you want to fetch data from.

In addition to the service account, you need to enable following APIs from your Google Cloud project:

* Pubsub API
* Cloud Scheduler API
* Cloud Functions API
* Cloud Build API
* Google Analytics Data API (if you are using Google Analytics 4)
* Google Analytics API (if you are using Universal Analytics)

In addition, Google APIs Service Agent (which is used Deployment Manager) needs to be able to be granted Big Query Admin -access. 

(Compared to AWS, I find GCP access management quite cumbersome, for example access to BigQuery needs to be specifically granted as it is not part of project owner or editor rights.)

Ok, now we should have everything covered. Let's start off by creating a jinja -file for the required BigQuery dataset and table. 

## 1. Create jinja templates for Deployment manager

```yml
resources:
  - type: gcp-types/bigquery-v2:datasets
    name: website_metrics
    properties:
      access:
      - role: OWNER
        userByEmail: {{ properties['service_account_email'] }}
      datasetReference:
        datasetId: {{ properties['bq_dataset_id'] }}
      location: europe-north1
  - type: gcp-types/bigquery-v2:tables
    name: daily_users
    properties:
      tableReference:
        datasetId: $(ref.website_metrics
.datasetReference.datasetId)
        tableId: {{ properties['daily_users_table'] }}
      schema:
        fields:
        - name: date
          type: DATE
        - name: users
          type: INT64
```

Let's call this `bq-template.jinja`.

This configures that we would like to setup BigQuery dataset with one table. Table has two columns: date (a string) and users (a number). So nothing very complicated about this.

Then let's create similar configuration file for the Cloud function:

```yml
resources:
  - type: gcp-types/cloudfunctions-v1:projects.locations.functions
    name: fetch-ga-function
    properties:
      serviceAccountEmail: {{ properties['service_account_email'] }}
      parent: projects/{{ env['project'] }}/locations/europe-west1
      function: fetch-ga-function
      sourceArchiveUrl: {{ properties['fetch_ga_function_zip'] }}
      entryPoint: handler
      runtime: nodejs16
      eventTrigger:
        resource: $(ref.ga-function-topic.name)
        eventType: providers/cloud.pubsub/eventTypes/topic.publish
      environmentVariables:
        BQ_DATASET_ID:  {{ properties['bq_dataset_id'] }}
        BQ_DAILY_USERS_TABLE: {{ properties['daily_users_table'] }}
  - type: gcp-types/pubsub-v1:projects.topics
    name: ga-function-topic
    properties:
      topic: ga-function-topic
  - type: gcp-types/cloudscheduler-v1:projects.locations.jobs
    name: ga-function-trigger
    properties:
      parent: projects/{{ env['project'] }}/locations/europe-west1
      description: Triggers fetch-ga-function
      schedule: "0 8 * * *" 
      timeZone: "Europe/Helsinki"
      pubsubTarget:
        topicName: $(ref.ga-function-topic.name)
```

Let's call this `function-template.jinja`.

This gets a bit more complicated, as we are creating not just the function, but also a way to trigger the function using a pub-sub topic called ga-function-topic. And then setting up a scheduled trigger that publishes a message to the topic on recurring interval. This schedule is configured as a cronjob.

# 2. Write the function code

Let's write a simple function that pulls number of users from our Google Analytics 4 property.

```javascript
const {BetaAnalyticsDataClient} = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient();
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

exports.handler = async () => {
   let date = new Date().toISOString().slice(0,10);
   const [response] = await analyticsDataClient.runReport({
      property: `222222222`, // your property ID
      dateRanges: [{
        startDate: date,
        endDate: date
      }],
      dimensions: [],
      metrics : [{name: "active1DayUsers"}],

    });
    await bigquery
      .dataset(process.env.BQ_DATASET_ID)
      .table(process.env.BQ_DAILY_USERS_TABLE)
      .insert([{
         date: date,
         users: response.rows[0].metricValues[0].value
       }]);
}
```

Let's save this file to ```function/index.js```.

## 3. Deploy


