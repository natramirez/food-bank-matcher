import React from 'react';
import { Paper, Grid } from 'material-ui';
import {ProfileContentsGrid} from "./ProfileContentsGrid";
import {UserProfileDetails} from "./UserProfileDetails";
import {ProfilePicture} from "./ProfilePicture";

const UserPlaceholder = {
	initials: "FB",
	name: "Frodo Baggins",
	location: "San Francisco, CA",
	postCount: 21,
	commentCount: 47,
};

const Profile = () => {
	const RootStyle = {
		style: {
			flexGrow: 1,
			padding: "10px",
		}
	};

	return(
		<Paper {...RootStyle} >
			<ProfileContentsGrid>
				<Grid item xs={12} sm={3}>
					<ProfilePicture initials={UserPlaceholder.initials} />
				</Grid>

				<Grid item xs={12} sm={9}>
					<UserProfileDetails {...UserPlaceholder}/>
				</Grid>
			</ProfileContentsGrid>
		</Paper>
	)
};

export {Profile};