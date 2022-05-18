import React from "react"

import {Container} from './Layout';

import styled from 'styled-components'
import { getContrast } from 'polished'
import theme from './../theme';

import Background from './Background'


const StyledBlock = styled.div`
  color:${props => getContrast(props.theme.colors.darkest, props.bgcolor || '#f3f3f3') > 10 ? props.theme.colors.darkest : props.theme.colors.lightest };
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  position:relative;
  overflow:hidden;
  padding:40px 20px;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    padding:20px 10px;

  }
  box-sizing:border-box;
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`
const HeroGrid = styled.div`
  display:grid;
  grid-template-columns: ${props => '1fr '.repeat(props.columns).trim() };
  grid-gap: 20px;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    grid-template-columns: 1fr;
  }
  .hero-image {
    order: ${props => (props.imagealign && props.imagealign.match(/none|left/)) ? 0 : 1};
    @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
      order: 0;
    }
  }
`;

const HeroBlock = ({ bgcolor, image, imagealign, content  }) => {
  
  const bg = theme.colors[bgcolor] || theme.colors.light;
  const columns = (image) ? 2 : 1;

  return (
    <StyledBlock bgcolor={bg}>
      <Background background={bg} />
      <Container >
     
        <HeroGrid imagealign={imagealign} columns={columns} >
          {!!image && (
           <div className="hero-image">{image}</div> 
          )}
          <div className="hero-content">{content}</div>
        </HeroGrid>
        
      </Container>
    </StyledBlock>
  )
 
}

export default HeroBlock