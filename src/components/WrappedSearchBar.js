import React from 'react';
import {withRouter} from 'react-router-dom';

class WrappedSearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: "Any",
		};

		this.searchTextChanged = this.searchTextChanged.bind(this);
		this.setCategory = this.setCategory.bind(this);
	}

	searchTextChanged({target: {value}}) {
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
				<option value="Bread \& Baked Goods">Bread & Baked Goods</option>
				<option value="Dairy \& Eggs">Dairy & Eggs</option>
				<option value="Meat \& Seafood">Meat & Seafood</option>
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