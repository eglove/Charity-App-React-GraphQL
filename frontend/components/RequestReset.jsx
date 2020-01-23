import React, {Component} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import Head from 'next/head';
import Form from "./styles/Form";
import Error from './ErrorMessage';
import Link from "next/link";

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION(
        $email: String!
    ) {
        requestReset (
            email: $email,
        ) {
            message
        }
    }
`;

class RequestReset extends Component {

    state = {
        email: '',
    };

    saveToState = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <Mutation
                mutation={REQUEST_RESET_MUTATION}
                variables={this.state}
            >
                {(reset, {error, loading, called}) => {
                    return (
                        <>
                            <Head>
                                <title>Cognitame ⛑ RequestReset</title>
                            </Head>
                            <Form
                                method="POST"
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await reset();
                                    this.setState({email: ''});
                                }}
                            >
                                <fieldset disabled={loading} aria-busy={loading}>
                                    <h2>Request a Password Reset</h2>
                                    <Error error={error}/>
                                    {!error && !loading && called && <p>Success! Check your email for a reset link.</p>}
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
                                    <button type="submit">Request{loading ? 'ing' : ''}</button>
                                </fieldset>
                                <Link href="signin" style="text-align:center">
                                    <a>Sign into Existing Account</a>
                                </Link>
                                <br/>
                                <Link href="signup">
                                    <a>Sign Up for New Account</a>
                                </Link>
                            </Form>
                        </>
                    )
                }}
            </Mutation>
        );
    }
}

export default RequestReset;