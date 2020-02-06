import App, {Container} from 'next/app';
import Page from '../components/Page';
import {ApolloProvider} from "react-apollo";
import withData from "../lib/withData";
import React from "react";

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
            <Container>
                <ApolloProvider client={this.props.apollo}>
                    <Page>
                        <Component {...pageProps}/>
                    </Page>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withData(CharityApp);
