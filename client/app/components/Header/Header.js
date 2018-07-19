import React from 'react';
import { AppBar } from 'material-ui';
import { TopHeader } from "./TopHeader";
import { OptionsHeader } from "./OptionsHeader";

/*
Header holds the state of whether the user is signed in or not
State Dependent Actions related to Search, Login, and Navigation are managed by Header
Two Rows:
	Top Header with Logo, Current Page, and Search Bar
	Options Header with Home, Browse, Search, Help, and AccountOptions
*/
class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: "home",
			open: false,
			isLoggedIn: true
		};
		this.handlePageClick = this.handlePageClick.bind(this);
	}

	handlePageClick(label) {
		this.setState({
			currentPage: label,
		})
	}

	render() {
		const {currentPage} = this.state;

		return(
			<AppBar position="static">
				<TopHeader currentPage={currentPage}/>
				<OptionsHeader onClick={this.handlePageClick}
							   isLoggedIn={this.state.isLoggedIn}
							   // handleSignInClick={this.beginSignInProcess}
				/>
			</AppBar>
		)
	}
}

export default Header;