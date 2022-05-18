import React from "react"
import { graphql } from "gatsby"
import Seo from '../components/Seo'
import styled from 'styled-components';
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from '../components/Layout';
import HeroBlock from "../components/HeroBlock";

const ArticleImg = styled.div`
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
  top:-30px;
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

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Seo 
        lang={frontmatter.language} 
        title={frontmatter.title}
      />
      <ArticleTitle>{frontmatter.title}</ArticleTitle>
      {!!frontmatter.thumbnail && (
        <>
          <HeroBlock 
            bgcolor="dark" imagealign="none"
            content={(
              <ArticleImg>
                <GatsbyImage image={frontmatter.thumbnail.childImageSharp.gatsbyImageData} />
              </ArticleImg>
            )}
          />
          
          {!!frontmatter.imageCredit && (
            <ImageCredit>
              Image:&nbsp;
              {!!frontmatter.imageCreditURL && (
                <a href={frontmatter.imageCreditURL}>{frontmatter.imageCredit}</a>
              )}
              {!frontmatter.imageCreditURL && (
                <span>{frontmatter.imageCredit}</span>
              )}
            </ImageCredit>
          )}   
        </>

          
      )}
      <ArticleMetadata>
        <div className="date">{frontmatter.date}</div>
        {!!frontmatter.author && (
          <div className="post-author">
            {frontmatter.author}
          </div>
        )}
      </ArticleMetadata>          
      <ArticleContent dangerouslySetInnerHTML={{__html: html}} />
    </Layout>
  )
}
export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
        author
        imageCredit
        imageCreditURL
        language
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
      html
    }
  }
`