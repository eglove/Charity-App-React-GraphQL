import ResetComponent from "../components/Reset";

const Reset = props => (
    <ResetComponent resetToken={props.query.resetToken}/>
);

export default Reset;