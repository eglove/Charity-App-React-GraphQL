import React from 'react';
import {Mutation} from 'react-apollo';
import gql from "graphql-tag";
import {CURRENT_USER_QUERY} from "./User";

const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION {
        signout {
            message
        }
    }
`;

const SignOut = props => (
    <>
        <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{query: CURRENT_USER_QUERY}]}>
            {(signout) => <div className="center"><button className="navButton" onClick={signout}>Sign Out</button></div>}
        </Mutation>
        <style jsx>{`
            .navButton {
                background-color: #1976d2;
                border: none;
                color: white;
                padding: 14px 16px;
                text-decoration: none;
                display: inline-block;
                font-size 1em; 
                font-family: Raleway;   
                float: left;        
            }
            .navButton:hover:not(.active) {background-color: #0d47a1;}
            @media screen and (max-width: 600px) {
               .navButton {float: none;}
            }
        `}</style>
    </>
);

export default SignOut;