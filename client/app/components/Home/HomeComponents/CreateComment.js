import React from 'react';
import {
	Card, CardHeader, CardContent,
	CardActions, Grid, Button,
	TextField, Avatar, IconButton} from 'material-ui';
import AddPhotoIcon from '@material-ui/icons/AddAPhoto';
import PinDropIcon from '@material-ui/icons/PinDrop';

class CreateComment extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const CommentsHeader = {
			avatar: <Avatar> {this.props.userFirstInitial} </Avatar>,
			title: this.props.userFullname,
			subheader: this.props.userBirthday,
		};

		return (
			<Card style={{ height: "100%"}}>
				<CardHeader {...CommentsHeader}/>
				<CardContent>
					<TextField
						label="What would you like to post?"
						rows="7"
						multiline
						fullWidth
						style={{backgroundColor: "white", color: "black"}}
					/>
				</CardContent>

				<CardActions>
					<Grid
						container
						direction={"row"}
						justify={"flex-start"}
						alignItems={"flex-start"}
					>
						<Grid item xs={6} sm>
							<IconButton label="Add Photo"> <AddPhotoIcon /> </IconButton>
						</Grid>

						<Grid item xs={6} sm>
							<IconButton label="SetLocation"> <PinDropIcon /> </IconButton>
						</Grid>

						<Grid item xs sm>
							<Button variant="raised" onClick={this.props.handleCancel}> Cancel </Button>
						</Grid>

						<Grid item xs sm >
							<Button variant="raised" color="primary"> Post </Button>
						</Grid>
					</Grid>
				</CardActions>
			</Card>
		);
	}
}

export { CreateComment }