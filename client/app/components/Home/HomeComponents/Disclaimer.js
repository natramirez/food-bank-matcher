import React from 'react';
import theme from "../../Theme/index";
import { Card, Typography} from 'material-ui';

const Disclaimer = () => {
	const DisclaimerStyle = {
		style: {
			display: "inline-block",
			backgroundColor: theme.palette.primary.dark,
			marginTop: "12px",
			paddingLeft: "30px",
			paddingRight: "30px",
		}
	};

	const DisclaimerTextStyle = {
		style: {
			fontWeight: "light",
			color: "white",
		}
	};

	return(
		<Card {...DisclaimerStyle}>
			<Typography {...DisclaimerTextStyle}>
				SFSU Software Engineering Project, Spring 2018. For Demonstration Only.
			</Typography>
		</Card>
	);
};

export { Disclaimer }