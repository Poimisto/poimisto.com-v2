import React from 'react';
import HeroBlock from '../components/HeroBlock';
import CallToAction from '../components/CallToAction';
import LatestPosts from '../components/LatestPosts';
import Layout from '../components/Layout';
import { StaticImage } from "gatsby-plugin-image"
import Seo from '../components/Seo'

export default function Home() {

  return (

    <Layout>
      <Seo 
        lang="en"
        description=""
        title="Data consultancy"
      />
      <HeroBlock 
        bgcolor="dark" 
        imagealign="right"
        image={<StaticImage src="../images/santeri.jpg" alt="santeri salonen" />}
        content={(
          <>
            <h1>Data consultancy</h1>
            <p><strong>Santeri Salonen</strong> provides consulting services in data strategy, data engineering and data analytics, with 10+ years of experience.</p>
            <CallToAction bgColor="brandSecondary" url="/contact" align="left">Get in touch</CallToAction>
          </>
        )}        
      >
      </HeroBlock>

      <LatestPosts maxNumberOfPosts="16" title="Latest posts"/>
    </Layout>

  )

}
