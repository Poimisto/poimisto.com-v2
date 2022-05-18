---
template: BlogPost
language: fi
author: Santeri Salonen
slug: /javascript-frameworkit-ja-analytiikka
date: 2021-01-21T10:12:14.839Z
title: Moderni JS-framework ja web-analytiikka - mitä pitää tietää?
thumbnail: ../images/react-angular-vue.png
---
Melko suuri osa uusista isojen yritysten ja kovaa kasvua tavoittelevien startupien verkkopalveluista toteutetaan nykyään niin sanottujen modernien Javascript-frameworkien avulla. 

Näitä ovat esimerkiksi React, Angular ja Vue tai näiden päälle toteutetut teknologiat kuten Gatsby tai Next.

Yleensä tällaisella toteutuksella tavoitellaan nopeampaa ja sovellusmaisempaa käyttökokemusta sekä skaalautuvuutta.

Toteutuksen myötä käyttöliittymä voidaan koodata vapaammin kun taustajärjestelmiä kutsutaan suoraan selaimesta API-rajapinnan yli. Kun käyttöliittymä on irrotettu taustajärjestelmistä, sitä voidaan myös kehittää nopeammin.

En ryhdy frameworkien eroja tai hyötyjä sen tarkemmin tässä pohtimaan, koska web-analytiikan osalta ne eivät ole olennaisia.

Ne kaikki kuitenkin lisäävät jonkin verran teknistä vaikeusastetta web-analytiikan toteutusvaiheeseen. 

Kokemukseeni perustuen listaan tässä postauksessa 4 asiaa, jotka on syytä huomioida, jos halutaan toteuttaa uusi palvelu modernin JS-frameworkin päälle.

### 1. Mieti web-analytiikkan roolia aeimmin

Perinteisesti web-analytiikka ryhdytään miettimään mahdollisimman myöhään. Sitä ryhdytään suunnittelemaan ja toteuttamaan kiireellä kun palvelun julkaisun ajankohta on lähellä. 

Pahimmassa tapauksessa analytiikan tarvetta pohditaan vasta, kun uutta verkkopalvelua mainostava kampanja pyörii jo täydellä teholla.

Jos verkkopalvelu toimii perinteisen palvelinpuolen teknologian varassa, niin ainakin jonkinlainen web-analytiikan toteutus tai päivitys saadaan tehtyä lyhyessäkin ajassa.

JS-framework -toteutuksessa web-analytiikan tulisi kuitenkin olla mukana jo kehitysvaiheessa. Esimerkiksi niin, että web-analytiikan toteuttaja tekee kehittäjille mittaussuunnitelman pohjalta teknisen vaatimusmäärittelyn ja validoi sen toteutuksen ennen julkaisua.

### 2. Seuranta ei toimi enää yhtä "automaattisesti"

Palvelinpuolen teknologiaa hyödyntävällä sivustolla web-analytiikkaa voidaan teteuttaa melko helposti, kun lisätään Google Tag Manager (tai vaikkapa Adobe Launch). Tämän jälkeen voidaan lisätä seurantaan sivulataukset, lomakkeiden täytöt ja nappuloiden klikkaukset.

Modernien JS-frameworkien kanssa tämä ei kuitenkaan onnistu yhtä helposti. Vaikka palveluun saataisiin kiinni Tag Manager -työkalu, niin seurannan toteuttamiseksi palvelun tulee usein erikseen kertoa tapahtumista, kuten vaikkapa sivulatauksista.

Modernin JS-frameworkin kanssa ei voi myöskään olettaa, että vaikkapa markkinoinnin kampanjatunnisteet tai liikenteen lähteet kerättäisiin automaattisesti oikein.

### 3. Analytiikan toteuttajan ja kehittäjien on syytä tiivistää yhteistyötä

JS-frameworkiin perustuvassa palvelussa edistynyttä web-analytiikkaa on vaikea toteuttaa ilman melko syvää frontend-koodausosaamista.

Jos toteutuksen speksit kulkevat powerpointeissa ilman aitoa yhteistyötä, niin saadaan ehkä laskutettavia tunteja tehokkaasti mutta ei todellista tehokkuutta. Kun väliin laitetaan vielä rikkinäinen puhelin -efekti, niin ongelma tietysti pahenee.

Jos analytiikan kehittäjä ja devaaja istuvat saman (virtuaalisen) pöydän ääreen ja sopivat toteutuksesta, niin työaikaa säästyy usein merkittävästi.
 
### 4. Web-analytiikka ei ole vain markkinointia varten

Web-analytiikka on kehittynyt teknisestä palvelinlokien analysoinnista digitaalisen markkinoinnin johtamisen välineeksi.

Perinteisellä mallilla verkkopalvelu uusitaan kerran kolmessa vuodessa kun taas markkinointia ohjataan päivä- tai viikkotasolla.

Tästä syystä markkinointi tarvitsee dataa ja mittaamista. Palvelun suunnittelussa ja kehityksessä on kuitenkin ollut pidempi sykli.

Jos toteutustavaksi ollaan valittu moderni JS-framework, ollaan myös kehityspuolella oletettavasti siirtymässä jatkuvaan- tai lyhytsykliseen malliin. Tällöin web-analytiikasta on hyötyä markkinoinnin lisäksi palvelun kehityskohteiden tunnistamisessa ja käyttäjäpolkujen optimoinnissa. Jos tätä ei ole huomioitu, niin voi olla järkevintä palata piirustuspöydälle web-analytiikan osalta.