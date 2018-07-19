import React from 'react';
import { Paper, Grid, Typography, Button, Card} from 'material-ui';



const DummyPreview = [
	{
		id: 1,
		image: "https://www.gstatic.com/webp/gallery/4.sm.jpg",
		title: "Preview Title",
		content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
	{
		id: 2,
		title: "Preview Title",
		content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
	},
	{
		id: 3,
		image: "https://www.gstatic.com/webp/gallery/4.sm.jpg",
		title: "Preview Title",
		content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
	{
		id: 4,
		title: "Preview Title",
		content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
	},
	{
		id: 5,
		image: "https://www.gstatic.com/webp/gallery/4.sm.jpg",
		title: "Preview Title",
		content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source",
	},
	{
		id: 6,
		title: "Preview Title",
		content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio",
	},
	{
		id: 7,
		title: "Preview Title",
		content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source",
	},

];


const PostButton = (props) => {
	return(
		<div style={{marginTop: "18px"}}>
			<Button size={"small"} variant={"raised"} color={"secondary"}>
				<Typography variant={"caption"}>
					{props.label}
				</Typography>
			</Button>
		</div>
	);
};

const PlaceholderText = {
	title: "Lorem  ipsum dolor",
	content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
	"dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
	"commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla " +
	"pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est " +
	"laborum.\n" + "\n"
};

const PostTitle = (props) => {
	return(
		<Typography variant={"headline"}> {props.title} </Typography>
	);
};

const PostPreview = (props) => {
	return(
		<Typography variant={"caption"}> {props.content} </Typography>
	);
};

const PostContents = () => {
	return(
		<Grid
			container
			spacing={8}
			direction={"column"}
			justify={"center"}
			alignItems={"flex-end"}
		>

			<Grid item xs style={{alignSelf: "stretch"}} > <PostTitle title={PlaceholderText.title}/></Grid>
			<Grid item xs style={{alignSelf: "stretch"}} > <PostPreview content={PlaceholderText.content}/></Grid>
		</Grid>
	);
};

const FetchedImageSettings = {
	src: "/assets/thumbnails/AmericanSamoa.jpg",
	alt: "Image",
	style: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	}
};

const PostImage = () => {
	return(
		<Paper style={{height: "150px"}}>
			<img {...FetchedImageSettings}/>
		</Paper>
	);
};

export const RecentPost = () => {
	const Settings = {
		container: true,
		direction: "row",
		justify: "flex-end",
		alignItems: "center",
		style: {
			padding: "18px",
			// backgroundColor: "green",
		}
	};

	return(
		<Card>
			<Grid {...Settings}>
				<Grid item xs={12} sm={7}> <PostContents/> </Grid>
				<Grid item xs={12} sm={5}> <PostImage/></Grid>
				<Grid item xs={12} sm={1}> <PostButton label={"View Post"}/> </Grid>
			</Grid>

		</Card>
	);
};