
import React from "react"
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import {Link} from 'gatsby';
import Grid from '@material-ui/core/Grid'
import Navigation from './Navigation'
import logo from '../images/poimisto-logo.png' // Tell webpack this JS file uses this image
import logoShort from '../images/poimisto-short-300x300.png';

import theme from '../theme';

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

const Main = styled.div``;

const Footer = styled.div`
  color: ${props => props.theme.colors.dark};
  padding:2.5rem 0 2.5rem 0;
  margin-top:2rem;
`;
const Header = styled.header`
  background: ${props => props.theme.colors.lightest};
  color: ${props => props.theme.colors.dark};
  a {
    color: ${props => props.theme.colors.dark}
  }
  padding:30px 0px;
`;
export const Container = styled.div`
  max-width: ${props => props.theme.containerMaxWidth}px;
  margin: 0 auto;
  @media (max-width: ${props => (props.theme.containerMaxWidth + 20)}px) {
    padding: 0 20px;
  }
`;

const LogoImage = styled.img`
  max-width:120px;
  margin-top:6px;
`;
const NavGridContainer = styled(Grid)`
  display:flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: space-between;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    flex-direction:column;
    justify-content: center;
    align-items:center;
    text-align:center;
    margin:0 -20px;
  }
`

const Layout = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <Header>
        <GlobalStyle/>
        <Container> 
          <NavGridContainer>
            <Grid item>
              <Link to="/">
                <LogoImage src={logo} alt="Logo" />
              </Link>
            </Grid>
            <Grid item>
              <Navigation/>
            </Grid>
          </NavGridContainer>
        </Container>
      </Header>
      
      <Container>
        <Main>
          {children}
        </Main>
      </Container>
      <Footer>
        <Container style={{lineHeight:'40px'}}>
          
        <img src={logoShort} width="40px" style={{float:"left",marginRight:'6px'}}/> Poimisto Oy © {new Date().getFullYear()}
          
        </Container>  
      </Footer>
    </ThemeProvider>

  )
}
export default Layout;