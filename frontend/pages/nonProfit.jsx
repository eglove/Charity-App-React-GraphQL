import React from "react";
import SingleNonProfit from "../components/SingleNonProfit";

const NonProfit = (props) => (
    <div className="component">
        <SingleNonProfit id={props.query.id}/>
    </div>
);

export default NonProfit;