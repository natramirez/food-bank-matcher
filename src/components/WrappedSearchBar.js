import React from 'react';
// import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class WrappedSearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchKey: "",
			category: "Any",
			invalidInput: false,
		};

		this.searchTextChanged = this.searchTextChanged.bind(this);
		this.setCategory = this.setCategory.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	searchTextChanged({target: {value}}) {
		// RegEx for letters and numbers
		// Check if search input matches the given RegEx
		const acceptedChars = /^[0-9a-z A-Z]+$/;
		if (value.length > 0 && value.match(acceptedChars) === null) {
			this.setState({
				invalidInput: true,
			})
		} else {
			this.setState({
				invalidInput: false,
			})
		}
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

	// handleKeyPress(event) {
	// 	// const {history} = this.props;
	// 	if (event.key === "Enter") {

	// 		// if (this.state.invalidInput) {
	// 		// 	return
	// 		// } // Don't search if the input isn't valid

	// 		// if (this.props.location.pathname === "/search/results") {
	// 		// 	// TODO: Find a better solution instead of reloading, as this version is slow
	// 		// 	window.location.reload();
	// 		// }

	// 		// if (this.state.searchKey) {
	// 		// 	console.log("emptY")
	// 		// } else {
	// 		// 	console.log("Replace with empty string")
	// 		// }
	// 		// // console.log("search" + this.state.searchKey);

	// 		// // Pass category to search results
	// 		// history.push({
	// 		// 	pathname: "/search/results",
	// 		// 	state: {
	// 		// 		category: this.state.category,
	// 		// 		inputSearch: this.state.searchKey ? this.state.searchKey : " ",
	// 		// 		shouldSearch: true,
	// 		// 	}
	// 		// })
	// 	}
	// }
	//  displayFetchedData(foodbank, i) {
	// 	const {FoodBankName, ItemName, Quantity, Categories} = foodbank;
		
	
	// 	const Description = () => (
	// 		<div>
	// 			{FoodBankName}
	// 			<br/>
	// 			{ItemName}
	// 			<br/>
	// 			{Quantity}
	// 			<br/>
	// 			{Categories}

				
	// 		</div>
	// 	);
	// }
	render() {
		// const errorText = "Invalid input";
		return (
		<form onSubmit={e => {e.preventDefault(); console.log("submit btn");this.props.displayResults(this.state.searchItem, this.state.category);}}>
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
			placeholder="Search for item"
			onChange={this.searchTextChanged}
			// onKeyPress={this.handleKeyPress}
			/>
			<input id="search-btn" type="submit" value={"Search"} className="btn btn-lg btn-default cont-btn"/>
		</form>

		// <Description/>
			
		);
	}
}
// class SearchResults extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			searchInput: '',
// 			places: [],
// 			searchKey: '',
// 			category: '',
// 			shouldSearch: true,
// 			didFetch: false,
// 		};

// 		this.performNewSearch = this.performNewSearch.bind(this);
// 		this.initiateSearch = this.initiateSearch.bind(this);
// 		this.searchTextChanged = this.searchTextChanged.bind(this);
// 		this.categoryTextChanged = this.categoryTextChanged.bind(this);
// 		this.handleSearchFromHeader = this.handleSearchFromHeader.bind(this);

// 		this.caseTwo = this.caseTwo.bind(this);
// 		this.caseThree = this.caseThree.bind(this);
// 		this.caseFour = this.caseFour.bind(this);
// 	}

// 	componentDidMount() {
// 		if (this.props.foodbank.state) {
// 			const { inputSearch, shouldSearch, category} = this.props.foodbank.state;
// 			this.setState({
// 				category: category,
// 				searchInput: inputSearch,
// 				searchKey: inputSearch,
// 				shouldSearch: shouldSearch,
// 			});
// 		} else {

// 			this.setState({
// 				category: "Any",
// 				searchInput: "",
// 				searchKey: "",
// 				shouldSearch: true,
// 			});
// 		}

// 	}

// 	performNewSearch(input) {
// 		console.log("performNewSearch");
// 		this.setState({
// 			searchInput: input
// 		});
// 		this.initiateSearch();
// 	}

// 	componentDidUpdate(prevProps, prevState, snapshot) {
// 		if (this.props.foodbank.state) {
// 			const { inputSearch } = this.props.location.state;
// 			// If the previous search input is not equal to the current search input,
// 			// perform a new search with the updated input
// 			if (!(prevState.searchInput === inputSearch)) {
// 				this.performNewSearch(inputSearch)
// 			}
// 		}
// 	}

// 	handleSearchFromHeader() {
// 		console.log("handleSearchFromHeader()");
// 		this.initiateSearch();
// 	}



// 	caseThree(keyword) {
// 		fetch(`/api/searchByItem?itemName=${keyword}`)
// 			.then(res => res.json())
// 			.then(json => {
// 				this.setState({foodbank: json});
// 			});
// 	}
// 	caseTwo(keyword) {
// 		fetch(`/api/searchByCategory?categories=${keyword}`)
// 			.then(res => res.json())
// 			.then(json => {
// 				this.setState({foodbank: json});
// 			});
// 	}

	

// 	initiateSearch() {
// 		console.log("Initiate search");
// 		const { category, searchInput} = this.state;
// 		console.log("Category: " + category);
// 		console.log("SearchInput: " + searchInput);

// 		const categoryIsAny = (category === "Any");
// 		const categoryIsntANY = (category !== "Any");

// 		const searchBarHasText = (searchInput !== " ");
// 		const searchBarDoesNotHaveText = (searchInput === " ");


// 		// if (categoryIsAny && searchDoesNotHaveText)
// 		if (categoryIsAny && searchBarDoesNotHaveText) {
// 			console.log("Case 1. If (category==ANY) && !searchBarHasText  --> return allResults");
// 			this.fetchAllResults()
// 		} else if (categoryIsntANY && searchBarHasText) {
// 			console.log("Case 2: If (category!=ANY && searchBarHasText) --> catLocSearch")
// 			this.caseTwo(searchInput, category);

// 		} else if (categoryIsAny && searchBarHasText) {
// 			console.log("Case 3. If (category==ANY && searchBarHasText) --> locSearch");
// 			this.caseThree(searchInput);
// 		} else if (categoryIsntANY && searchBarDoesNotHaveText) {
// 			console.log("Case 4. If (category!=ANY && !searchBarHasText ) --> catSearch");
// 			this.caseFour(category);
// 		}
// 	}

// 	searchTextChanged(event) {
// 		this.setState({searchItem: event.target.value});
// 	}

// 	categoryTextChanged(event) {
// 		this.setState({category: event.target.value})
// 	}

// 	render(){
// 		// console.log("Category: ~!~!" + this.state.category);
// 		const {places, searchInput} = this.state;
// 		return(
// 			<div>
// 				<SearchResultsLabel searchInput={searchInput}/>
// 				{places.slice(0,30).map(displayFetchedData, this)}
// 			</div>
// 		);
// 	}
// }
const SearchBar = withRouter(WrappedSearchBar);

export default SearchBar