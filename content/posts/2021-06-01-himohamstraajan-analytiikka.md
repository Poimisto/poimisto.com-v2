---
template: BlogPost
language: fi
author: Santeri Salonen
slug: /himohamstraajan-analytiikka
date: 2021-06-01T21:37:37.006Z
title: Himohamstraajan analytiikka
metaDescription: Hyödyllinen web-analytiikan tekninen toteutus kehittyy
  orgaanisesti, osana yrityksen käyttötarpeiden ja kyvykkyyksien kasvun kanssa.
  Näin analyyiikan kehitystä ohjaa oikeasta maailmasta saatu palaute.
thumbnail: ../images/oleksii-hlembotskyi-dw0-wvbqe7u-unsplash.jpg
---
Hyödyllinen analytiikan tekninen toteutus kehittyy orgaanisesti, osana yrityksen käyttötarpeiden ja kyvykkyyksien kasvun kanssa.

Näin analyyiikan kehitystä ohjaa oikeasta maailmasta saatu palaute.

Usein kehitys kuitenkin tapahtuu projektissa, jossa rakennetaan "kerralla valmista".

Tällä yritys saa ison ja tärkeän investoinnin. Toimittaja saa ison ja tärkeän asiakkaan.

Lopulta tällaisen isomman projektin lopputuotos voi olla kuitenkin enemmän haitaksi kuin hyödyksi.

Mitä monimutkaisempi analytiikka on teknisesti, sitä enemmän resursseja sen haltuunotto, ylläpito ja muutostyöt vaativat. Analytiikka ei kykene reagoimaan organisaation muuttuviin tarpeisiin ja tavoitteisiin ja se "siiloutuu" tekniseksi puuhasteluksi, jonka hyötyä liiketoiminnalle on vaikea osoittaa.

Kokosin alle neljä kohtaa, jotka huomiomalla datasta ja analytiikasta saa enemmän irti. Kolme ensimmäistä kohtaa liittyvät enemmän teknisiin käytäntöihin. Viimeinen kohta taas liittyy siihen, miten dataa hyödynnetään organisaation prosessien kehityksessä.

## 1. Itse itsensä dokumentoivat käytännöt

Dokumentointi on aivan olennainen osa analytiikan hallinnollista puolta. Ilman dokumentaatiota kaikki tieto asuu yksittäisen gurun päässä. Ja tieto häviää, kun guru vaihtaa maisemaa tai muuttuu muuten vaan pullonkaulaksi. 

Ilman dokumentaatiota uusien työntekijöiden tai ulkopuolisten konsulttien sisäänajo vaatii tuhottomasti aikaa ja tupakkia. 

Mutta: jos dokumentointi vaatii erillisen prosessin, niin homma ei tule toimimaan. Kukaan ei halua tehdä erikseen dokumentointia eikä kukaan halua siitä erikseen maksaa. Jos joku dokumentaatio saadaankin kasaan, niin se jää ajastaan jälkeen heti ilmestyessään. Väärästä dokumentaatiosta on enemmän haittaa kuin hyötyä.

Mikä sitten avuksi? Dokumentointi pitää rakentaa niin, että olemassa olevat prosessit dokumentoivat itse itsensä:

* käytetään versionhallintaa oikein
* sovitaan konventiot asioiden nimeämiseen
* prosessiin erillinen review-vaihe, jolloin jokaista muutosta katsotaan vähintään kaksilla silmillä

Yllä olevat käytännöt on pöllitty ohjelmistokehityksestä, jossa samojen ongelmien kanssa on painittu jo pidempään.

## 2. Mieluummin liian vähän kuin liikaa

It's not the ink, it's the think. 

Less is more. 

Ja niin edespäin.

Näistä kaikkien tietämistä totuuksista huolimatta analytiikan toteutukset muistuttavat usein himohamstraajan asuntoa. Tuolla oven edessä on kengännumero, lattialla tuotteen alkuperämaa, oven edessä on kanta-asiakkaan keihäsennätys.

Kun projekti nytkähtää liikkelle ja ollaan suunnitteluvaiheessa, on helppoa lisätä suunnitelmaan jokainen "nice-to-have" datapiste. 

Sille ei ehkä juuri nyt ole käyttöä, mutta sille ehkä voisi olla... Suunnitteluvaiheessa lisääminen on helppoa. Ja samalla pyynnöllä sen datan saa liikkumaan data lakeen tai web analytiikkaan.

