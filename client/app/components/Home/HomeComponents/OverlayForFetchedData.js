import React from 'react';
import  { GridListTileBar } from 'material-ui/GridList';

const OverlayForFetchedData = (props) => {
	const OverlayStyle = {
		style: {
			backgroundColor: "rgba(67,67,67,0.8)",
			height: "140px",
			paddingBottom: "10px"
		}
	};

	return (
		<GridListTileBar
			title={props.title}
			subtitle={props.children}
			{...OverlayStyle}/>
	)
};

export { OverlayForFetchedData }