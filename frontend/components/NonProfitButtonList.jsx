import User from './User';
import Link from "next/link";
import AddToFavorites from "./AddToFavorites";
import DeleteNonProfit from "./DeleteNonProfit";

const NonProfitButtonList = (props) =>

    <User>
        {({data}) => {
            const me = data ? data.me : null;
            const {nonProfit} = props;
            return (
                <>
                    <div className="flex-container">
                        {me && me.permissions.includes("ADMIN") && (
                            <div>
                                <Link href={`/update?id=${nonProfit.id}`}>
                                    <a>Edit</a>
                                </Link>
                            </div>
                        )}
                        {me && (
                            <div>
                                <AddToFavorites id={nonProfit.id}/>
                            </div>
                        )}
                        {me && me.permissions.includes("ADMIN") && (
                            <div>
                                <DeleteNonProfit id={nonProfit.id}>Delete This Item</DeleteNonProfit>
                            </div>
                        )}

                    </div>
                    <style jsx>{`
                        .flex-container {
                            flex-wrap: nowrap;
                        }
                        .flex-container > div > a {
                            text-decoration: none;
                            color: black;
                            display: inline-block;
                            width: 100%;
                            height: 80%;
                        }
                        .flex-container > div > a:hover {
                            background-color: #eeeeee;
                        }
                    `}</style>
                </>
            )
        }}
    </User>;

export default NonProfitButtonList;