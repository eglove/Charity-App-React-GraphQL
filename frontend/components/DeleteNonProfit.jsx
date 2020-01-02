import React, {Component} from "react";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import {ALL_NONPROFITS_QUERY} from "./NonProfits";

const DELETE_NONPROFIT_MUTATION = gql`
    mutation DELETE_NONPROFIT_MUTATION($id: ID!) {
        deleteNonProfit(id: $id) {
            name
        }
    }
`;

class DeleteNonProfit extends Component {
    update = (cache, payload) => {
        // manually update the cache on the client, so it matches the server
        // 1. Read the cache for the nonProfits we want
        const data = cache.readQuery({query: ALL_NONPROFITS_QUERY});
        console.log(data, payload);
        // 2. Filter the deleted nonProfit out of the page
        data.nonProfits = data.nonProfits.filter(nonProfit => nonProfit.id !== payload.data.deleteNonProfit.id);
        // 3. Put the nonProfits back!
        cache.writeQuery({query: ALL_NONPROFITS_QUERY, data});
    };

    render() {
        return (
            <Mutation
                mutation={DELETE_NONPROFIT_MUTATION}
                variables={{id: this.props.id}}
                update={this.update}
            >
                {(deleteNonProfit, {error}) => (
                    <button
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this item?")) {
                                deleteNonProfit().catch(err => {
                                    alert(err.message);
                                });
                            }
                        }}
                    >
                        {this.props.children}
                    </button>
                )}
            </Mutation>
        );
    }
}

export default DeleteNonProfit;