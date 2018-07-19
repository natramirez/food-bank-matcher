import React from 'react';
import {Card, CardHeader, Grid, Button, TextField} from 'material-ui';
import {StyledLink} from "../utils/StyledLink";

const SignInForm = () => {
	const CreateAccountLink = props => <StyledLink to={{pathname: "/user/signUp",}} {...props}/>;
	const GridContainer = {
		container: true,
		spacing: 8,
		direction: "row",
		justify: "flex-start",
		alignItems: "flex-start",
		style: {
			// marginRight: "10px",
			// backgroundColor: "yellow"
		}
	};

	const GridItem = {
		item: true,
		xs: 12,
		style: {
			margin: "15px",
		}
	};
	const Fields = {
		email: {
			type: "text",
			name: "logemail",
			placeholder: "E-mail",
		},
		password: {
			type: "password",
			name: "logpassword",
			placeholder: "Password",
		},
	};

	return(
		<Grid {...GridContainer}>
			{/*<form action="/api/registeredUsers" method="post">*/}
			<Grid {...GridItem}
				  // style={{backgroundColor: "purple"}}
			> <TextField {...Fields.email} /> </Grid>

			<Grid {...GridItem}
				  // style={{backgroundColor: "orange"}}
			> <TextField {...Fields.password} /> </Grid>
			{/*<Grid {...GridItem}> <input type="submit" value="Log in"/> </Grid>*/}
			<Grid item xs={5}
				  // style={{backgroundColor: "green"}}
			>
				<Button size="small" component={CreateAccountLink}
						style={{color: "black"}}> Next </Button>
			</Grid>

			<Grid item xs={7}
				  // style={{backgroundColor: "brown"}}
			>
				<Button size="small" component={CreateAccountLink} style={{color: "black"}}>Create Account</Button>
			</Grid>
			{/*// </form>*/}
		</Grid>
	)
};

class SignInWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			email: "",
			password: "",
		};

		this.submitAll = this.submitAll.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);

	}

	handleInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit(event) {
		console.log("Submitting: " + event.target.name);
		event.preventDefault();
	}

	submitAll() {
		console.log("Submitting form with values: ");
		console.log("\tEmail: " + this.state.email);
		console.log("\tPassword: " + this.state.password);
	}

	handleClick(event) {
		event.stopPropagation(); // Prevents modal from closing when this window is clicked
	}

	render() {
		const Settings = {
			windowPosition: {
				style: {
					position: "absolute",
					right: "0",
					width: "250px",
					marginTop: "50px",
					marginRight: "25px",
				}
			},
			windowStyle: {
				style: {
					width: "100%",
					height: "100%",
					// backgroundColor: "yellow" // Debug purposes
				}
			}
		};

		return (
			<div {...Settings.windowPosition} onClick={this.handleClick}>
				<Card {...Settings.windowStyle}>
					<CardHeader title={"Log in to Spill"}/>
					<SignInForm/>
				</Card>
			</div>
		)
	}
}

export {SignInWindow};