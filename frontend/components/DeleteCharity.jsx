import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_CHARITIES_QUERY} from './Charities'

const DELETE_CHARITY_MUTATION = gql`
    mutation DELETE_CHARITY_MUTATION($id: ID!) {
        deleteCharity(id: $id) {
            id
        }
    }
`;

class DeleteCharity extends Component {

    update = (cache, payload) => {
        // Manually update cache on client to match server
        // read current items in cache
        const data = cache.readQuery({query: ALL_CHARITIES_QUERY});
        // filter deleted item out of cache
        data.charities = data.charities.filter(charity => charity.id !== payload.data.deleteCharity.id);
        // put filtered items back
        cache.writeQuery({query: ALL_CHARITIES_QUERY, data});
    };

    render() {
        return (
            <Mutation
                mutation={DELETE_CHARITY_MUTATION}
                variables={{id: this.props.id}}
                update={this.update}
            >
                {(deleteCharity, {error}) => (
                        <button onClick={() => {
                            if (confirm('Are you sure you want to delete this?')) {
                                deleteCharity().catch(err => {
                                    alert(err.message);
                                });
                            }
                        }}>Delete ❌
                        </button>
                )}
            </Mutation>
        );
    }
}

export default DeleteCharity;
