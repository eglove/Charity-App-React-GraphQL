import React from "react";
import {Mutation} from "react-apollo";
import styled from "styled-components";
import PropTypes from 'prop-types';
import gql from "graphql-tag";
import {CURRENT_USER_QUERY} from "./User";

const REMOVE_FROM_FAVORITES_MUTATION = gql`
    mutation removeFromFavorites($id: ID!) {
        removeFromFavorites(id: $id) {
            id
        }
    }
`;

const BigButton = styled.button`
    font-size: 12px;
    background: none;
    border: 0;
    margin: 5px;
    &:hover {
        color ${props => props.theme.blue};
        cursor: pointer;   
    }
`;

class RemoveFromFavorites extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
    };

    // gets called after server response
    update = (cache, payload) => {
        // read cache
        const data = cache.readQuery({
            query: CURRENT_USER_QUERY
        });
        // remove item from favorites
        const favoriteId = payload.data.removeFromFavorites.id;
        data.me.favorites = data.me.favorites.filter(favorite =>
            favorite.id !== favoriteId);
        // write items back to cache
        cache.writeQuery({query: CURRENT_USER_QUERY, data});
    };

    render() {
        return (
            <Mutation
                mutation={REMOVE_FROM_FAVORITES_MUTATION}
                variables={{id: this.props.id}}
                update={this.update}
                optimisticResponse={{
                    __typename: 'Mutation',
                    removeFromFavorites: {
                        __typename: 'Favorite',
                        id: this.props.id,
                    },
                }}
            >
                {(removeFromFavorites, {loading, error}) => (
                    <>
                    <br/>
                    <BigButton
                        disabled={loading}
                        aria-busy={loading}
                        onClick={() => {
                            removeFromFavorites().catch(err => alert(err.message));
                        }}
                        title="Delete Favorite"
                    >
                        &times; Delete from Favorites
                    </BigButton>
                    </>
                )}
            </Mutation>
        );
    }
}

export default RemoveFromFavorites;