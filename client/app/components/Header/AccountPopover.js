import React from 'react';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import {Grid} from 'material-ui';
import {StyledLink} from "../utils/StyledLink";

/*
AccountMenuPopover is a menu that is presented to the user when the user clicks the Account button
located in the OptionsHeader. This assumes the user is already logged in.

Note: As of now, not all buttons are provided with links.
The user should be able to log out when the user clicks LogOut, however that should be a prop that is passed down
from Header
 */

const AccountMenuItem = (props) => {
	return(<Button fullWidth style={{color: "black"}}>{props.label}</Button>)
};

const AccountMenuPopover = () => (
	<Grid
		container
		direction={"column"}
	>
		<Grid item>
			<StyledLink to={{pathname: "/user/userPanel"}}>
				<AccountMenuItem label={"Profile"}/>
			</StyledLink>
		</Grid>
		<Grid item>
			<StyledLink to={{pathname: "/user/userPanel"}}>
				<AccountMenuItem label={"Settings"}/>
			</StyledLink>
		</Grid>
		<Grid item>
			<StyledLink to={{pathname: "/user/userPanel"}}>
				<AccountMenuItem label={"Panel"}/>
			</StyledLink>
		</Grid>
		<Grid item>
			<StyledLink to={{pathname: "/user/userPanel"}}>
				<AccountMenuItem label={"Logout"}/>
			</StyledLink>
		</Grid>
	</Grid>
);

class AccountPopover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			anchorReference: 'anchorEl',
		};
		this.anchorEl = null;
		this.handleButton = this.handleButton.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleButton() {
		this.setState({open: true});
	};

	handleClose () {
		this.setState({open: false});
	};

	render() {
		const {open, anchorReference,} = this.state;
		return (
			<div>
				<Button
					color={"inherit"}
					buttonRef={ (node) => {this.anchorEl = node}}
					variant="flat"
					onClick={this.handleButton}
				>
					Account
				</Button>

				<Popover
					open={open}
					anchorEl={this.anchorEl}
					anchorReference={anchorReference}
					anchorPosition={{ top: 200, left: 400 }}
					onClose={this.handleClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "left",
					}}
				>
					<AccountMenuPopover/>
				</Popover>
			</div>
		);
	}
}

export {AccountPopover}