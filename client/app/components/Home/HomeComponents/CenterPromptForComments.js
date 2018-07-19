import React from 'react';
import { Card } from 'material-ui';
import { Typography} from 'material-ui';
import { Grid } from 'material-ui';
import {ModeEdit} from '@material-ui/icons';
import IconButton from 'material-ui/IconButton';

const CommentPrompt = () => {
	const CommentPromptSettings = {
		promptContainer: {
			container: true,
			direction: "row",
			justify: "flex-start",
			alignItems: "center",
			style: {
				height: "48px",
			}
		},
		messageButton: {
			item: true,
			xs: 10,
			sm: 10,
		},
		promptLabel: {
			variant: "caption",
			style: {
				fontSize: "14px",
			},
		},
		avatarItem: {
			item: true,
			sm: 1,
			xs: 1,
		},
		editGridItem: {
			item: true,
			xs: 2,
			sm: 2,
		}
	};

	const {promptContainer, messageButton, promptLabel} = CommentPromptSettings;

	return(
		<Grid {...promptContainer}>
			<Grid {...messageButton}>
				<Typography {...promptLabel}>Tell us about an environmental issue in your area</Typography>
			</Grid>

			<Grid {...CommentPromptSettings.editGridItem}>
				<IconButton> <ModeEdit/> </IconButton>
			</Grid>
		</Grid>
	)
};

class CenterPromptForComments extends React.Component {
	render() {
		const CenterPromptForCommentsStyle = {
			style: {
				display: "inline-block",
				width: "500px",
				marginTop: "18px",
				paddingLeft: "18px",
				paddingRight: "18px",
				borderColor: "black",
				borderWidth: "2px",
				backgroundColor: "white",
				color: "grey"
			}
		};

		return(
			<div>
				<Card {...CenterPromptForCommentsStyle} onClick={this.props.onClick}>
					<CommentPrompt userFirstInitial={this.props.userFirstInitial}/>
				</Card>
			</div>
		)
	}
}
export {CenterPromptForComments}