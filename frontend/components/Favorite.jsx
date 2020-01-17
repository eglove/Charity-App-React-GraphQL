import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";
import RemoveFromFavorites from "./RemoveFromFavorites";
import AddDonation from "./AddDonation";
import formatMoney from "../lib/formatMoney";

const FavoriteStyles = styled.li`
    padding: 1em 0;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    img {
        margin-right: 10px;
    }
    h2, p {
        margin: 0;
    }
    a {
        text-decoration: underline;
    }
`;

const Favorite = ({favorite}) => {
    // check if item exists
    if (!favorite.charity) return (
        <FavoriteStyles>
            <p>This charity has been removed.</p>
            <RemoveFromFavorites id={favorite.id}/>
        </FavoriteStyles>
    );

    const sumToFavorite = favorite.donations.reduce(function(prev, current) {
        return prev + +current.amount
    }, 0);

    return (
        <FavoriteStyles>
            <img width="100" src={favorite.charity.largeImage} alt={favorite.charity.imageDescription}/>
            <div className="favorite-details">
                <h2>{favorite.charity.name}</h2>
                <p>You've donated {formatMoney(sumToFavorite * 100)}.</p>
                <AddDonation id={favorite.id}/>
                <p>
                    <Link href={favorite.charity.website}>
                        <a>Website</a>
                    </Link>
                    &emsp;
                    <Link href={`https://smile.amazon.com/gp/chpf/homepage?q=${favorite.charity.name}`}>
                        <a>AmazonSmile</a>
                    </Link>
                </p>
                <p>EIN: {favorite.charity.ein} - {favorite.charity.description}</p>
                <p>{favorite.charity.street}</p>
                <p>{favorite.charity.city} {favorite.charity.state} {favorite.charity.zip}</p>
            </div>
            <RemoveFromFavorites id={favorite.id}/>
        </FavoriteStyles>
    )
};

Favorite.propTypes = {
    favorite: PropTypes.object.isRequired,
};

export default Favorite;