import React from 'react';
import { Paper, Grid } from 'material-ui';
import {Profile} from "./Profile";
import AccountSettings from "./AccountSettings";
import {Activity} from "./Activity";
import {UpdatePassword} from "./UpdatePassword";
import {Overview} from "./Overview";
import Dashboard from './Dashboard'

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'

/**
 * The layout of this page consists of nested Grid Containers
 * The left side (Account Settings) is a vertical Grid Container
 * The right side is also a vertical Grid container
 * Both of these containers are contained inside MainContainer, which is a horizontal Grid Container
 */
const UserPanelContainer = (props) => {
	const Container = {
		style: {
			margin: "30px",
			padding: "20px",
			// backgroundColor: "red",
		}
	};

	return (
		<Paper {...Container}>
			{props.children}
		</Paper>
	)
};

const UserPanelContentGrid = (props) => {
	const Settings = {
		container: true,
		spacing: 24,
		direction: "row",
		justify: "flex-start",
		alignItems: "center",
		style: {
			// backgroundColor: "orange",
		}
	};

	return(
		<Grid {...Settings}>
			{props.children}
		</Grid>
	)
};

class UserPanel extends React.Component{
	render(){
		return(
			<Router >
				<Switch>
					<UserPanelContainer>
						<UserPanelContentGrid>
							<Grid item xs={12} sm={3}><AccountSettings/></Grid>
							<Grid item xs><Profile/></Grid>
							<Grid item xs={12}><Route path="/user/userPanel/overview" component={Overview}/></Grid>
							<Grid item xs={12}><Route path="/user/userPanel/activity" component={Activity}/></Grid>
							<Grid item xs={12}><Route path="/user/userPanel/userPanel" component={Activity}/></Grid>
							<Grid item xs={12}><Route path="/user/userPanel/dashboard" component={Dashboard}/></Grid>
							<Grid item xs={12}><Route path="/user/userPanel/updatePassword" component={UpdatePassword}/></Grid>
						</UserPanelContentGrid>
					</UserPanelContainer>
				</Switch>
			</Router>
		);
	}
}

export {UserPanel}