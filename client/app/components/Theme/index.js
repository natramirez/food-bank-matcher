import {createMuiTheme} from "material-ui/styles/index";
import cyan from 'material-ui/colors/teal';
import blueGrey from 'material-ui/colors/blueGrey';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: blueGrey[300],
			main: blueGrey[500],
			dark: "#37474f",
			contrastText: '#ffffff',
		},
		secondary: {
			light: "#dbffff",
			main: cyan['A100'],
			dark: "#75ccb9",
			contrastText: '#000000',
		},
	},

	// overrides: {
	// 	MuiButton: {
	// 		root: {
	// 			color: 'red',
	// 		},
	// 	},
	// },

});

export default theme;