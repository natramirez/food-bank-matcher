import React from 'react';
import { Paper, MenuItem, MenuList, Typography} from 'material-ui';
import {StyledLink} from "../utils/StyledLink";
import Tooltip from 'material-ui/Tooltip';

const OverviewLink = props => <StyledLink to={{pathname: "/user/userPanel/overview"}} {...props}/>;
const ActivityLink = props => <StyledLink to={{pathname: "/user/userPanel/activity"}} {...props}/>;
const UpdatePasswordLink = props => <StyledLink to={{pathname: "/user/userPanel/updatePassword"}} {...props}/>;
const DashboardLink = props => <StyledLink to={{pathname: "/user/userPanel/dashboard"}} {...props}/>;
const HelpLink = props => <StyledLink to={{pathname: "/user/userPanel"}} {...props}/>;

const SettingsMenu = () => {
	const SettingsTitle = () => {
		return(<Typography variant={"subheading"} align={"center"}> Account Settings</Typography>);
	};

	return(
		<div>
			<SettingsTitle/>
			<Paper>
				<MenuList>
					<MenuItem component={OverviewLink}>Overview</MenuItem>
					<MenuItem component={DashboardLink}>Dashboard</MenuItem>
					<MenuItem component={ActivityLink}>Activity</MenuItem>
					<MenuItem component={UpdatePasswordLink}>Update Password</MenuItem>
					<Tooltip title={"Warning: Help is not implemented yet"}>
						<MenuItem component={HelpLink}>Help</MenuItem>
					</Tooltip>
				</MenuList>
			</Paper>
		</div>
	);
};

const AccountSettings = () => {
	return(
		<SettingsMenu/>
	);
};

export default AccountSettings;