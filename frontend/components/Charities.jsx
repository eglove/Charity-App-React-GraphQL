import React, {Component} from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Charity from "./Charity";
import Pagination from "./Pagination";
import {perPage} from "../config";

const ALL_CHARITIES_QUERY = gql`
    query ALL_CHARITIES_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        charities(first: $first, skip: $skip, orderBy: name_ASC) {
            id
            ein
            name
            description
            website
            image
            largeImage
            imageDescription
            street
            city
            state
            zip
        }
    }
`;

const Center = styled.div`
    text-align: center;
`;

const CharitiesList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`;

class Charities extends Component {
    render() {
        return (
            <Center>
                <Pagination page={this.props.page}/>
                <Query
                    query={ALL_CHARITIES_QUERY}
                    // No good solution to keep items list up to date with server
                    // without sacrificing performance
                    // fetchPolicy="network-only"
                    variables={{
                        skip: this.props.page * perPage - perPage,
                    }}
                >
                    {({data, error, loading}) => {
                        if(loading) return <p>Loading...</p>;
                        if(error) return <p>Error: {error.message}</p>
                        return (
                            <CharitiesList>
                                {data.charities.map(charity =>
                                    <Charity key={charity.id} charity={charity}/>
                                )}
                            </CharitiesList>
                        )
                    }}
                </Query>
                <Pagination page={this.props.page}/>
            </Center>
        );
    }
}

export default Charities;
export {ALL_CHARITIES_QUERY};