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

const DataTable = styled.div`
    table {
        overflow-x:auto;
        border-collapse: collapse;
        float: left;
        margin-top: 5px;
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding 3px;
    }
    th {
        border-bottom: none;
    }
    .floatRight {
        float: right;
    }
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
                        <DataTable>
                            <table>
                                <tr>
                                    <th># of Favorites</th>
                                    <th>Total Donated</th>
                                </tr>
                                <tr>
                                    <td>{me.favorites.length}</td>
                                    <td>{formatMoney(me.totalDonated ? me.totalDonated * 100 : 0)}</td>
                                </tr>
                            </table>
                        </DataTable>
                        <History id={me.id} favorites={me.favorites}/>
                        {me.favorites.map(favorite => <Favorite key={favorite.id} favorite={favorite}/>)}
                    </>
                );
            }}
        </User>
    );
};

export default Favorites;
export {DataTable};
