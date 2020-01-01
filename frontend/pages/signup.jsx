import SignUpComponent from "../components/SignUp";
import SignIn from "../components/SignIn";
import RequestReset from "../components/RequestReset";

const SignUp = props => (
    <div className="flex-container">
        <div><SignUpComponent/></div>
        <div><SignIn/></div>
        <div><RequestReset/></div>
    </div>
);

export default SignUp;