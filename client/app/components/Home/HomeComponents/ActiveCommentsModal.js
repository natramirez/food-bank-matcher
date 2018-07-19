import React from 'react';
import {  Paper} from 'material-ui';
import { Modal } from 'material-ui';
import {CreateComment} from "./CreateComment";
import {ReportIssue} from "../../ReportIssue/ReportIssue";

const ActiveCommentsModal = (props) => {
	const ActiveCommentsStyle = {
		style: {
			margin: "auto",
			width: "50vw",
		}
	};

	const UserCreatingComment = {
		userFirstInitial: "F",
		userFullname: "Frodo Baggins",
		userBirthday: "April 21, 1995",
	};

	return(
		<Modal open={props.open} onClose={props.handleClose}>
			<Paper {...ActiveCommentsStyle}>
				<ReportIssue/>
				{/*<CreateComment*/}
					{/*{...UserCreatingComment}*/}
					{/*handleCancel={props.handleClose}/>*/}
			</Paper>
		</Modal>
	)
};

export { ActiveCommentsModal }