On aina helpompaa lisätä kuin ottaa pois. 

Jokainen datapiste tai parametri aiheuttaa kuitenkin kustannuksen, joka maksetaan siinä vaiheessa kun analytiikkaa pitäisi pystyä hyödyntämään. Ylmääräinen data aiheuttaa datan käyttäjälle kognitiitivista kuormaa ja lisää dataan liittyvien virheiden mahdollisuuksia. 

Kun datapisteitä tai parametrejä on tarpeeksi, niin lopulta kukaan ei enää tiedä, mikä on relevanttia ja mikä ei. Esimerkiksi mainonnan rajapinnoista saa hamstrattua kymmeniä erilaisia klikkausmittareita, joiden eroista ei välttämättä ole selvillä edes mainonnan ammattilainen. 

On usein hyödyllisempää toteuttaa analytiikkaa käyttötarkoitus kerrallaan ja kerätä vain tätä tarkoitusta varten merkityksellinen data. 

Kun näin toimitaan, niin joudutaan pysähtymään ja miettimään, mikä data on merkityksellistä. Tämä pysähtyminen on edellytys sille, että organisaatio oppii ja kehittyy datan hyödyntämisessä.

## 3. Säännöllinen auditointi ja refaktorointi

Todellisuudessa organisaation liiketoiminta muuttuu ja palvelut kehittyvät nopeammin kuin analytiikka. 

Kun analytiikkaa kehitetään vastaamaan muuttuneita olosuhteita, kerrytetään samalla teknistä velkaa. 

Ohjelmistokehityksessä on ymmärretty, että ohjelmiston säännöllinen refaktorointi tarkoittaa tämän velan takaisinmaksua. Siinä ohjelmiston sisäistä rakennetta muutetaan toiminnallisuuden pysyessä samana.

Refaktoroinnilla tekninen velka pidetään hallitulla tasolla. Muutoin koko tuotos muuttuu spagettihirviöksi johon kukaan ei enää uskalla koskea.

Sama pätee analytiikkaan.

Jos analytiikkaa aina vain lisätään mutta sitä ei ikinä refaktoroida, muuttuu se lopulta hyödyttömäksi. Ainoa vaihtoehto on toteuttaa se alusta asti uudestaan. Säännöllisen refaktoroinnin avulla analytiikkaa kykenee elämään liiketoiminnan mukana ja kehittymään koko ajan paremmaksi.

# 4. Analytiikka mukaan PDSA-luuppiin

Dataa voi kerätä tuhottomia määriä (big dataa!) ja sitten yrittää kiduttaa dataseteistä ulos yllättäviä korrelaatioita.  Esimerkiksi asiakkaan keihäsennätys voi korreloida preferoidun makkaralaadun kanssa.

Kun analytiikka ymmärretään jälkikäteiseksi jo tapahtuneiden asioiden pyörittelyksi, niin katsotaan kuitenkin vain peräpeiliin. Näin ei kyetä hakemaan bisnekselle suuntaa tai kasvua.

Plan Do Study Act -kehä (tai Deming Wheel Dr. Walter Demingin mukaan) on iteratiivinen malli, jonka avulla voi kehittää prosesseja ja saada aikaan muutosta.

PDSA-mallin Plan-vaiheessa on oleellista esittää seuraavat kysymykset:

1. Mitä halutaan saada aikaan?
2. Mistä tiedetään, onko muutoksella saatu parannus vai ei?
3. Mitä muutoksia voidaan tehdä, jotka johtaisivat parannukseen?

Analytiikan roolina on Plan-vaiheessa suunnitella vastaus 2. kysymykseen. Vastaus vaatii a) parannuksen konkreettista määrittelyä, b) ymmärrystä analytiikan nykytilanteesta c) useissa tapauksissa myös uuden datan keräämistä. 

Study-vaiheessa analytiikan roolina on kertoa, minkalainen vaikutus muutoksella konkreettisesti oli:

1. Aiheuttiko muutos parannuksen vai ei?
2. Kuinka ison parannuksen ja onko toimenpide järkevää skaalata muualle organisaatioon?
3. Oliko muutoksella havaittavia sivuvaikutuksia?

PDSA-mallissa analytiikka ei ole organisaation erillinen funktio, vaan yksi kehittämiseen liittyvä kyvykkyys. Analytiikka ei pyri hamstraamaan dataa, vaan palvelemaan prosessien kehitystä osana muiden kehitykseen osallistuvien kanssa.