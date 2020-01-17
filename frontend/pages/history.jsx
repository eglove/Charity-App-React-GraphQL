import HistoryComponent from "../components/History";
import PleaseSignIn from "../components/PleaseSignIn";
import React from "react";

const History = props => (
    <PleaseSignIn>
        <HistoryComponent/>
    </PleaseSignIn>
);

export default History;