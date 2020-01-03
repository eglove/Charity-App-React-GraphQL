import React from 'react';
import PropTypes from 'prop-types';
import RemoveFromFavorites from './RemoveFromFavorites';


const Favorite = ({ favorite }) => (
	<>
		<div>{favorite.nonProfit.ein} - {favorite.nonProfit.name}
			<RemoveFromFavorites id={favorite.id} /></div>
	</>
)

Favorite.propTypes = {
	favorite: PropTypes.object.isRequired,
};

export default Favorite;