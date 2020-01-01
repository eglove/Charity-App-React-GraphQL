import ResetComponent from "../components/Reset";

const Reset = props => (
	<>
		<p>Reset your password. {props.query.resetToken}</p>
		<ResetComponent resetToken={props.query.resetToken}/>
	</>
);

export default Reset;