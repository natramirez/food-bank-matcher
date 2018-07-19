import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {Button} from 'material-ui';
import {SectionTitle} from "./SectionTitle";

let id = 0;
function createData(author, location, status, desc, date, image) {
	id += 1;
	return { id, author, location, status, desc, date, image };
}

const sampleData = [
	createData('Frodo Baggins', "San Francisco, CA", "Resolved", "Broken Road on Powell in front of Westfield","01/01/2018", "Image"),
	createData('Gandalf the Grey', "The Shire, ME", "Unresolved", "Hazardous tree on roadway towards Gondor","01/12/2018", "Image"),
	createData('Legolas', "San Mateo, CA", "Resolved", "Broken street lights near the grocery store","01/23/2018", "Image"),
];

const HeaderRow = () => {
	return(
		<TableHead>
			<TableRow>
				<TableCell numeric>ID</TableCell>
				<TableCell>Author</TableCell>
				<TableCell>Location</TableCell>
				<TableCell>Status</TableCell>
				<TableCell>Description</TableCell>
				<TableCell>Date</TableCell>
				<TableCell>Image</TableCell>
				<TableCell>Action</TableCell>
			</TableRow>
		</TableHead>
	)
};

const TableButton = (props) => {
	return(
		<Button color={"primary"} variant={"raised"} size={"small"} onClick={props.onClick}>
			{props.label}
		</Button>
	)
};

class Body extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
		};

		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.setState({
			data: sampleData,
		})
	};

	handleDelete() {
		// TODO: Find out how to delete a specific row instead of deleting only the last array entry
		this.setState( (prevState, props) => {
			prevState.data.pop()
		});
	}

	render() {
		return (
			<TableBody>
				{this.state.data.map(n => {
					const {id, author, location, status, desc, date, image} = n;
					return (
						<TableRow key={id}>
							<TableCell numeric>{id}</TableCell>
							<TableCell>{author}</TableCell>
							<TableCell>{location}</TableCell>
							<TableCell>{status}</TableCell>
							<TableCell>{desc}</TableCell>
							<TableCell>{date}</TableCell>
							<TableCell>{image}</TableCell>

							<TableCell>
								<div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
									<TableButton label={"Delete"} onClick={this.handleDelete}/>
									<TableButton label={"View"}/>
								</div>
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		)
	}
}

const DashboardContainer = {
	style: {
		width: '100%',
		overflowX: 'auto',
	}
};

const Dashboard = () => {
	return (
		<div>
			<SectionTitle title={"Dashboard"}/>
			<Paper {...DashboardContainer}>
				<Table>
					<HeaderRow/>
					<Body/>
				</Table>
			</Paper>
		</div>
	);
};

export default Dashboard;