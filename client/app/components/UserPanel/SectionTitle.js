import React from 'react';
import { Typography} from 'material-ui';

const SectionTitle = (props) => {
	return(
		<div
			style={{
				backgroundColor: "#8eacbb",
				borderRadius: "5px",
			}}
		>
			<Typography variant={"headline"} align={"center"}>
				{props.title}
			</Typography>
		</div>
	);
};

export {SectionTitle}