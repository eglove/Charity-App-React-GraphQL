import React from 'react';
import Downshift from "downshift";
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
        return (
            <div>
                <ApolloConsumer>
                    {(client) => (
                        <input
                            type="search"
                            onChange={(e) => {
                                e.persist();
                                this.onChange(e, client);
                            }}
                        />
                    )}
                </ApolloConsumer>
                <>
                    {this.state.nonProfits.map(nonProfit =>
                        <div key={nonProfit.id}>
                            {nonProfit.name}
                        </div>
                    )}
                </>
            </div>
        )
    }
}

export default AutoComplete;