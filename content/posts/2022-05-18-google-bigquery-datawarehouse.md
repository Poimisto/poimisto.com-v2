---
template: BlogPost
language: en
author: Santeri Salonen
slug: /google-bigquery-datawarehouse
date: 2022-05-31
title: Google BigQuery as a data warehouse
thumbnail: ../images/bigquery.png
disabled: true
---


## Datalähteet




Yrityksen näkökulmasta teknologiavalinnassa ei ole kyse pelkästään teknologiasta vaan hyödyistä ja kokonaiskustannuksista. Kustannuksiin vaikuttaa merkittävästi resursoinnin ja osaamisen tarve. BigQuery vaikuttaa tästä näkökulmasta monessa tapauksessa erittäin järkevältä valinnalta, koska se mahdollistaa a) olemassa olevan SQL-kielen osaamisen hyödyntämisen b) yksinkertaisemman arkkitehtuurin ja c) ennustemallien ja muiden analyysien teon suoraan BigQueryn päällä ilman datan liikuttamista eri työkaluihin ja d) erittäin hyvät integraatiot käytössä oleviin raportointityökaluihin kuten Google Data Studio tai Power BI. 




(tai vielä paremmin, esimerkiksi Deployment Managerin kautta YML-tiedost


datasetin luominen 

You can start using BigQuery simply by loading data and running SQL commands. There’s no need to build, deploy, or provision clusters; no need to size VMs, storage, or hardware resources; no need to setup disks, define replication, configure compression and encryption, or any other setup or configuration work necessary to build a traditional data warehouse..


Implementation. As far as the usability scale, BigQuery ranks high owing to the fully-managed nature of its data warehouses, meaning the BigQuery engineering team handles maintenance and updates and takes a lot of weight off your shoulders. But that doesn’t mean that you don’t need a data science team at all. The platform requires the knowledge of SQL commands and ETL tools. With the right experts, the processes of setup and configuration aren’t time-consuming and you can start working with BigQuery quite quickly.



## BigQuery ML

Mielenkiintoinen ominaisuus Google BigQueryssa on 

## 

## Datan vienti BigQueryyn

BigQuery supports several ways to ingest data into its managed storage. The specific ingestion method depends on the origin of the data. For example, some data sources in GCP, like Cloud Logging and Google Analytics, support direct exports to BigQuery.

BigQuery Data Transfer Service enables data transfer to BigQuery from Google SaaS apps (Google Ads, Cloud Storage), Amazon S3, and other data warehouses (Teradata, Redshift).

Streaming data, such as logs or IoT device data, can be written to BigQuery using Cloud Dataflow pipelines, Cloud DataProc jobs, or directly using the BigQuery stream ingestion API.















## ----

Kun iso yritys kasvaa isoksi se huomaa, että kenelläkään ei oikein ole kokonaiskuvaa siitä, mitä kaikkea yrityksessä tapahtuu. Siispä iso yritys ryhtyy tietovarastoinnin hankkeeseen. 

Tavoitteena on saada yrityksen kaikki data yhteismitallisesti yhteen paikkaan. Tietovarastosta (data warehouse) voidaan johdon tärkeille ihmisille raportoida myyntilukuja ja tehdä monenkirjavia piirakkakaavioita. EMEA-alueella menee näin, APAC-alueella noin.

Hankkeen kuvauksessa maalailtiin, että datavaraston avulla voidaan tehdä myös edistyneempiä kyselyitä, vaikkapa asiakaspoistuman analysoimiseksi tai segmentointia varten. (Mutta siihen ei tietenkään kenelläkään ole ollut aikaa.)

Datavarastointiin liittyviä toimintoja ovat datan mallinnus (Enterprise Data Modelling), jossa joku tyyppi suunnitelee millainen tietokannan rakenne yrityksen datan säilömiseen tarvitaan. 

Sitten tarvitaan tyyppi koodamaan logiikka, jossa data vedetään operatiivisesta järjestelmästä, prosessoidaan haluttuun muotoon ja tallennetaan varastoon (ETL eli Extract-Transform-Load). 

Lopulta Business Intelligence tyyppi osaa kirjoittaa loitsuja, jolla datan saa vastaamaan liiketoiminnan esittämiin kysymyksiin. Dataa voidaan myös raportoida ja analysoida tarkoitukseen suunnitteluilla välineillä kuten Tableaulla tai Power BI:lla.

Teknisesti ja perinteisesti datavarasto toteutetaan relaatiotietokantaan. Hyvänä käytäntönä on 

* toteuttaa [datan normalisointi](https://en.wikipedia.org/wiki/Database_normalization), eli yksi data on vain yhdessä paikassa, johon muut voivat tarvittaessa viitata.
* laatia erilaisia sääntöjä, kuten vaatimus uniikeista ostotapahtumien tunnisteista.
* tehdä toteutus jonkun vakiintuneen mallin mukaisesti, esim. [tähti-skeemassa](https://docs.microsoft.com/en-us/power-bi/guidance/star-schema#star-schema-overview) jokainen taulu on joko fakta (kuten toteutunut myynti tai toimitus) tai faktaan liittyvä ulottuvuus (kuten asiakas tai myyjä).
* ainakin sata muuta asiaa mutta ei nyt tule mieleen, koska tällainen projektikokonaisuus ja sen läpivienti ei varsinaisesti ole oman osaamiseni syvintä ydintä

Wikipedian mukaan data warehouse keksittiin terminä 1980-luvulla, eli kyse ei ole mistään kovin uudesta asiasta. Vaan enemmänkin vakiintuneesta tarpeesta. 

Viime vuosina on kuitenkin tapahtunut kehityskulkuja, jotka ovat vaikuttaneet siihen, miten erilaisia datavarastoinnin projekteja kannattaa toteuttaa.

**Tekstimuotoinen data:** esimerkiksi yrityksen asiakaspalvelun chattilokeja on vaikea tallentaa tai analysoida perinteisen relaatiotietokannan avulla.

**Datan volyymi:** esimerkiksi web-sivustojen tai applikaatioiden käyttöön liittyvä data tai sensoridataa. Tämä voitaisiin ehkä mallintaa relaatiokantaan mutta haasteeksi tulee datan volyymi ja sitä kautta varastoinnin kustannukset.

**Reaaliaikainen data:** Jos halutaan tuottaa kyvykkyys esimerkiksi anomaliatunnistukseen tai tuotesuositteluun, 

**Jatkuvasti Kehittyvät skeemat:** Relaatiokannassa olevan datavaraston skeemaa on vaikea muuttaa. Jos yritys testaa ja kehittää uusia toiminnallisuuksia tai vaikkapa hinnoittelumalleja niin datavaraston skeema voi vanhentua käsiin. Lisäksi tietosuojanäkökulmasta asiakkaisiin liittyvää dataa tulisi kerätä vain tarpeesen, jolloin skeeman tulisi voida pävittää tarpeiden muuttuessa.

**Uudet liiketoimintamallit:** Esimerkiksi ruokalähettipalvelun tai platform-busineksen voi olla helpompaa tallentaa tietoja graafitietokantaan.

Arkkitehtuurisesti tämä on tuonut uuden tason datan varastointiin ja siitä käytetään yleensä nimitystä *data lake*. Data lake on paikka, jonne voidaan dumpata mitä tahansa dataa. Se voi koostua useammasta kuin yhdestä työkalusta.

Julkiset pilvet kuten Google Cloud Platform ja Amazon tarjoavat koko joukon palikoita erilaisen datan tallentamiseen ja käsittelyyn. 
Jos data on dokumenttimuodossa niin datan tallentamiseen sopii Amazonin S3 tai Google Storage. Tämän päälle tarvitaan erilaisia palikoita datan kuljettamiseen, prosessointiin, luokitelluun, ja niin edespäin.

Jos katselee amerikkalaisfirmojen referenssiarkkitehtuureja, niin ne näyttävät suomalaisen silmään melko hurjilta. Varsinkin kun toteutuksen monimutkaisuus kasvattaa väistämättä projektin kustannuksia.

Oma kokemus tällä hetkellä on, että erilaisiin muuttuviin datan varastoinnin tarpeisiin Googlen BigQuery on yksinkertaisin - se riittää ainoana työkaluna monessa tapauksessa ja hinnoittelumalli on edullinen pienissäkin projekteissa - verrattuna vaikkapa AWS Redshiftiin.

Datan vieminen BigQueryyn on myös suhteellisen helppoa, joko integraatioiden avulla tai suoraan API-rajapinnan kautta. BigQuery mahdollistaa "streaming insert" datan viennin, joskin tämä aiheuttaa ylimääräisiä kuluja verrattuna isompien datasettien viemiseen kerralla. Datan esiprosessoinnissa on toisaalta otettava huomioon, että BigQuery ei estä tuplarivejä ja rivejä voi olla vaikea päivittää jälkikäteen.

Data lake -näkökulmasta BigQuery skaalautuu loputtomasti ja sinne voi tallentaa melkein mitä tahansa dataa. Se ei ehkä ole kaikkeen paras vaihtoehto esim. tekstimuotoiselle datalle mutta useassa tapauksessa aivan riittävän hyvä. Data on helposti kyseltävissä tutulla SQL-syntaksilla. Lisäksi datan päällä voi tehdä ennustemalleja BigQuery ML-palikan avulla. Eli datan analysointiin ei välttämättä tarvita Pythonia tai R:ää osaavaa Data Scientistia.

Yrityksen näkökulmasta teknologiavalinnassa ei ole kyse pelkästään teknologiasta vaan hyödyistä ja kokonaiskustannuksista. Kustannuksiin vaikuttaa merkittävästi resursoinnin ja osaamisen tarve. BigQuery vaikuttaa tästä näkökulmasta monessa tapauksessa erittäin järkevältä valinnalta, koska se mahdollistaa a) olemassa olevan SQL-kielen osaamisen hyödyntämisen b) yksinkertaisemman arkkitehtuurin ja c) ennustemallien ja muiden analyysien teon suoraan BigQueryn päällä ilman datan liikuttamista eri työkaluihin ja d) erittäin hyvät integraatiot käytössä oleviin raportointityökaluihin kuten Google Data Studio tai Power BI. 







