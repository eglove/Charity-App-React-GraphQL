import React from 'react';
import PropTypes from 'prop-types';
import RemoveFromFavorites from './RemoveFromFavorites';


const Favorite = ({favorite}) => {
    // first check if nonProfit exists
    if (!favorite.nonProfit) return (
        <>
            <p>This non-profit has been removed from the database.</p>
            <RemoveFromFavorites id={favorite.id}/>
        </>
    );

    return (
        <>
            <div>{favorite.nonProfit.ein} - {favorite.nonProfit.name}
                <RemoveFromFavorites id={favorite.id}/></div>
        </>
    )
};

Favorite.propTypes = {
    favorite: PropTypes.object.isRequired,
};

export default Favorite;