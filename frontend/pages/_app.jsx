import App from 'next/app';
import Meta from '../components/Meta';
import Nav from '../components/Nav';
import Page from '../components/Page';
import {ApolloProvider} from 'react-apollo';
import withData from '../lib/withData';

class CharityApp extends App {
    static async getInitialProps({Component, ctx}) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        // Exposes query to user
        pageProps.query = ctx.query;
        return {pageProps};
    }

    render() {
        const {Component, apollo, pageProps} = this.props;

        return (
            <>
                <ApolloProvider client={apollo}>
                    <Meta/>
                    <Nav/>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </ApolloProvider>
                <style jsx global>{`
					.component {
						box-shadow: 3px 3px 3px #888888;
						font-family: Merriweather;
						font-size: 1em;
						display: block;
						margin: 5px;
					}
					.paginationDisabler[aria-disabled='true'] {
					    color: grey;
					    pointer-events: none;
					}
					fieldset {
						border: none;
					}
					.flex-container {
						display: flex;
						flex-wrap: wrap;
					}

					.flex-container > div {
						width: 333px;
						margin: 10px;
						text-align: center;
						line-height: 75px;
					}
					.nonProfitInfo > a {
						text-decoration: none;
						color: black;
						font-size: 2em;
					}
					.buttonList {
						display: grid;
						grid-template-columns: auto auto auto;
						padding: 10px;
					}
					.buttonList > a {
						text-decoration: none;
						font-size: 1em;
						text-align: center;
					}
					.buttonList > button {
						background-color: white;
						border: none;
						text-decoration: none;
					}
					@font-face {
						font-family: 'Merriweather';
						font-style: normal;
						font-weight: 400;
						src: local('Merriweather'), url(../../../fonts/Merriweather/Merriweather-Regular.ttf) format('truetype');
					}
					@font-face {
						font-family: 'Raleway';
						font-style: normal;
						font-weight: 400;
						src: local('Raleway'), url(../../../fonts/Raleway/Raleway-Regular.ttf) format('truetype');
					}
				`}</style>
                <amp-font layout="nodisplay"
                          font-family="Merriweather"
                          timeout="500">
                </amp-font>
                <amp-font layout="nodisplay"
                          font-family="Raleway"
                          timeout="500">
                </amp-font>
            </>
        )
    }
}

export default withData(CharityApp);