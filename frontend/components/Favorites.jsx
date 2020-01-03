import React from "react";
import {adopt} from 'react-adopt';
import User from './User';
import Favorite from './Favorite';

const Composed = adopt({
    user: ({render}) => <User>{render}</User>,
});

const Favorites = () => {
    return (
        <>
            <Composed>{({user}) => {
                const me = user.data.me;
                if (!me) return null;
                return (
                    <div>
                        <h3>{me.name}'s Favorites</h3>
                        <p>You Have {me.favorites.length} {me.favorites.length === 1 ? 'Charity' : 'Charities'} In Your
                            Favorites</p>
                        <ul>
                            {me.favorites.map(favorite => <Favorite key={favorite.id} favorite={favorite}/>)}
                        </ul>
                    </div>
                )
            }}</Composed>
        </>
    )
};

export default Favorites;