import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_FAVORITES_MUTATION = gql`
	mutation removeFromFavorites($id: ID!) {
		removeFromFavorites(id: $id) {
			id
		}
	}
`;

class RemoveFromFavorites extends React.Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
	};

	// Gets called when server responds back with favorite removal
	update = (cache, payload) => {
		// read the cache
		const data = cache.readQuery({
			query: CURRENT_USER_QUERY
		})
		// remove item from favorites
		const favoriteId = payload.data.removeFromFavorites.id;
		data.me.favorites = data.me.favorites.filter(favorite =>
			favorite.id !== favoriteId);
		// write data back to cache
		cache.writeQuery({ query: CURRENT_USER_QUERY, data });
	}

	render() {
		return (
			<Mutation mutation={REMOVE_FROM_FAVORITES_MUTATION}
				variables={{ id: this.props.id }}
				update={this.update}
				optimisticResponse={{
					__typename: 'Mutation',
					removeFromFavorites: {
						__typename: 'Favorite',
						id: this.props.id,
					}
				}}
			>

				{(removeFromFavorites, { loading, error }) => (
					<>
						&emsp;
						<button
							disabled={loading}
							aria-disabled={loading}
							onClick={() => {
								removeFromFavorites().catch(err => alert(error.message));
							}}
							title="Delete From Favorites"
						>
							&times;
						</button>
					</>
				)}
			</Mutation>
		);
	}
}

export default RemoveFromFavorites;