import React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {CURRENT_USER_QUERY} from './User';

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
            <>
                <Mutation
                    mutation={ADD_TO_FAVORITES_MUTATION}
                    variables={{
                        id,
                    }}
                    refetchQueries={[{query: CURRENT_USER_QUERY}]}
                >
                    {(addToFavorites, {loading}) => (
                        <button disabled={loading} aria-disabled={loading} onClick={addToFavorites}>
                            💙 Add{loading && 'ing'} To Favorites 💙
                        </button>
					)}
                </Mutation>
				<style jsx>{`
					button {
						background-color: white;
						border: none;
						text-align: center;
						display: inline-block;
						width: 100%;
						height: 80%;
						font-family: Merriweather;
						font-size: 1em;
					}
					button:hover {
					    background-color: #eeeeee;
					    cursor: pointer;
					}
				`}</style>
            </>
        );
    }
}

export default AddToFavorites;