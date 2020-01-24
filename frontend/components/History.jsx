import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";

const SEARCH_BY_YEAR_QUERY = gql`
    query SEARCH_BY_YEAR_QUERY($year: Int!, $id: ID!) {
        donations(
            where: {
                yearDonated: $year
                favorite: {
                    user: {
                        id: $id
                    }
                }
            }
        ) {
            id
            amount
            yearDonated
        }
    }
`;

class History extends Component {

    state = {
        year: new Date().getFullYear(),
        id: this.props.id,
    };

    handleChange = e => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;

        this.setState({[name]: val})
    };

    render() {
        let totalDonated = 0;
        return (
            <Query
                query={SEARCH_BY_YEAR_QUERY}
                variables={this.state}
            >
                {({data}) => (
                    <>
                        <form>
                            <label htmlFor="year">
                                <input
                                    type="number"
                                    id="year"
                                    name="year"
                                    placeholder="Year"
                                    defaultValue={new Date().getFullYear()}
                                    onChange={this.handleChange}
                                    required
                                />
                            </label>
                        </form>
                        <span hidden>{totalDonated = 0}</span>
                        {data.donations.map(donation =>
                          {totalDonated = donation.amount + totalDonated},
                        )}
                        <p>Total Donated for {this.state.year}: {formatMoney(totalDonated * 100)}</p>
                        <details>
                            <summary>See Transactions for {this.state.year}</summary>
                            <ul>
                                {data.donations.map(donation =>
                                    <li key={donation.id}>
                                        {formatMoney(donation.amount * 100)}
                                    </li>
                                )}
                            </ul>
                        </details>
                    </>
                )}
            </Query>
        );
    }
}

export default History;