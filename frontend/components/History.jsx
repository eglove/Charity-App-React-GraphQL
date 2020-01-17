import React, {Component} from 'react';
import User from "./User";
import Moment from "moment";
import formatMoney from "../lib/formatMoney";

const History = () => {
    return (
        <User>
            {({data: {me}}) => {
                Moment.locale('en');
                const donationItems = (me.favorites.map(favorite => favorite.donations.map(donation => (
                        <li key={donation.id}>
                            {formatMoney(donation.amount * 100)} - {Moment(donation.dateDonated).format('MMM. DD, YYYY')}
                        </li>
                    )
                )));
                return (
                    <>
                    <p>History</p>
                    <ul>{donationItems}</ul>
                    </>
                )
            }}
        </User>
    )
};

export default History;