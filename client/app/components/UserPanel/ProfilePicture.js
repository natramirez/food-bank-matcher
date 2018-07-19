import React from 'react';
import {Avatar} from 'material-ui';

const ProfilePicture = (props) => {
	const size = "150px";
	const Settings = {
		style: {
			margin: "0 auto",
			width: size,
			height: size
		}
	};

	return(
		<div>
			<Avatar {...Settings}>{props.initials}</Avatar>
		</div>
	)
};

export {ProfilePicture}