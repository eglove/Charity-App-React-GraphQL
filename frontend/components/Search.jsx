import React from 'react';
import Downshift, {resetIdCounter} from "downshift";
import Router from "next/router";
import {ApolloConsumer} from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';

const SEARCH_NONPROFITS_QUERY = gql`
    query SEARCH_NONPROFITS_QUERY($searchTerm: String!) {
        nonProfits(where: {
            OR: [
                { name_contains: $searchTerm},
            ]
        }) {
            id
            name
        }
    }
`;

function routeToNonProfit(nonProfit) {
    Router.push({
        pathname: '/nonProfit',
        query: {
            id: nonProfit.id,
        },
    });
}

class AutoComplete extends React.Component {

    state = {
        nonProfits: [],
        loading: false,
    };

    onChange = debounce(async (e, client) => {
        console.log('Searching...');
        // turn loading on
        this.setState({loading: true});
        // Manually query apollo client
        const res = await client.query({
            query: SEARCH_NONPROFITS_QUERY,
            variables: {searchTerm: e.target.value}
        });
        this.setState({
            nonProfits: res.data.nonProfits,
            loading: false,
        });
    }, 350);

    render() {
        resetIdCounter();
        return (
            <>
                <Downshift
                    onChange={routeToNonProfit}
                    itemToString={nonProfit => (nonProfit === null ? '' : nonProfit.name)}
                >
                    {({getInputProps, getItemProps, isOpen, inputValue, highlightedIndex}) => (
                        <div>
                            <ApolloConsumer>
                                {client => (
                                    <input
                                        {...getInputProps({
                                            type: 'search',
                                            placeholder: 'Search for a Charity',
                                            id: 'search',
                                            className: this.state.loading ? 'component searchBar loading' : 'component searchBar notLoading',
                                            onChange: e => {
                                                e.persist();
                                                this.onChange(e, client);
                                            },
                                        })}
                                    />
                                )}
                            </ApolloConsumer>
                            {isOpen && (
                                <div className="searchResults">
                                    {this.state.nonProfits.map((nonProfit, index) => (
                                        <div
                                            {...getItemProps({
                                                key: nonProfit.id,
                                                index,
                                                item: nonProfit,
                                                className: 'individualResults',
                                                style: {
                                                    backgroundColor:
                                                        highlightedIndex === index ? 'lightgray' : 'white',
                                                }
                                            })}
                                        >
                                            {nonProfit.name}
                                        </div>
                                    ))}
                                    {!this.state.nonProfits.length
                                        && !this.state.loading
                                        && <div>Nothing Found for {inputValue}</div>
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </Downshift>
                <style>{`
                    .searchBar {
                        font-size: 1em;
                        border: solid 1px #eeeeee;
                        width: 99%;
                    }
                    .loading {
                        background-color: #eeeeee;
                    }
                    .individualResults {
                    }
                    .individualResults:hover {
                        cursor: pointer;
                    }
                    .searchResults {
                        border: solid 1px;
                    }
                `}</style>
            </>
        );
    }
}

export default AutoComplete;