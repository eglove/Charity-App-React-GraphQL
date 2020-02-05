import React from "react";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import {CURRENT_USER_QUERY} from "./User";

const ADD_TO_FAVORITES_MUTATION = gql`
    mutation addToFavorites($id: ID!) {
        addToFavorites(id: $id) {
            id
        }
    }
`;

class AddToFavorites extends React.Component {
    render() {
        const {id} = this.props;

        return (
            <Mutation
                mutation={ADD_TO_FAVORITES_MUTATION}
                variables={{id}}
                refetchQueries={[{query: CURRENT_USER_QUERY}]}
            >
                {(addToFavorites, {loading}) => (
                    <button disabled={loading} aria-busy={loading} onClick={addToFavorites}>💙
                        Add{loading ? 'ing' : ''} To Favorites 💙</button>
                )}
            </Mutation>
        );
    }
}

export default AddToFavorites;
