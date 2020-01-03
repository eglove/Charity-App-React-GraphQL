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

	render() {
		return (
			<Mutation mutation={REMOVE_FROM_FAVORITES_MUTATION} variables={{ id: this.props.id }}>
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