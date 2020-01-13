import User from "./User";
import Link from "next/link";
import AddToFavorites from "./AddToFavorites";
import DeleteCharity from "./DeleteCharity";
import ItemStyles from "./styles/ItemStyles";
import React from "react";
import RemoveFromFavorites from "./RemoveFromFavorites";

const FavoritesButtonList = props =>
    <User>
        {({data}) => {
            const me = data ? data.me : null;
            const {charity} = props;
            const charityIds = me ? me.favorites.map(favorite => favorite.charity.id) : null;
            return (
                <>
                    <div className="buttonList">
                        {me && me.permissions.includes("ADMIN") && (
                            <Link href={{
                                pathname: "/update",
                                query: {id: charity.id}
                            }}>
                                <a>Edit ✍</a>
                            </Link>
                        )}
                        {!me && (
                            <Link href="signup">
                                <a>💙 Sign Up to Add Favorites 💙</a>
                            </Link>
                        )}
                        {me && !charityIds.includes(charity.id) && (
                            <AddToFavorites id={charity.id}/>
                        )}
                        {me && charityIds.includes(charity.id) && (
                            <Link href="favorites">
                                <a>💙 Go To Favorites 💙</a>
                            </Link>
                        )}
                        {me && me.permissions.includes("ADMIN") && (
                            <DeleteCharity id={charity.id}/>
                        )}
                    </div>
                </>
            );
        }}
    </User>
;

export default FavoritesButtonList;