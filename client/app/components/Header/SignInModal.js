import React from 'react';
import { Button, Modal } from 'material-ui';
import { SignInWindow } from "./SignInWindow";

class SignInModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};

		this.validateCredentials = this.validateCredentials.bind(this);
		this.beginSignInProcess = this.beginSignInProcess.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.signInSuccess = this.signInSuccess.bind(this);
		this.signInFail = this.signInFail.bind(this);
		this.closeModal= this.closeModal.bind(this);
		this.handleSignInButton= this.handleSignInButton.bind(this);
	}

	closeModal() {
		this.setState({
			open: false,
		});
	}

	beginSignInProcess() {
		this.setState({
			open: true,
		});
		console.log("Sign In");
	}

	validateCredentials() {
		console.log("Validating...");
		this.signInSuccess();
		// this.signInFail();
	}

	signInFail() {
		console.log("Sign in failure");
	}

	signInSuccess() {
		this.setState({
			open: false,
			isLoggedIn: true,
		});
		console.log("Successfully signed in");
	}

	handleLogout() {
		this.setState({
			isLoggedIn: false,
			open: false,
		});

		console.log("Logged out");
	}

	handleSignInButton() {
		console.log("Clicked sign in button");
		this.setState({
			open: true,
		});
	}

	render() {
		// When this button is clicked, present the sign in window
		return(
			<div>
				<Button color={"inherit"} onClick={this.handleSignInButton}> Sign In </Button>
				<Modal disableAutoFocus open={this.state.open} onClick={this.closeModal}>
					<SignInWindow handleNextButton={this.validateCredentials}/>
				</Modal>
			</div>
		)
	}
}
export {SignInModal}
