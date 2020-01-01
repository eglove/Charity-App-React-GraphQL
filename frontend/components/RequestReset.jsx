import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from "graphql-tag";

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION(
        $email: String!,
    ) {
        requestReset(
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
                        <form method="post" onSubmit={async (e) => {
                            e.preventDefault();
                            await reset();
                            this.setState({email: ''});
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Request a Password Reset</h2>
                                {!error && !loading && called && <p>Success! Check your email for a reset link.</p>}
                                <label htmlFor="email">
                                    <input type="email" name="email" placeholder="Email" value={this.state.email}
                                           onChange={this.saveToState}/>
                                </label>
                                <button type="submit">Request Reset</button>
                            </fieldset>
                        </form>
                    )
                }}
            </Mutation>
        );
    }
}

export default RequestReset;