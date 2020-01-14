import React, {Component} from 'react';
import {Mutation, Query} from 'react-apollo';
import gql from "graphql-tag";
import styled from "styled-components";
import Error from './ErrorMessage';
import Form from "./styles/Form";

const SINGLE_CHARITY_QUERY = gql`
    query SINGLE_CHARITY_QUERY($id: ID!) {
        charity(where: {id: $id}) {
            name
            description
            website
            street
            city
            state
            zip
        }
    }
`;

const UPDATE_CHARITY_MUTATION = gql`
    mutation UPDATE_CHARITY_MUTATION(
        $id: ID!
        $name: String
        $description: String
        $website: String
        $street: String
        $city: String
        $state: String
        $zip: String
    ) {
        updateCharity(
            id: $id
            name: $name
            description: $description
            website: $website
            street: $street
            city: $city
            state: $state
            zip: $zip
        ) {
            id
            name
            description
            website
            street
            city
            state
            zip
        }
    }
`;

const Required = styled.span`
    color: red;
`;
const LookupLink = styled.a`
    text-decoration: underline;
`;

class UpdateCharity extends Component {
    state = {};

    handleChange = (e) => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    };

    updateCharity = async (e, updateCharityMutation) => {
        e.preventDefault();
        const res = await updateCharityMutation({
            variables: {
                id: this.props.id,
                ...this.state,
            }
        });
    };

    render() {
        return (
            <Query query={SINGLE_CHARITY_QUERY} variables={{
                id: this.props.id
            }}>
                {({data, loading}) => {
                    if (loading) return <p>Loading...</p>;
                    if (!data.charity) return <p>No Charity found with ID: {this.props.id}</p>
                    return (
                        <Mutation mutation={UPDATE_CHARITY_MUTATION} variables={this.state}>
                            {(updateCharity, {loading, error}) => (
                                <Form onSubmit={e => this.updateCharity(e, updateCharity)}>
                                    <Error error={error}/>
                                    <fieldset disabled={loading} aria-busy={loading}>
                                        <label htmlFor="name">
                                            Name <Required>*</Required>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Name"
                                                defaultValue={data.charity.name}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </label>
                                        <label htmlFor="description">
                                            Description <Required>*</Required>
                                            <textarea
                                                id="description"
                                                name="description"
                                                placeholder="Description"
                                                defaultValue={data.charity.description}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </label>
                                        <label htmlFor="website">
                                            Website
                                            <input
                                                type="text"
                                                id="website"
                                                name="website"
                                                placeholder="Website"
                                                defaultValue={data.charity.website}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <label htmlFor="street">
                                            Street
                                            <input
                                                type="text"
                                                id="street"
                                                name="street"
                                                placeholder="Street"
                                                defaultValue={data.charity.street}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <label htmlFor="city">
                                            City
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                placeholder="City"
                                                defaultValue={data.charity.city}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <label htmlFor="state">
                                            State
                                            <input
                                                type="text"
                                                id="state"
                                                name="state"
                                                placeholder="State"
                                                defaultValue={data.charity.state}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <label htmlFor="zip">
                                            Zip
                                            <input
                                                type="text"
                                                id="zip"
                                                name="zip"
                                                placeholder="Zip"
                                                defaultValue={data.charity.zip}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                                    </fieldset>
                                </Form>
                            )}
                        </Mutation>
                    )
                }}
            </Query>
        );
    }
}

export default UpdateCharity;
export {UPDATE_CHARITY_MUTATION};