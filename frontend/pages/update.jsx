import React from 'react';
import UpdateNonProfit from "../components/UpdateNonProfit";

const Update = ({query}) => (
    <>
        <UpdateNonProfit id={query.id} />
    </>
);

export default Update;