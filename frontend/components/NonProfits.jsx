import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import NonProfit from './NonProfit';
import Pagination from "./Pagination";
import {perPage} from "../config";

const ALL_NONPROFITS_QUERY = gql`
    query ALL_NONPROFITS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        nonProfits(first: $first, skip: $skip, orderBy: createdAt_DESC) {
            id
            ein
            name
        }
    }
`;

class NonProfits extends Component {
    render() {
        return (
            <>
                <Pagination page={this.props.page}/>
                <Query
                    // Re-downloads data every time page is visited, removes benefit of caching pages
                    // No current good solution to refresh cache if new items are added
                    // fetchPolicy="network-only"
                    query={ALL_NONPROFITS_QUERY}
                    variables={{
                    skip: this.props.page * perPage - perPage,
                }}>
                    {({data, error, loading}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        return (
                            <div className="flex-container">
                                {data.nonProfits.map(nonProfit =>
                                    <NonProfit nonProfit={nonProfit} key={nonProfit.id}/>)}
                            </div>
                        );
                    }}
                </Query>
                <Pagination page={this.props.page}/>
            </>
        );
    }
}

export default NonProfits;
export {ALL_NONPROFITS_QUERY};