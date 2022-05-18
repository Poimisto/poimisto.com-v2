import React from "react"
import Card from '@material-ui/core/Card'

import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid';
import { StaticQuery, graphql, Link } from "gatsby"

import styled from 'styled-components'
import { getSrc } from "gatsby-plugin-image"

import theme from '../theme';

const PostTitle = styled.h3`
  margin: 0px 0px 5px 0px;
  font-size:1rem;
  line-height:160%;
  font-family: ${props => props.theme.bodyFontFamily};
`;

const StyledCard = styled(Card)`
  color: ${props => props.theme.colors.lightest};
  background:${props => props.theme.colors.brandSecondary};
  box-shadow: none;
  border-radius:0px;
  padding: 0px;
  :hover {
    img {
      -webkit-filter: none;
      filter: none;
      transition: all 0.5s ease;
    }
  }
  img {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }

`



const PostLink = ({ post }) => {
  const primaryColor = theme.colors[post.frontmatter.primaryColor] || theme.colors.light;
  return (
    <Link to={post.frontmatter.slug}>
      <StyledCard bgColor={primaryColor}>
      <CardActionArea>
          {post.frontmatter.thumbnail && (
            <CardMedia
            component="img"
            alt={post.frontmatter.title}
            height="240"
            image={getSrc(post.frontmatter.thumbnail.childImageSharp)}
            title={post.frontmatter.title}
            style={{textDecoration:"none"}}
            />
          )}
          <CardContent>
            <PostTitle>{post.frontmatter.title}</PostTitle>
            {post.excerpt}
          </CardContent>    
      </CardActionArea>
    </StyledCard>
    </Link>
  )
}

export default function PostList(props) {
  const maxNumberOfPosts = props.maxNumberOfPosts || 4;
  return (
    <StaticQuery
      query={graphql`
        query PostQuery {
          allMarkdownRemark(
            limit: 100
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { 
              frontmatter: { 
                disabled: { ne: true }
              } 
            }
            ) {
            edges {
              node {
                id
                excerpt(pruneLength: 140)
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  slug
                  title
                  disabled
                  thumbnail {
                    childImageSharp {
                      gatsbyImageData(layout: CONSTRAINED, width: 400)
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={ (data) => {
        let counter = 0;
        const posts = data.allMarkdownRemark.edges.filter(edge => {
          // You can filter your posts based on some criteria
          // if (edge.node.frontmatter.disabled) return false;
          counter++;
          if ( counter > maxNumberOfPosts) return false;
          else return true;
        }) 
        .map(edge => <Grid item xs={12} sm={6} key={edge.node.id}><PostLink post={edge.node} /></Grid>)
        return (
          <div style={{marginBottom:"3rem"}}>
            <h2>{props.title} &darr;</h2>
            <Grid container spacing={2}>
              {posts}
            </Grid>
          </div>
        )
        
      }}
    />
  )
}