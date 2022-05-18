import React from "react"
import { graphql } from 'gatsby'
import Layout from './layout'
import {MDXProvider} from '@mdx-js/react'
import {MDXRenderer} from 'gatsby-plugin-mdx';
import CallToAction from './../components/CallToAction'
import Link from '../components/Link'
import Seo from '../components/Seo'
import HeroBlock from '../components/HeroBlock'
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Img from 'gatsby-image';
import styled from 'styled-components';
import LatestPosts from './../components/LatestPosts'
import { createGlobalStyle } from 'styled-components'

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

const GlobalStyle = createGlobalStyle`
  * {
    text-decoration:none;
    font-family: ${props => props.theme.bodyFontFamily};
    line-height:180%;
    font-size:16px;
  }
  body {
    overflow-x:hidden;
    padding:0;
    margin:0;
  }
  a {
    text-decaration:none;
  }
  button {
    text-decoration:none;
  }
  blockquote {
    font-style:italic;
  }
  blockquote:before {
    content:"”";
    float:left;
    display:Block;
    font-size:92px;
    margin:30px 0px 0px -50px;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family ${props => props.theme.headingFontFamily};
    line-height:160%;
  }
  h1 {
    font-size:2.5em;
  }
  h2 {
    font-size:1.4em;
  }
  h3 {
    font-size: 1.3em;
  }
  h4, h5, h6 {
    font-size: 1.1em;
  }
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    h1 {
      font-size:1.6em;
    }
  }
  font-size: ${props => props.theme.fontSize};
  line-height: ${props => props.theme.bodyLineHeight};

`;

const ArticleImg = styled(Img)`
  margin: -60px 0px;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    margin: -40px -40px;
  }
`;
const ArticleTitle = styled.h1``;
const ArticleContent = styled.div`
  /* Style that first letter! */
  > p:first-child::first-letter {
    color: ${props => props.theme.colors.darkest};;
    padding:0;
    margin:-4px 6px;
    font-family: ${props => props.theme.dropCapsFontFamily};
    font-size: 4rem;
    float: left;
    line-height: 1;
  }
  
  margin-left: 200px;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    margin-left: 0px;
  }
  a {
    text-decoration:underline;
  }
  blockquote:before {
    color:${props => props.theme.colors.brand};
  }
`;
const ArticleMetadata = styled.div`
  margin-top:22px;
  float:left;
  color:${props => props.theme.colors.dark};
  .date {
    padding-bottom:6px;
    border-bottom: 1px solid ${props => props.theme.colors.brand};
    font-family: ${props => props.theme.monoSpaceFontFamily};
  }
  .post-author {
    margin-top:5px;
    font-family: ${props => props.theme.monoSpaceFontFamily};
  }
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {    
    display:none;
  }
`;

const ImageCredit = styled.div`
  height:0px;
  line-height:20px;
  margin-right:8px;
  position:relative;
  text-align:right;
  font-size:10px;
  color:${props => props.theme.colors.light};
  text-transform:uppercase;
  letter-spacing:1px;
  a {
    font-size:10px;
    color:${props => props.theme.colors.lightest};

  }
  

`

const shortcodes = { Link, CallToAction, HeroBlock, Grid, Hidden, LatestPosts }


const EntryTemplate = ({data}) => {
  let language = data.mdx.frontmatter.language || 'en';
  return (
    <Layout collection={data.mdx.fields.collection} slug={data.mdx.fields.slug}>
      <GlobalStyle/>
      <Seo 
        lang={language} 
        description={data.mdx.frontmatter.metaDescription} 
        title={data.mdx.frontmatter.title}
        image={data.mdx.frontmatter.thumbnail ? data.mdx.frontmatter.thumbnail.childImageSharp.fixed.src : null}
      />
      {data.mdx.fields.collection === 'posts' && (
        <div>
          <ArticleTitle>{data.mdx.frontmatter.title}</ArticleTitle>
          {!!data.mdx.frontmatter.thumbnail && (
            <HeroBlock bgColor="dark" imageAlign="none">
              <ArticleImg
                fluid={data.mdx.frontmatter.thumbnail.childImageSharp.fluid}
                alt={data.mdx.frontmatter.title + "- Featured Shot"}
              />
              {!!data.mdx.frontmatter.imageCredit && (
                <ImageCredit>
                  Image:&nbsp;
                  {!!data.mdx.frontmatter.imageCreditURL && (
                    <a href={data.mdx.frontmatter.imageCreditURL}>{data.mdx.frontmatter.imageCredit}</a>
                  )}
                  {!data.mdx.frontmatter.imageCreditURL && (
                    <span>{data.mdx.frontmatter.imageCredit}</span>
                  )}
                </ImageCredit>
             
              )}   
            </HeroBlock>
              
          )}

            <ArticleMetadata>
              <div className="date">{data.mdx.frontmatter.date}</div>
              {!!data.mdx.frontmatter.author && (
                <div className="post-author">
                  {data.mdx.frontmatter.author}
                </div>
              )}
              

          
            </ArticleMetadata>          
            <ArticleContent>
              <MDXProvider components={shortcodes}>
                <MDXRenderer>
                  {data.mdx.body}
                </MDXRenderer>
              </MDXProvider>
            </ArticleContent>            


        </div>
      )}
      {data.mdx.fields.collection === 'pages' && (
        <MDXProvider components={shortcodes}>
          <MDXRenderer>
            {data.mdx.body}
          </MDXRenderer>
        </MDXProvider>
      )}
      {data.mdx.fields.collection === 'people' && (
        <MDXProvider components={shortcodes}>
          <MDXRenderer>
            {data.mdx.body}
          </MDXRenderer>
        </MDXProvider>
      )}
    </Layout>
  )
}

export default EntryTemplate

export const pageQuery = graphql`
  query($path: String!) {
    mdx(fields: { slug: { eq: $path } }) {
      fields {
        collection
        slug
      }
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
        metaDescription
        author
        imageCredit
        imageCreditURL
        language
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 600, height: 600) {
              src
            }
          }
        }
      }
      body
    }
  }
`
