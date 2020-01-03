import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import User from './User';
import Favorite from './Favorite';

const Favorites = () => {
    return (
        <>
            <User>{({ data: { me } }) => {
                if (!me) return null;
                return (
                    <div>
                        <h3>{me.name}'s Favorites</h3>
                        <p>You Have {me.favorites.length} {me.favorites.length === 1 ? 'Charity' : 'Charities'} In Your Favorites</p>
                        <ul>
                            {me.favorites.map(favorite => <Favorite key={favorite.id} favorite={favorite} />)}
                        </ul>
                    </div>
                )
            }}</User>
        </>
    )
};

export default Favorites;