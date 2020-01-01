import Link from 'next/link';
import User from './User';

const Nav = () => (
    <>
        <User>
            {({data: {me}}) => (
                <ul className="topnav component">
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/nonProfits">
                            <a>All Charities</a>
                        </Link>
                    </li>
                    {me && (
                        <>
                            <li>
                                <Link href="/favorites">
                                    <a>Favorites</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account">
                                    <a>Account</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/add">
                                    <a>Add Charity</a>
                                </Link>
                            </li>
                        </>
                    )};

                    {!me && (
                        <li>
                            <Link href="/signup">
                                <a>Sign In</a>
                            </Link>
                        </li>
                    )};

                </ul>
            )}
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
    </>
);

export default Nav;