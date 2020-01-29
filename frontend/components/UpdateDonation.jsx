import React, {Component} from "react";
import {Mutation, Query} from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const SINGLE_DONATION_QUERY = gql`
    query SINGLE_DONATION_QUERY($id: ID!) {
        donation(where: {id: $id}) {
            amount
            yearDonated
            receipt
        }
    }
`;

const UPDATE_DONATION_MUTATION = gql`
    mutation UPDATE_DONATION_MUTATION (
        $id: ID!
        $yearDonated: Int
        $amount: Float
        $receipt: String
    ) {
        updateDonation(
            id: $id
            yearDonated: $yearDonated
            amount: $amount
            receipt: $receipt
        ) {
            id
            yearDonated
            amount
            receipt
        }
    }
`;

class UpdateDonation extends Component {

    state = {};

    handleChange = (e) => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    };

    updateDonation = async (e, updateDonationMutation) => {
        e.preventDefault();
        const res = await updateDonationMutation({
            variables: {
                id: this.props.id,
                ...this.state,
            }
        });
    };

    render() {
        return (
            <Query
                query={SINGLE_DONATION_QUERY}
                variables={{id: this.props.id}}
            >
                {({data, loading}) => {
                    if (loading) return <p>Loading...</p>;
                    if (!data.donation) return <p>No donation found with ID: {this.props.id}</p>;
                    return (
                        <Mutation
                            mutation={UPDATE_DONATION_MUTATION}
                            variables={this.state}
                        >
                            {(updateDonation, {loading, error}) => (
                                <Form onSubmit={e => this.updateDonation(e, updateDonation)}>
                                    <Error error={error}/>
                                    <fieldset disabled={loading} aria-busy={loading}>
                                        <label htmlFor="amount">
                                            Amount
                                            <input
                                                type="number"
                                                step="0.01"
                                                id="amount"
                                                name="amount"
                                                placeholder="Amount"
                                                defaultValue={data.donation.amount}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </label>
                                        <label htmlFor="yearDonated">
                                            Year Donated
                                            <input
                                                type="number"
                                                id="yearDonated"
                                                name="yearDonated"
                                                placeholder="Year Donated"
                                                defaultValue={data.donation.yearDonated}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </label>
                                        <label htmlFor="file">
                                            Receipt
                                            <input
                                                type="file"
                                                id="file"
                                                name="file"
                                                placeholder="Upload Receipt"
                                                defaultValue={data.donation.receipt}
                                                onChange={this.uploadFile}
                                            />
                                            {this.state.receipt && (
                                                <img src={this.state.receipt} width="200" alt="Image Upload Preview"/>)}
                                        </label>
                                        <button type="submit">Update{loading ? 'ing' : ''} Donation</button>
                                    </fieldset>
                                </Form>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default UpdateDonation;