Choosing the right data storage for analytics data is a technical question but it is has big consequences. Traditional relational databases are typically well understood but don't scale that well. And you need to manually provision and configure servers which is not fun. 

Luckily there are alternatives. Tools like Google BigQuery, Snowflake and AWS Redshift are probably the most popular.

In this post I will focus on Google BigQuery because that's what I have been using lately. 

## Ok, but why?

Before jumping into to the details, let's take a look of the differences between 

## Serverless

BigQuery is serverless to the level that you don't really need to worry about it, at least in the best case scenario.

You might want to p



To run advanced analytics, you need data to work with. However, once you’ve decided to collect data, you need to decide how to store it. Should you choose a standard data warehouse or a data lake? In this article, we discuss why Google BigQuery as a data lake is the best choice.

Lately I have been using a lot of Google Cloud Platform (GCP) and BigQuery for various data projects.

The projects include:

* 

In most data warehouse environments, organizations need to specify and commit to the server hardware on which computations will run. Administrators have to provision for performance, security, elasticity, and reliability. A serverless model circumvents this constraint.

In a serverless model, processing is automatically distributed over a large number of machines working in parallel. Using BigQuery's serverless model, data engineers and database administrators focus less on infrastructure and more on provisioning servers and gaining insights from data.

## Read-optimized

## The competition 

Google BigQuery Snowflake and AWS Redshift. Others

## Data lake vs. data warehouse

## What types of data 



## Serverless

## Pricing

## Deployment





But in general, the benefits of this type of approach are clear:

1. Everything is documented

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


