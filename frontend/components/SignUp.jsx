import React, {Component} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import Head from 'next/head';
import Form from "./styles/Form";
import Error from './ErrorMessage';
import {CURRENT_USER_QUERY} from "./User";

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $name: String!
        $email: String!
        $password: String!
    ) {
        signup (
            name: $name,
            email: $email,
            password: $password
        ) {
            id
            email
            name
        }
    }
`;

class SignUp extends Component {

    state = {
        name: '',
        email: '',
        password: '',
    };

    saveToState = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <Mutation
                mutation={SIGNUP_MUTATION}
                variables={this.state}
                refetchQueries={[{CURRENT_USER_QUERY}]}
            >
                {(signup, {error, loading}) => {
                    return (
                        <>
                            <Head>
                                <title>Cognitame 👏 SignUp</title>
                            </Head>
                        <Form
                            method="POST"
                            onSubmit={async e => {
                                e.preventDefault();
                                await signup();
                                this.setState({name: '', email: '', password: ''});
                            }}
                        >
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign Up For An Account</h2>
                                <Error error={error}/>
                                <label htmlFor="name">
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <label htmlFor="email">
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <button type="submit">Sign{loading ? 'ing' : ''} Up!</button>
                            </fieldset>
                        </Form>
                        </>
                    )
                }}
            </Mutation>
        );
    }
}

export default SignUp;