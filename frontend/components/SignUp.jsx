import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from "graphql-tag";
import Error from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!,
        $name: String!,
        $password: String!
    ) {
        createUser(data: {
            name: $name,
            email: $email,
            password: $password
        }) {
            id
            name
            email
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
            <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
                {(createUser, {error, loading}) => {
                    return (
                        <form method="post" onSubmit={async (e) => {
                            e.preventDefault();
                            await createUser();
                            this.setState({name: '', email: '', password: ''});
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign Up for An Account</h2>
                                <Error error={error}/>
                                <label htmlFor="email">
                                    <input type="email" name="email" placeholder="Email" value={this.state.email}
                                           onChange={this.saveToState}/>
                                </label>
                                <label htmlFor="name">
                                    <input type="text" name="name" placeholder="Name" value={this.state.name}
                                           onChange={this.saveToState}/>
                                </label>
                                <label htmlFor="password">
                                    <input type="password" name="password" placeholder="Password"
                                           value={this.state.password} onChange={this.saveToState}/>
                                </label>
                                <button type="submit">Sign Up</button>
                            </fieldset>
                        </form>
                    )
                }}
            </Mutation>
        );
    }
}

export default SignUp;