---
template: BlogPost
language: en
author: Santeri Salonen
slug: /google-bigquery-datavarasto
date: 2022-05-31
title: Datan varastointi Google BigQueryn avulla
thumbnail: ../images/bigquery.png
#imageCredit: Uniq Trok
#imageCreditURL: https://unsplash.com/@uniqtrek
disabled: false
---

Perinteisiä tietovarastoratkaisuja ei ole suunniteltu kaikkia nykyajan datavarastoinnin vaatimuksia varten. Data voi olla tiedostomuotoista (esim. kuvia tai chattilokeja) tai dataa voi olla paljon (sensoridata tai digitaalisen analytiikan data). Tai dataa voidaan tarvita lähes reaaliajassa (esim. anomalioiden tunnistaminen). 

Jos liiketoiminta kehittyy kovalla vauhdilla, niin datavaraston täytyy olla myös riittävän joustava seuratakseen mukana. Muuten datavarastoon alun perin suunniteltu skeema voi vanhentua käsiin.

BigQuery on Googlen Cloud Platformin työkalu analytiikan datan varastointiin.

Oma kokemus on, että se riittää yllättävän moneenkin datan varastoinnin tarpeeseen ja hinnoittelumalli on edullinen myös pienissä projekteissa - verrattuna vaikkapa AWS Redshiftiin.

Toki jos katselee amerikkalaisfirmojen referenssiarkkitehtuureja, niin eihän yksi työkalu riitä mihinkään. Käytössä on koko joukko erilaisia palikoita datan varastointiin, kuljettamiseen, prosessointiin, luokitelluun, ja niin edespäin. Mutta suomalaisesta näkökulmasta tämä ei välttämättä ole tarkoituksenmukaista, ainakaan jos ollaan vasta lähdössä liikkeelle.

Yrityksen näkökulmasta teknologiavalinnoissa ei ole kyse pelkästään teknologiasta - vaan kokonaisuuden hyödyistä ja kustannuksista. Teknologoita on paljon mutta osaaminen on melko niukka resurssi. 

BigQueryn etuna on, että yritys voi paremmin hyödyntää olemassa olevaa osaamista eikä yrityksen tarvitse välttämättä ensitöikseen palkata tiimiä datatietelijöitä ja -insinöörejä.

* Datan lukeminen BigQuerysta onnistuu monelle tutulla SQL-syntaksilla
* Ennustemallien ja muiden analyysien teon voi tehdä suoraan BigQueryn päällä ilman datan lataamista Python/R kirjastoihin
* Valmiit integraatiot moneen dashboard/BI- työkaluun
* Valmiit integraatiot erilaisiin datalähteisiin, etenkin Googlen ekosysteemin sisällä. Myös monet muut yleiset palvelut (vaikkapa Salesforce) onnistunevat melko kivuttomasti.
* Datan vienti API:n kautta on melko helppoa ja BigQueryyn voi viedä myös *streaming* -dataa

Ei BigQuery ole välttämättä paras vaihtoehto kaikkiin tarpeisiin. Mutta monessa kohtaa riittävän hyvä. Sitä voi hyödyntää raakadatan varastointiin *data lake* -tyyppisesti, strukturoidun datan mallinnus onnistuu ja dataan voi rakentaa erilaisia näkymiä liiketoiminnan raportteja ja dashboardeja varten. Eli käytännössä sen avulla voi kattaa kokonaan tai osin melko monta data-analytiikan vaihetta. 

Alla vielä muutama kokemuksiin perustuva nosto BigQueryn ominaisuuksista käyttäjän näkökulmasta. Teknisistä ominaisuuksista kannattaa lukea suoraan vaikkapa [Googlen omilta sivuilta](https://cloud.google.com/blog/products/data-analytics/new-blog-series-bigquery-explained-overview)

### Käyttöönotto nopeaa

BigQueryn käyttöönotto on ainakin testaustarkoituksessa erittäin nopeaa. Minkäälaisia palvelinkonfiguraatioita ei tarvita. Datasetin ja tauluja voi pystyttää Google Cloudin konsolin kautta, command line työkalun avulla, tai osana isompaa *stäkkiä* Deployment managerin avulla. Datan kyselyt onnistuvat SQL-kielen avulla. 

## Datan visualisointi ja raportointi onnistuu nopeasti

Yksinkertaisimmillaan BigQueryyn rakennettuja tauluja ja näkymiä voi visualisoida ja raportoida Googlen Data Studion avulla. Mutta melkein samalla tapaa datan katselu onnistuu myös muilla suosituilla työkaluilla, kuten Power BI:lla tai Tableaulla. 

## Datan vienti BigQueryyn on suhteellisen yksinkertaista

Kolmannen osapuolen järjestelmistä datan tuominen BigQueryyn onnistuu luultavasti suhteellisen kivuttomasti. Googlen ekosysteemin sisällä integraatiot ovat tietysti helpoimpia. Esimerkiksi web- ja applikaatioanalytiikan datan saa suoraan myös BigQueryyn. Salesforcen ja Hubspotin datan saa ladattua BigQeuryyn hyödyntämällä GCP:n Cloud Fusion -palikkaa.  

Omista järjetelmistä datan vieminen BigQueryyn on myös suhteellisen helppoa, joko Google Cloud integraatioiden kautta tai suoraan API-rajapinnan kautta. BigQuery mahdollistaa *streaming insert* datan viennin, joskin tämä aiheuttaa ylimääräisiä kuluja verrattuna isompien datasettien viemiseen kerralla. 

Datan esiprosessoinnissa on otettava huomioon, että BigQuery ei estä tuplarivejä ja yksittäisiä rivejä voi olla vaikea poistaa tai päivittää jälkikäteen. Relaatiotietokannasta tuleva data kannattaa mahdollisesti de-normalisoida ennen BigQueryyn tallentamista. Tässä suhteessa Big Query on kuitenkin suhteellisen joustava, koska kyselyissä voidaan tehdä datan yhdistämistä eri tauluista.

## BigQuery ML toimii suoraan olemassa olevan datan päällä

BigQueryn käyttökohteet laajenevat, jos otetaan käyttöön myös BigQuery ML (ML = Machine Learning). Ennustemallien luominen onnistuu myös SQL-syntaksilla, joten dataa ei tarvitse liikutella ja ladata Pythoniin tai R:ään. Käytännössä tämä tarkoittaa että prosessi nopeutuu huomattavasti ja ainakin yksinkertaisia ennustemalleja voidaan toteuttaa helposti ilman Data Scientist -tiimiä. 

## BigQueryn tauluja voidaan hallita osana Deployment Manager stäkkiä

BigQueryn datasetit ja taulut voidaan määritellä osaksi Deployment Manager kokonaisuutta. Tämä tarkoittaa että datavarasto ja datalähteet ovat osa YAML-konfiguraatiotiedostoa ja kokonaisuus on pystytettäviässä pilveen ilman manuaalisia vaiheita. Tämä ei välttämättä ole tarpeellista, jos datavaraston skeemat ja datalähteet eivät muutu kovin usein. Mutta jos liiketoiminta kehittyy nopeasti ja datavaraston tulee elää sen mukana, niin myös datavaraston olisi hyvä kyetä seuraamaan perässä. Tämä tarkoittaa useasti tapahtuvia päivityksiä, jolloin prosessin automatisointi on järkevää.

## Mitä seuraavaksi?

Tässä postauksessa käytiin läpi Google BigQueryn ominaisuuksia ylätasolla. Jatkossa tarkoitus on käsitellä Google BigQueryn käyttökohteita hieman tarkemmin ja päivitän postaukseen linkkejä tältä osin.




