import React, {Component} from "react";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Error from "./ErrorMessage";
import Form from "./styles/Form";
import {CURRENT_USER_QUERY} from "./User";

const ADD_DONATION_MUTATION = gql`
    mutation ADD_DONATION_MUTATION (
        $id: ID!,
        $amount: Float!,
        $yearDonated: Int!,
        $receipt: String,
    ) {
        addDonation(
            id: $id,
            amount: $amount,
            yearDonated: $yearDonated,
            receipt: $receipt,
        ) {
            id
            amount
        }
    }
`;

const Required = styled.span`
    color: red;
`;

class AddDonation extends Component {
    state = {
        id: this.props.id,
        amount: 0,
        yearDonated: '',
        receipt: '',
    };

    handleChange = e => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    };

    uploadFile = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // Preset to resize images via cloudinary
        data.append('upload_preset', 'CharityApp');

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/eglove/image/upload',
            {
                method: 'POST',
                body: data
            }
        );
        const file = await res.json();
        this.setState({
            receipt: file.secure_url,
        })
    };

    render() {
        return (
            <Mutation
                mutation={ADD_DONATION_MUTATION}
                variables={this.state}
                refetchQueries={[{query: CURRENT_USER_QUERY}]}
            >
                {(addDonation, {loading, error}) => (
                    <details>
                        <summary>Add Donation</summary>
                        <Form onSubmit={async (e) => {
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
                                <label htmlFor="yearDonated">
                                    Year Donated <Required>*</Required>
                                    <input
                                        type="number"
                                        id="yearDonated"
                                        name="yearDonated"
                                        placeholder="Year Donated"
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
                                        onChange={this.uploadFile}
                                    />
                                    {this.state.receipt && (
                                        <img src={this.state.receipt} width="200" alt="Image Upload Preview"/>)}
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

export default AddDonation;
export {ADD_DONATION_MUTATION};
