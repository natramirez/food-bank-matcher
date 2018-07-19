import React from 'react';
import theme from '../Theme';
import { withStyles } from 'material-ui/styles';
import { Button, Toolbar, Grid } from 'material-ui';
import { StyledLink} from "../utils/StyledLink";

const styles = {
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.primary.dark,
	},
	footerButton: {
		color: "white",
		textTransform: 'capitalize',
	},
};
const AboutLink = props => <StyledLink to={{pathname: "/team/about"}} {...props}/>;

class Footer extends React.Component {
	render() {
		const {classes} = this.props;
		const GridSettings = {
			container: true,
			direction: 'row',
			justify: 'flex-start',
			alignItems: 'center',
		};

		return (
			<footer>
				<Toolbar className={classes.root}>
					<Grid {...GridSettings}>
						<Grid item xs={6} sm={3} lg={2}>
							<Button className={classes.footerButton} component={AboutLink}>
								About the Team
							</Button>
						</Grid>

						<Grid item xs={5} sm={3} lg={2}>
							<Button className={classes.footerButton}> Terms </Button>
						</Grid>

					</Grid>
				</Toolbar>
			</footer>
		);
	}
}

export default withStyles(styles)(Footer);
