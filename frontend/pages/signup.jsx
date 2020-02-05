import SignUpComponent from "../components/SignUp";
import styled from "styled-components";
import React from "react";

const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
`;

const SignUp = props => (
    <Columns>
        <SignUpComponent/>
    </Columns>
);

export default SignUp;
