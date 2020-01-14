import React, {Component} from "react";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Error from "./ErrorMessage";
import Form from "./styles/Form";

const UPDATE_FAVORITE_MUTATION = gql`
    mutation UPDATE_FAVORITE_MUTATION (
        $id: ID!,
        $amount: Float!
    ) {
        updateFavorite(id: $id, amount: $amount) {
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
        addAmount: 0,
    };

    handleChange = e => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    };

    updateFavorite = async (e, updateFavoriteMutation) => {
        e.preventDefault();
        const res = await updateFavoriteMutation({
            variables: {
                id: this.props.id,
                amount: Number(this.props.amount) + Number(this.state.addAmount) * 100,
            }
        });
    };

    render() {
        console.log(this.props);
        console.log(this.state);
        return (
            <Mutation mutation={UPDATE_FAVORITE_MUTATION} variables={this.state}>
                {(updateFavorite, {loading, error}) => (
                    <details>
                        <summary>Add Donation</summary>
                        <Form onSubmit={e => this.updateFavorite(e, updateFavorite)}>
                            <Error error={error}/>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <label htmlFor="addAmount">
                                    Amount <Required>*</Required>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="addAmount"
                                        name="addAmount"
                                        placeholder="Amount"
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
export {UPDATE_FAVORITE_MUTATION};