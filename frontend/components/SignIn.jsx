import React, {Component} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import Head from 'next/head';
import Form from "./styles/Form";
import Error from './ErrorMessage';
import {CURRENT_USER_QUERY} from "./User";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION(
        $email: String!
        $password: String!
    ) {
        signin (
            email: $email,
            password: $password
        ) {
            id
            email
            name
        }
    }
`;

const Center = styled.span`
    text-align: center;
`;

class SignIn extends Component {

    state = {
        email: '',
        password: '',
    };

    saveToState = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                refetchQueries={[
                    {query: CURRENT_USER_QUERY}
                ]}
            >
                {(signup, {error, loading}) => {
                    return (
                        <>
                            <Head>
                                <title>Cognitame 👏 SignIn</title>
                            </Head>
                            <Form
                                method="POST"
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await signup();
                                    this.setState({name: '', email: '', password: ''});
                                    Router.push("/");
                                }}
                            >
                                <fieldset disabled={loading} aria-busy={loading}>
                                    <h2>Sign In To Your Account</h2>
                                    <Error error={error}/>
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
                                    <button type="submit">Sign{loading ? 'ing' : ''} In!</button>
                                </fieldset>
                                <Center>
                                    <Link href="signup">
                                        <a>Sign Up for New Account</a>
                                    </Link>
                                    <br/>
                                    <Link href="reset">
                                        <a>Reset Password</a>
                                    </Link>
                                </Center>
                            </Form>
                        </>
                    )
                }}
            </Mutation>
        );
    }
}

export default SignIn;