import React from "react";
import Downshift, {resetCounter, resetIdCounter} from "downshift";
import Router from "next/router";
import {ApolloConsumer} from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce"
import {DropDown, DropDownItem, SearchStyles} from "./styles/DropDown";

const SEARCH_CHARITIES_QUERY = gql`
    query SEARCH_CHARITIES_QUERY($searchTerm: String!) {
        charities(where: {
            OR: [
                {ein_contains: $searchTerm},
                {name_contains: $searchTerm},
                {description_contains: $searchTerm},
                {website_contains: $searchTerm},
                {street_contains: $searchTerm},
                {city_contains: $searchTerm},
                {state_contains: $searchTerm},
                {zip_contains: $searchTerm},
            ]
        }) {
            id
            image
            name
        }
    }
`;

function routeToCharity(charity) {
    Router.push({
        pathname: '/charity',
        query: {
            id: charity.id,
        },
    });
}

class AutoComplete extends React.Component {

    state = {
        charities: [],
        loading: false,
    };

    onChange = debounce(async (e, client) => {
        // turn loading on
        this.setState({loading: true});
        // manually query apollo client with search change
        const res = await client.query({
            query: SEARCH_CHARITIES_QUERY,
            variables: {searchTerm: e.target.value},
        });
        this.setState({
            charities: res.data.charities,
            loading: false,
        })
    }, 350);

    render() {
        resetIdCounter();
        return (
            <SearchStyles>
                <Downshift onChange={routeToCharity} itemToString={item => (item === null ? '' : item.title)}>
                    {({getInputProps, getItemProps, isOpen, inputValue, highlightedIndex}) => (
                        <div>
                            <ApolloConsumer>
                                {(client) => (
                                    <input
                                        {...getInputProps({
                                            type: 'search',
                                            placeholder: 'Search for a Charity',
                                            id: 'search',
                                            className: this.state.loading ? 'loading' : '',
                                            onChange: e => {
                                            e.persist();
                                            this.onChange(e, client);
                                        },
                                    })}/>
                                )}
                            </ApolloConsumer>
                            {isOpen && (
                                <DropDown>
                                        {this.state.charities.map((item, index) =>
                                            <DropDownItem
                                                {...getItemProps({item})}
                                                key={item.id}
                                                highlighted={index === highlightedIndex}
                                            >
                                                <img width="50" src={item.image} alt={item.imageDescription}/>
                                                {item.name}
                                            </DropDownItem>
                                        )}
                                        {!this.state.charities.length && !this.state.loading && (
                                            <DropDownItem>
                                                Nothing found for '{inputValue}'
                                            </DropDownItem>
                                        )}
                                </DropDown>
                            )}
                        </div>
                    )}
                </Downshift>
            </SearchStyles>
        );
    }
}

export default AutoComplete;