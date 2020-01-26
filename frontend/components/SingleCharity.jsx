import React, {Component} from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import {Query} from "react-apollo";
import styled from "styled-components";
import Head from 'next/head';
import Error from './ErrorMessage';

const SingleCharityStyles = styled.div`
    max-width: 1200px;
    margin: 2em auto;
    box-shadow: ${props => props.theme.bs};
    min-height: 800px;
    img {
        object-fit: contain;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5px;
        width: 300px;
    }
    a {
        text-decoration: underline;
    }
    .details {
        margin: 3em;
        font-size: 1em;
    }
`;

const SINGLE_CHARITY_QUERY = gql`
    query SINGLE_CHARITY_QUERY($id: ID!) {
        charity(where: {id: $id}) {
            id
            ein
            name
            website
            description
            largeImage
            street
            city
            state
            zip
        }
    }
`;

class SingleCharity extends Component {
    render() {
        return (
            <Query query={SINGLE_CHARITY_QUERY} variables={{
                id: this.props.id
            }}>
                {({error, loading, data}) => {
                    if (error) return <Error error={error}/>;
                    if (loading) return <p>Loading...</p>;
                    if (!data.charity) return <p>No Charity for ID: {this.props.id}</p>
                    const charity = data.charity;
                    return (
                        <SingleCharityStyles>
                            <Head>
                                <title>Cognitame 💙 {charity.name}</title>
                            </Head>
                            <img src={charity.largeImage} alt={charity.imageDescription}/>
                            <div className="details">
                                <p>
                                    {charity.name}
                                    &emsp;
                                    <Link href={{
                                        pathname: 'https://apps.irs.gov/app/eos/allSearch.do',
                                        query: {
                                            ein1: charity.ein,
                                            resultsPerPage: '25',
                                            indexOfFirstRow: '0',
                                            dispatchMethod: 'searchAll',
                                        }
                                    }}>
                                        <a>{charity.ein}</a>
                                    </Link>
                                    &emsp;
                                    {charity.website && (
                                        <>
                                            <Link href={charity.website}>
                                                <a>Website</a>
                                            </Link>
                                            &emsp;
                                        </>
                                    )}
                                    <Link href={{
                                        pathname: 'https://smile.amazon.com/gp/chpf/homepage',
                                        query: {q: charity.ein}
                                    }}>
                                        <a>AmazonSmile</a>
                                    </Link>
                                </p>
                                <p>{charity.description}</p>
                                <p>{charity.street}<br/>{charity.city}, {charity.state} {charity.zip}</p>
                            </div>
                        </SingleCharityStyles>
                    )
                }}
            </Query>
        );
    }
}

export default SingleCharity;
export {SINGLE_CHARITY_QUERY};