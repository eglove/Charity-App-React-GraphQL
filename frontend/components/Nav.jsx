import Link from "next/link";
import User from "./User";
import SignOut from "./SignOut";
import FavoritesCount from "./FavoritesCount";
import Search from './Search';

const Nav = () =>
    <>
        <User>
            {({data}) => {
                const me = data ? data.me : null;
                return (
                    <>
                    <ul className="topnav component">
                        <li>
                            <Link href="/nonProfits">
                                <a>Find Charities</a>
                            </Link>
                        </li>
                        {me && (
                            <>
                                <li>
                                    <Link href="/favorites">
                                        <a>
                                            Favorites (
                                            <FavoritesCount count={me.favorites.length}/>)
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/account">
                                        <a>Account</a>
                                    </Link>
                                </li>
                                <SignOut/>
                            </>
                        )}

                        {!me && (
                            <li>
                                <Link href="/signup">
                                    <a>Sign In</a>
                                </Link>
                            </li>
                        )}
                    </ul>
                    <Search/>
                    </>
                )
            }}
        </User>
        <style jsx>{`
            ul.topnav {
                list-style-type: none;
                padding: 0;
                overflow: hidden;
                background-color: #1976d2;
                font-family: Raleway;
                font-size: 20px;
            }
    
            ul.topnav li {float: left;}
    
            ul.topnav li a {
                display: block;
                color: white;
                text-align: center;
                padding: 14px 16px;
                text-decoration: none;
            }
    
            ul.topnav li a:hover:not(.active) {background-color: #0d47a1;}
    
            ul.topnav li a.active {background-color: #2196f3;}
    
            ul.topnav li.right {float: right;}
    
            @media screen and (max-width: 600px) {
                ul.topnav li.right,
                ul.topnav li {float: none;}
                }
        `}</style>
    </>;

export default Nav;