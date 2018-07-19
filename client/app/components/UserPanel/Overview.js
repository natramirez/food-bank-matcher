import React from 'react';
import Dashboard from './Dashboard'
import {Activity} from "./Activity";
import { Typography } from 'material-ui';

const OverviewTitle = (props) => {
	return(
		<div
			style={{
				backgroundColor: "#37474f",
				borderRadius: "5px",
			}}
		>
			<Typography variant={"headline"} align={"center"} style={{color: "#F0F8FF",}}>
				{props.title}
			</Typography>
		</div>
	)
};

const Overview = () => {
	return(
		<div>
		<OverviewTitle title={"Overview"}/>
			<Activity/>
			<Dashboard/>
		</div>
	)
};

export {Overview}