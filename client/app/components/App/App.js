import React from 'react';
import {Grid} from 'material-ui';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App = ({ children }) => (
	<Grid
		container
		direction={"column"}
		justify={"space-between"}
		alignItems={"stretch"}
	>
		<Grid item xs={12} sm={12}> <Header /></Grid>
		<Grid item xs={12} sm={12}> <main>{children}</main> </Grid>
		<Grid item xs={12} sm> <Footer /> </Grid>
	</Grid>
);

export default App;
