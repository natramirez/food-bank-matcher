import React from 'react';
import { Grid } from 'material-ui';
import {RecentPost} from "./UserProfile/UserPost";
import {SectionTitle} from "./SectionTitle";

const Activity = () => {
	const Settings = {
		parent: {
			style: {
				marginTop: "25px",
				padding: "10px",
			}
		},
		gridContainer: {
			container: true,
			spacing: 8,
			direction: "column",
			justify: "flex-start",
			alignItems: "stretch",
		}
	};
	const {parent, gridContainer} = Settings;
	return(
		<div {...parent}>
			<Grid {...gridContainer}>
				<Grid item xs={12}> <SectionTitle title={"Recent Activity"} /> </Grid>
				<Grid item xs={12}> <RecentPost/> </Grid>
			</Grid>
		</div>
	);
};

export {Activity};