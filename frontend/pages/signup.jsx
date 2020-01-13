import SignUpComponent from "../components/SignUp";
import SignIn from "../components/SignIn";
import RequestReset from "../components/RequestReset";
import styled from "styled-components";
import Link from "next/link";

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