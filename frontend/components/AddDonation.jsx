import React, {Component} from "react";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Error from "./ErrorMessage";
import Form from "./styles/Form";

const ADD_DONATION_MUTATION = gql`
    mutation ADD_DONATION_MUTATION (
        $id: ID!,
        $amount: Float!,
        $dateDonated: DateTime!,
    ) {
        addDonation(
            id: $id, 
            amount: $amount,
            dateDonated: $dateDonated,
        ) {
            id
            amount
        }
    }
`;

const Required = styled.span`
    color: red;
`;

class UpdateCharity extends Component {
    state = {
        id: this.props.id,
        amount: 0,
        dateDonated: '',
    };

    handleChange = e => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    };

    render() {
        console.log(this.state);
        return (
            <Mutation mutation={ADD_DONATION_MUTATION} variables={this.state}>
                {(addDonation, {loading, error}) => (
                    <details>
                        <summary>Add Donation</summary>
                        <Form onSubmit={async (e) =>{
                            e.preventDefault();
                            const res = await addDonation();
                        }}>
                            <Error error={error}/>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <label htmlFor="amount">
                                    Amount <Required>*</Required>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="amount"
                                        name="amount"
                                        placeholder="Amount"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </label>
                                <label htmlFor="dateDonated">
                                    Amount <Required>*</Required>
                                    <input
                                        type="date"
                                        id="dateDonated"
                                        name="dateDonated"
                                        placeholder="Date Donated"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </label>
                                <button type="submit">Add{loading ? 'ing' : ''} Donation</button>
                            </fieldset>
                        </Form>
                    </details>
                )}
            </Mutation>
        )
    }
}

export default UpdateCharity;
export {ADD_DONATION_MUTATION};