import React from 'react';
import { Typography} from 'material-ui';

const UserProfileDetails = (props) => {
	return(
		<div>
			<Typography variant={"headline"} color={"textSecondary"}>{props.name}</Typography>
			<Typography variant={"headline"} color={"textSecondary"}>{props.location}</Typography>
			<Typography variant={"body2"}>{props.postCount} Posts</Typography>
			<Typography variant={"body2"}>{props.commentCount} Comments</Typography>
		</div>
	);
};

export {UserProfileDetails}