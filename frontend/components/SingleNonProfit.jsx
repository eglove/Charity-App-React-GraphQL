import React, {Component} from 'react';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import Head from "next/head";
import Error from "./ErrorMessage";

const SINGLE_NONPROFIT_QUERY = gql`
    query SINGLE_NONPROFIT_QUERY($id: ID!) {
        nonProfit(where: {id: $id}) {
            ein
            name
            street
            city
            state
            zip
        }
    }
`;

class SingleNonProfit extends Component {
    render() {
        return (
            <Query query={SINGLE_NONPROFIT_QUERY} variables={{
                id: this.props.id,
            }}>
                {({error, loading, data}) => {
                    if (error) return <Error error={error}/>
                    if (loading) return <p>Loading...</p>
                    if (!data.nonProfit) return <p>No Non-Profit found with ID: {this.props.id}</p>
                    console.log(data);
                    const nonProfit = data.nonProfit;
                    return (
                        <>
                            <Head>
                                <title>Cognitame - {nonProfit.name}</title>
                            </Head>
                            <p>{nonProfit.ein} - {nonProfit.name}</p>
                            <p>{nonProfit.street}</p>
                            <p>{nonProfit.city}</p>
                            <p>{nonProfit.state}</p>
                            <p>{nonProfit.zip}</p>
                        </>
                    )
                }}
            </Query>
        );
    }
}

export default SingleNonProfit;