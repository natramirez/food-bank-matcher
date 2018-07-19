import React from 'react';
import GridList from 'material-ui/GridList';
import { Card } from 'material-ui';

const FetchedContent = (props) => {
	let width = props.width;
	/**
	 * Each breakpoint matches a fixed screen width:
	 * xs: 0px or larger
	 * sm: 600px or larger
	 * md: 960px or larger
	 * lg: 1280px or larger
	 * xl: 1920px or larger
	 */
	let amountColumns = 0;
	if (width === 'xs' || width === 'sm') {
		amountColumns = 1;
	} else if (width === 'md') {
		amountColumns = 2;
	} else {
		amountColumns = 3;
	}

	const GridListStyles = {
		spacing: 48,
		cellHeight: 304,
		cols: amountColumns,
		transform: 'translateZ(0)',
		style: {
			marginTop: "24px",
			marginLeft: "24px",
			marginRight: "24px",
			marginBottom: "24px",
		}
	};

	const ContentAreaStyle = {
		style: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-around',
			overflow: 'hidden',
		}
	};

	// Currently showing only first 30 results
	return(
		<div>
			<Card {...ContentAreaStyle}>
				<GridList {...GridListStyles}>
					{props.places.slice(0,30).map(props.displayFetchedData)}
				</GridList>
			</Card>
		</div>
	);
};

export { FetchedContent }