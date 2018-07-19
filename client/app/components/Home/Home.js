import React, { Component } from 'react';
import { Grid } from 'material-ui';
import  { GridListTile } from 'material-ui/GridList';
import withWidth from 'material-ui/utils/withWidth';
import theme from '../Theme';
import {
	CenterPromptForComments, OverlayForFetchedData, FetchedContent, Disclaimer,
	AddPostButton, ActiveCommentsModal
} from './HomeComponents';

import {ReportIssue} from "../ReportIssue/ReportIssue";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			places: [],
			resultsCount: 0,
		};

		this.handleClose = this.handleClose.bind(this);
		this.handlePostButtonClick = this.handlePostButtonClick.bind(this);
		this.fetchAllResults = this.fetchAllResults.bind(this);
		this.displayFetchedData = this.displayFetchedData.bind(this);
	}

	handlePostButtonClick() {
		this.setState({
			open: true
		})
	}

	handleClose() {
		this.setState({
			open: false
		})
	}

	componentDidMount() {
		this.fetchAllResults();
	}

	componentWillUnmount() {
		this.setState({places: []});
	}

	fetchAllResults() {
		fetch(`/api/postRecords/allResults`).then(res => res.json()).then(json => {
			this.setState({places: json});
		});
	}

	displayFetchedData(place, i) {
		const { post_title, image_src, location_name, address, city, state, zip, type, status} = place;

		const Description = () => (
			<div>
				{location_name}
				<br/>
				{type}
				<br/>
				{city}, {state} {zip}
				<br/>
				{address}
				<br/>
				{status}
			</div>
		);

		const FetchedImageSettings = {
			src: image_src,
			alt: location_name,
			style: {
				width: "100%",
				height: "100%",
				objectFit: "cover",
			}
		};

		return (
			<GridListTile key={i} cols={1}>
				<img {...FetchedImageSettings}/>
				<OverlayForFetchedData title={post_title}>
					<Description/>
				</OverlayForFetchedData>
			</GridListTile>
		)
	}

	render() {
		const MainContentAreaStyle = {
			style: {
				textAlign: "center",
				marginTop: "24px",
				marginLeft: "100px",
				marginRight: "100px",
			}
		};

		const FetchedContentSettings = {
			width: this.props.width,
			places: this.state.places,
			displayFetchedData: this.displayFetchedData
		};

		const GridContentAreaStyles = {
			container: {
				container: true,
				spacing: 16,
				direction: "row",
				justify: "center",
				alignItems: "center",
			},
			item: {
				item: true,
				xs: 12,
				sm: 12,
			}
		};
		const DisplayCenterPromptIfDesktop = () => {
			if (this.props.width !== "xs") {
				return(<CenterPromptForComments userFirstInitial={"F"} onClick={this.handlePostButtonClick}/>)
			}
		};

		return (
			<div {...MainContentAreaStyle}>
				<Disclaimer/>
				<Grid {...GridContentAreaStyles.container}>
					<Grid {...GridContentAreaStyles.item}>{DisplayCenterPromptIfDesktop()}</Grid>
					<Grid {...GridContentAreaStyles.item} style={{minWidth: "500px"}}> <FetchedContent {...FetchedContentSettings}/></Grid>
					<Grid {...GridContentAreaStyles.item}> <hr/> </Grid>
				</Grid>
				<AddPostButton handlePostButtonClick={this.handlePostButtonClick} theme={theme}/>
				<ActiveCommentsModal open={this.state.open} handleClose={this.handleClose.bind(this)} />
			</div>
		);
	}
}

export default withWidth()(Home);
