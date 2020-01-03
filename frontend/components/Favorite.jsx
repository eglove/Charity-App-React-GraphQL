import React from 'react';
import PropTypes from 'prop-types';


const Favorite = (props) => (
	<>
		<div>{props.favorite.nonProfit.ein} - {props.favorite.nonProfit.name}</div>
	</>
)

Favorite.propTypes = {
	favorite: PropTypes.object.isRequired,
};

export default Favorite;