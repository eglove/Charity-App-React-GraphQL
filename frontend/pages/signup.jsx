import SignUpComponent from "../components/SignUp";
import SignIn from "../components/SignIn";

const SignUp = props => (
    <div className="flex-container">
        <div><SignUpComponent/></div>
        <div><SignIn/></div>
    </div>
);

export default SignUp;