import React from 'react';
import {Grid} from 'material-ui';

const ProfileContentsGrid = (props) => {
	const Settings = {
		container: true,
		direction: "row",
		justify: "center",
		alignItems: "center",
	};

	return(
		<Grid {...Settings}>
			{props.children}
		</Grid>
	)
};

export {ProfileContentsGrid}