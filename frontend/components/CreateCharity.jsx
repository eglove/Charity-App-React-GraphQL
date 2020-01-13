import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import Head from 'next/head';
import Error from './ErrorMessage';
import Form from "./styles/Form";

const CREATE_CHARITY_MUTATION = gql`
    mutation CREATE_CHARITY_MUTATION(
        $ein: String!
        $name: String!
        $description: String!
        $website: String
        $image: String
        $largeImage: String
        $imageDescription: String
        $street: String
        $city: String
        $state: String
        $zip: String
    ) {
        createCharity(
            ein: $ein
            name: $name
            description: $description
            website: $website
            image: $image
            largeImage: $largeImage
            imageDescription: $imageDescription
            street: $street
            city: $city
            state: $state
            zip: $zip
        ) {
            id
        }
    }
`;

const Required = styled.span`
    color: red;
`;
const LookupLink = styled.a`
    text-decoration: underline;
`;

class CreateCharity extends Component {
    state = {
        ein: '',
        name: '',
        description: '',
        website: '',
        image: '',
        largeImage: '',
        imageDescription: '',
        street: '',
        city: '',
        state: '',
        zip: ''
    };

    handleChange = (e) => {
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
            image: file.secure_url,
            largeImage: file.eager[0].secure_url,
        })
    };

    render() {
        return (
            <Mutation mutation={CREATE_CHARITY_MUTATION} variables={this.state}>
                {(createCharity, {loading, error}) => (
                    <>
                    <Head>
                        <title>Cognitame 💙 Add Charity</title>
                    </Head>
                    <Form
                        onSubmit={async (e) => {
                            // Stop form from submitting
                            e.preventDefault();
                            // call mutation
                            const res = await createCharity();
                            // redirect to charity page
                            await Router.push({
                                pathname: '/charity',
                                query: {id: res.data.createCharity.id}
                            })
                        }}
                    >
                        <Error error={error}/>
                        <fieldset disabled={loading} aria-busy={loading}>

                            <label htmlFor="ein">
                                EIN (<LookupLink href="https://apps.irs.gov/app/eos/">Employer Identification
                                Number</LookupLink>) <Required>*</Required>
                                <input
                                    type="text"
                                    id="ein"
                                    name="ein"
                                    placeholder="EIN"
                                    value={this.state.ein}
                                    onChange={this.handleChange}
                                    required
                                />
                            </label>
                            <label htmlFor="name">
                                Name <Required>*</Required>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    value={this.state.name}
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
                                    value={this.state.description}
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
                                    value={this.state.website}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label htmlFor="file">
                                Image
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    placeholder="Upload Logo"
                                    onChange={this.uploadFile}
                                />
                                {this.state.image && (<img src={this.state.image} width="200" alt="Image Upload Preview"/>)}
                            </label>
                            <label htmlFor="imageDescription">
                                Image Description
                                <textarea
                                    id="imageDescription"
                                    name="imageDescription"
                                    placeholder="Image Description"
                                    value={this.state.imageDescription}
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
                                    value={this.state.street}
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
                                    value={this.state.city}
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
                                    value={this.state.state}
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
                                    value={this.state.zip}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                    </>
                )}
            </Mutation>
        );
    }
}

export default CreateCharity;
export {CREATE_CHARITY_MUTATION};