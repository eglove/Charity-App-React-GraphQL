import React from "react";
import User from "./User";
import formatMoney from "../lib/formatMoney";

const History = () => {
  return (
    <User>
      {({ data: { me } }) => {
        console.log(me);
        const donationItems = me.favorites.map(favorite =>
            favorite.donations.map(donation => (
            <li key={donation.id}>
              {formatMoney(donation.amount * 100)} -{" "}
              {donation.yearDonated}
            </li>
          ))
        );
        return (
          <>
            <p>History</p>
            <ul>{donationItems}</ul>
          </>
        );
      }}
    </User>
  );
};

export default History;
