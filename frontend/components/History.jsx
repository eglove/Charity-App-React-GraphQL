import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import Link from "next/link";
import styled from "styled-components";
import {DataTable} from "./Favorites";

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
            receipt
            favorite {
                charity {
                    name
                }
            }
        }
    }
`;

const FloatFix = styled.div`
    details {
        clear: both;
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
                    <DataTable>
                        <table>
                            <tr>
                                <th>
                                    Donated in:&emsp;
                                    <form className="floatRight">
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
                                </th>
                            </tr>
                            <span hidden>{totalDonated = 0}</span>
                            {data.donations.map(donation => {
                                    totalDonated = donation.amount + totalDonated
                                },
                            )}
                            <tr>
                                <td>{formatMoney(totalDonated * 100)}</td>
                            </tr>
                        </table>
                        <FloatFix>
                        <details>
                            <summary>See Transactions for {this.state.year}</summary>
                            <ul>
                                {data.donations.map(donation =>
                                    <li key={donation.id}>
                                        {formatMoney(donation.amount * 100)}
                                        {donation.receipt &&
                                        <Link href={donation.receipt}>
                                            <a> See Receipt</a>
                                        </Link>
                                        }
                                        :&emsp;
                                        {donation.favorite.charity.name}
                                        &emsp;
                                        <Link href={{
                                            pathname: "updateDonation",
                                            query: {id: donation.id},
                                        }}>
                                            <a>✍ Edit</a>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </details>
                        </FloatFix>
                    </DataTable>
                )}
            </Query>
        );
    }
}

export default History;
