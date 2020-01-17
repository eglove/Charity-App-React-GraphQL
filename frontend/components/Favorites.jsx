import React from "react";
import User from "./User";
import Supreme from "./styles/Supreme";
import SignIn from "./SignIn";
import Favorite from "./Favorite";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";

const Favorites = () => {
    return (
        <User>
            {({data: {me}}) => {
                if (!me) return <SignIn/>;
                return (
                    <>
                        <Supreme>{me.name}'s Favorites</Supreme>
                        <p>You have {me.favorites.length} favorite{me.favorites.length === 1 ? '' : 's'}.</p>
                        <p>Total donated: {formatMoney(me.totalDonated ? me.totalDonated * 100 : 0)}</p>

                        <ul>
                            {me.favorites.map(favorite => <Favorite key={favorite.id} favorite={favorite}/>)}
                        </ul>
                    </>
                );
            }}
        </User>
    );
};

export default Favorites;