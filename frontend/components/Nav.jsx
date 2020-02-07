import Link from 'next/link';
import NavStyles from "./styles/NavStyles";
import User from "./User";
import SignOut from "./SignOut";
import FavoritesCount from "./FavoritesCount";

const Nav = () => (
    <User>
        {({data: {me}}) => (
            <NavStyles>
                <Link href="charities">
                    <a>Charities</a>
                </Link>
                {me && (
                    <>
                        <Link href="add">
                            <a>Add</a>
                        </Link>
                        <Link href="favorites">
                            <a>
                                Favorites
                                <FavoritesCount count={me.favorites.length}/>
                            </a>
                        </Link>
                        <SignOut/>
                    </>
                )}
                {!me && (
                    <Link href="signin">
                        <a>Sign In</a>
                    </Link>
                )}
            </NavStyles>
        )}
    </User>
);

export default Nav;
