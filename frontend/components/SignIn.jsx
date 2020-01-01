import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from "graphql-tag";
import {CURRENT_USER_QUERY} from "./User";

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION(
        $email: String!,
        $password: String!
    ) {
        signin(
            email: $email,
            password: $password
        ) {
            id
            email
            name
        }
    }
`;

class SignIn extends Component {

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
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                refetchQueries={[{query: CURRENT_USER_QUERY}]}
            >
                {(signin, {error, loading}) => {
                    return (
                        <form method="post" onSubmit={async (e) => {
                            e.preventDefault();
                            await signin();
                            this.setState({name: '', email: '', password: ''});
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign into Account</h2>
                                <label htmlFor="email">
                                    <input type="email" name="email" placeholder="Email" value={this.state.email}
                                           onChange={this.saveToState}/>
                                </label>
                                <label htmlFor="password">
                                    <input type="password" name="password" placeholder="Password"
                                           value={this.state.password} onChange={this.saveToState}/>
                                </label>
                                <button type="submit">Sign In</button>
                            </fieldset>
                        </form>
                    )
                }}
            </Mutation>
        );
    }
}

export default SignIn;
export {SIGNIN_MUTATION};