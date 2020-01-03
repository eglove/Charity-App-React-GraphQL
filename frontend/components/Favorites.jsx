import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const Favorites = () => {
    return (
        <>
            <header>
                <h3>Your Favorites</h3>
                <p>You Have __ Non Profits As Favorites</p>
            </header>
        </>
    )
};

export default Favorites;