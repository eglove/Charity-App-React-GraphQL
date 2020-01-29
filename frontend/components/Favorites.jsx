import React from "react";
import User from "./User";
import Supreme from "./styles/Supreme";
import SignIn from "./SignIn";
import Favorite from "./Favorite";
import formatMoney from "../lib/formatMoney";
import styled from "styled-components";
import History from "./History";
import Head from "next/head";

const Underline = styled.a`
    text-decoration: underline;
    cursor: pointer;
`;

const Favorites = props => {
    return (
        <User>
            {({data: {me}}) => {
                if (!me) return <SignIn/>;
                return (
                    <>
                        <Head>
                            <title>Cognitame 💙 Favorites</title>
                        </Head>
                        <Supreme>{me.name}'s Favorites</Supreme>
                        <p>You have {me.favorites.length} favorite{me.favorites.length === 1 ? '' : 's'}.</p>
                        <p>
                            Total donated: {formatMoney(me.totalDonated ? me.totalDonated * 100 : 0)}
                        </p>
                        Donation History (Enter Year)
                        <History id={me.id} favorites={me.favorites}/>
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
