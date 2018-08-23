import React from 'react';
import {withRouter} from 'react-router-dom';

class WrappedSearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: "Any",
			// invalidInput: false,
		};

		this.searchTextChanged = this.searchTextChanged.bind(this);
		this.setCategory = this.setCategory.bind(this);
	}

	searchTextChanged({target: {value}}) {
		// RegEx for letters and numbers
		// Check if search input matches the given RegEx
		// const acceptedChars = /^[0-9a-z A-Z]+$/;
		// if (value.length > 0 && value.match(acceptedChars) === null) {
		// 	this.setState({
		// 		invalidInput: true,
		// 	})
		// } else {
		// 	this.setState({
		// 		invalidInput: false,
		// 	})
		// }
		this.setState({
			searchItem: value
		})
	}
	setCategory(event) {
		console.log(event.target.value);
		this.setState({
			category: event.target.value,
		});
	}
	render() {
		// const errorText = "Invalid input";
		return (
		<form onSubmit={e => {e.preventDefault();this.props.displayResults(this.state.searchItem, this.state.category);}}>
			<select onChange={this.setCategory}>
				<option value="Any">Any</option>
				<option value="Produce">Produce</option>
				<option value="Canned Goods">Canned Goods</option>
				<option value="Snacks">Snacks</option>
				<option value="Beverages">Beverages</option>
				<option value="Frozen">Frozen</option>
				<option value="Cereal">Cereal</option>
				<option value="Pasta">Pasta</option>
				<option value="Miscellaneous">Miscellaneous</option>
			</select>
			<input
			placeholder="Item Name"
			onChange={this.searchTextChanged}
			/>
			<input id="search-btn" type="submit" value={"Search"} className="btn btn-lg btn-default cont-btn"/>
		</form>
		);
	}
}
const SearchBar = withRouter(WrappedSearchBar);

export default SearchBar