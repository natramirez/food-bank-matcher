import React from 'react';
import { Button } from 'material-ui';
import AddIcon from '@material-ui/icons/Add';

const AddPostButton = (props) => {
	const AddPostButtonStyle = {
		variant: "fab",
		label: "add",
		style: {
			position: "fixed",
			right: "2.5rem",
			bottom: "2.5rem",
			zIndex: 1100, // To make sure the button doesn't hide behind the footer
			backgroundColor: props.theme.palette.secondary.dark,
		},
		onClick: props.handlePostButtonClick,
	};
	return(
		<Button {...AddPostButtonStyle}> <AddIcon/> </Button>
	);
};
export { AddPostButton }