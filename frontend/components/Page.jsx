import React, {Component} from 'react';
import styled, {injectGlobal, ThemeProvider} from 'styled-components';
import Header from "./Header";
import Meta from "./Meta";

const theme = {
    blue: '#2196f3',
    black: '#393939',
    grey: '#9e9e9e',
    lightgrey: '#e0e0e0',
    offwhite: '#fafafa',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
`;

injectGlobal`
  @font-face {
    font-family: 'Spectral';
    src: url('/static/fonts/Spectral/Spectral-Medium.ttf') format('TrueType');
    font-weight: normal;
    font-style: normal;
  }
    html {
        box-sizing: border-box;
        font-size: 1em;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
  body {
    padding: 0;
    margin: 0;
    font-size: 1em;
    line-height: 2;
    font-family: 'Spectral';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'Spectral'; }
`;

class Page extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta/>
                    <Header/>
                    <Inner>
                        {this.props.children}
                    </Inner>
                </StyledPage>
            </ThemeProvider>
        );
    }
}

export default Page;
