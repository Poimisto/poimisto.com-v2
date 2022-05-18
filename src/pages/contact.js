import React from 'react';
import HeroBlock from '../components/HeroBlock';
import Layout from '../components/Layout';
import { StaticImage } from "gatsby-plugin-image"
import Seo from '../components/Seo';

export default function Home() {

  return (

    <Layout>
      <Seo 
        lang="en"
        description=""
        title="Contact details"
      />
      <HeroBlock 
        bgcolor="brandSecondary" 
        imagealign="right"
        image={<StaticImage src="../images/santeri.jpg" alt="santeri salonen" />}
        content={(
          <>

            <strong>Poimisto Oy</strong>
            <ul>
              <li>Y-tunnus / business ID: <strong>2864955-7</strong></li>
              <li>Osoite / Address: <strong>Pirkkalaistie 1 37100 Nokia</strong></li>
              <li>Verkkolaskutusosoite / e-invoice address: <strong>003728649557614</strong></li>
            </ul>
            <strong>Santeri Salonen</strong>
            <p>Provides consulting services in data strategy, data engineering and data analytics, with 10+ years of experience.</p>
            <ul>
              <li><a style={{color:"#fff",textDecoration:"underline"}} href="tel:+358401631797">+358 40 163 1797</a></li>
              <li><a style={{color:"#fff",textDecoration:"underline"}} href="mailto:santeri.salonen@poimisto.com">santeri.salonen@poimisto.com</a></li>
              <li><a style={{color:"#fff",textDecoration:"underline"}} href="https://www.linkedin.com/in/santerisalonen/">linkedin.com/in/santerisalonen</a></li>
            </ul>
          </>
        )}        
      >
      </HeroBlock>
    </Layout>

  )

}
