---
template: BlogPost
language: en
author: Santeri Salonen
slug: /implementing-ga4-what-has-changed
date: 2022-05-08T21:14:42.133Z
title: Implementing Google Analytics for larger companies - what’s changed?
thumbnail: ../images/google.jpg
imageCredit: Pawel Czerwinski
metaDescription: Notes on implementing GA4 for larger organisations. GA4
  configuration, data streaming to Google BigQuery, using Server Side GTM,
  integration with Firebase Analytics, Analytics Data API and its features.
imageCreditURL: https://unsplash.com/@pawel_czerwinski
---
A lot has been written about Google Analytics 4. What are all these new features? Where is the landing pages -report? No bounce rate, huh? And [Google shutting down good old Universal Analytics in July 2023.](https://support.google.com/analytics/answer/11583528?hl=en)



So I won’t write about these. But there have not been that many posts about the implementation side of the new GA4, especially for larger companies. For smaller companies migrating to GA4 might be trivial. But bigger companies typically have more challenging organisational aspects to consider. Or they might have other technological questions on the table at the same time. 



So without further small talk, let’s look at some of the aspects. 



## GA4 Configuration Tag - In theory vs. in practice



In theory implementing basic setup with GA4 is super simple. Just inject the basic [configuration tag](https://support.google.com/tagmanager/answer/9442095?hl=en). Then go to Google Analytics interface and switch on the required types of Enhanced Tracking: file downloads, scrolling, outbound links, et cetera.



Huge contrast to old Universal Analytics where you needed to track everything outside standard pageviews by yourself.



But in practice you still need to custom code. There is close to zero probability that GA4 default way of tracking works for _your_ website, at least if you are a big company with many websites. Maybe you have SPA, gated downloads, javascript redirects or something else that’s not understood well by default GA4 tracking script. 



In addition, if you are using Google Tag Manager and then turning on GA4 Enhanced Tracking, you are implementing a totally different design pattern.



GTM implements pub-sub -pattern through dataLayer. Each tag can “subscribe” to one or many dataLayer -events. And then you can use the GTM debug tool to see which tags were fired at which event.



GA4 config tag is only fired once, during the initial triggering. After that you have no way of knowing if the data collection actually works or not within GTM itself.



Yes, you can use GA4 debug mode. Or eavesdrop your network traffic with a man-in-the-middle attack. But this creates an extra layer of work and additional point-of-failure.



The point being: If you are using GTM, it might be actually better to stick with the robust design principles of GTM and not turn on Enhanced Tracking of GA4. 



(And if you are not using GTM or some other similar tool, then you probably should be. But that’s another topic.)



## Native linking between BigQuery



Personally this is probably the nicest thing about GA4. You just need a Google Account with access to both GA4 and Google Cloud -project. Then you start streaming your [GA4 data to Google BigQuery.](https://support.google.com/analytics/answer/9358801?hl=en) 



Compared to the old GA session based data model, GA4 event based data model is a lot simpler to query against. Your queries might even work directly against the raw event data for simple reporting or visualisations.



The GA4 data model is also a lot more flexible when it comes to custom parameters. You don’t need to create a rigid and overly complicated set of custom dimensions beforehand, as was the case very often with Universal Analytics. 



There is a but. In many organisations web analytics is placed under digital marketing. Unless they’ve been using GA 360 they probably don’t have established access to Google Cloud accounts. So first we need to break some organisational silos: establishing the access, deciding who pays the invoice, discussing legal implications. All these are a lot more complex and time-consuming topics than one might expect at least in bigger companies.



## Server Side GTM



The jury is still out on whether coupling your [Server Side GTM](https://developers.google.com/tag-platform/tag-manager/server-side) with GA4 is the best option.



But in any case, when implementing Server Side data collection, you need some sort of “core” tracking from the client side. This core tracking can then be repurposed for specific endpoints (such as Facebook or Google Ads).



This pattern enables you to remove extra tracking scripts from the client side, improving loading times of your service. (Not mentioning the privacy aspects here, that’s another topic.)



So, while implementing GA4 you’d probably want to at least consider implementing that through the Server Side GTM container. 



And then leveraging these GA4 requests to send data to other endpoints, like Google Ads and Facebook. There are already pre-existing templates for that. So with GA4 you would save time not needing to code your own templates.



As noted regarding Google BigQuery linking, Server Side GTM too requires the ability to use Google Cloud. 



Ok, you could deploy in AWS or Azure or whatever, but the point is that this too requires coordination between different teams, which might not be too easy in larger organisations. So prepare to spend a lot of time in meetings as well.



## Apps



With Universal Analytics tracking your mobile app was mostly painful. Not so with GA4. Mainly because GA4 is based on [Firebase Analytics] 
(https://firebase.google.com/docs/analytics) which is a tool designed for Mobile App tracking.



Because of this the data model is a lot more straightforward. Everything is an event. Firebase collects events such as first_open by default and then you can have your own custom events.



(On the other hand, if you have an ecommerce store or just a simple content website, GA4 might feel like a forced downgrade.)



In any case, implementing GA4 for a mobile app  is simply about implementing Firebase Analytics and then activating GA4 integration with a click of a button.



As - I would guess - most of the existing Universal Analytics setups already work on top of Firebase Analytics, there is no need to implement anything new at code level. And if there is a need to re-implement application tracking, that would require another topic.



## Create and modify events



To summarise: In GA4 you can take an existing event and then - based on a rule - [create a new event from that.](https://support.google.com/analytics/answer/10085872?hl=en)



Let’s say you want to create conversions from specific page views or from a specific outbound link. Instead of collecting a new event just for this purpose, you can simply select a subset of already collected events and assign this as a conversion event.



The event is created from the client side, so it can even be repurposed to other endpoints when Server Side GTM is in use.



Downside: Misusing this feature can complicate things as there is no single source of truth for what events are tracked and what not.



Upside: This enables implementing a lot more robust and simple data collection setups. Business logic (which event is a conversion and which is not) can be separated from technical data collection.



The jury is still out but it seems that the upside might outweigh the downside in many cases.



## APIs



GA4 has a totally new API, called [Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1). It still lacks some features, such as advanced segmentation which are supported by old Universal Analytics APIs. One could use the old version’s segmentation (for example, sequence segments) to build practically any type of dataset.


Alike, the documentation is not very comprehensive compared to Universal Analytics APIs. To make matters worse, you probably don’t find a pre-existing Stackoverflow -answer to your question as the API is quite new.



On the other hand, there are new features being released. For example Analytics Data API has a method for [fetching funnel steps -report similar to Explore -tool within GA4 interface.](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties/runFunnelReport ) 

This is super useful if you want to visualise your custom funnels, and drop-off rates between each step. This is something that was previously (in UA API) available only for ecommerce steps. As this is totally new method, it is not yet implemented within e.g. Google Data Studio. But it probably will in the near future.



Overall, I find the new Analytics Data API a bit lacking. But if the data is available in BigQuery, there is now a better possibility to use SQL and skip the API altogether. Similar to other points mentioned, the jury is still out there.

## Privacy



Last but not least. The tricky part is not really the technical side but the organisational procedures that lead to a shared understanding of what type of data can and should be collected, how it is being used and what measures should be taken to ensure the data privacy. And keeping this aligned with the implementation.



From a technical point of view, GA4 offers no consent management solution in itself. But  there are plenty of ways to implement GA4 with privacy in mind.



With GA4 there is now the option to [remove IP addresses inside the EU, before sending requests to Google servers in the United States](https://support.google.com/analytics/answer/12017362?hl=en). Note that this can be done with the Server Side GTM solution as well.



There is also an option to make the tracker behave differently based on the level of consent given by the user. If no consent is granted, then only “anonymous” pings are sent to Google which enable counting things like page views or conversions but not stitching them back to specific browsers or traffic sources. 
