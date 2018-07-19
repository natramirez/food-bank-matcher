import React from 'react';
import { TextField, Button, Grid, Paper} from 'material-ui';
import {SectionTitle} from "./SectionTitle";

class UpdatePassword extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			emailValue: "",
			passwordValue: "",
		};

		this.resetFields = this.resetFields.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
	}

	handleInputChange(event) {
		this.setState({
			emailValue: event.target.value
		})
	}

	handlePasswordInputChange(event) {
		this.setState({
			passwordValue: event.target.value
		})
	}

	resetFields() {
		this.setState({
			emailValue: "",
			passwordValue: ""
		})
	}

	render() {
		const Settings ={
			grid: {
				container: true,
				spacing: 16,
				direction: "column",
				justify: "center",
				alignItems: "center",
			},
		};

		const FieldContainer = (props) => {
			return(
				<Paper style={{
					display: "flex",
					flexDirection: "column",
					padding: "10px",
				}}>
					{props.children}
				</Paper>
			)
		};

		const LoginOptions = () => {
			return(
				<Grid item xs={12}>
					<Button onClick={this.resetFields}>Cancel</Button>
					<Button>Update</Button>
				</Grid>
			)
		};
		return(
			<div>
				<SectionTitle title={"Update your password"}/>
				<Grid {...Settings.grid} direction={"column"} spacing={8} style={{marginTop: "48px",}}>
					<Grid item xs={12} sm={3}>
						<FieldContainer>
							<Grid {...Settings.grid}>
								<Grid item xs={12}>
									<TextField type={"search"}
											   placeholder={"Email"}
											   label={"Email"}
											   value={this.state.emailValue}
											   onChange={this.handleInputChange}/>
								</Grid>

								<Grid item xs={12}>
									<TextField type={"password"}
											   placeholder={"Password"}
											   label={"Password"}
											   value={this.state.passwordValue}
											   onChange={this.handlePasswordInputChange}/>
								</Grid>

								<LoginOptions/>
							</Grid>
						</FieldContainer>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export {UpdatePassword};