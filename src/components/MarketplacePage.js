import React, { Component } from 'react';
import WrappedSearchBar from './WrappedSearchBar';
import MarketplaceItem from './MarketplaceItem';

class MarketplacePage extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {};
        this.displayResults = this.displayResults.bind(this);
        this.createResultBoxes = this.createResultBoxes.bind(this);
        this.createResult = this.createResult.bind(this);
        this.dummyData = [ //used when no network connection for dev purposes
            {
                foodBankName: "Hopelink",
                quantity: "10 boxes",
                categories: ["Snacks"],
                itemName: "Ritz Crackers",
                status: "Available"
            },
            {
                foodBankName: "Renewal Food Bank",
                quantity: "5 lbs",
                categories: ["Meat & Seafood"],
                itemName: "Chicken breast",
                status: "Available"
            },
            {
                foodBankName: "Pike Market Food Bank",
                itemName: "Skim Milk",
                categories: ["Dairy & Eggs"],
                quantity: "5 gallons",
                status: "Available"
            }
        ]
    }
    componentDidMount() {
        this._isMounted = true;
        this.displayResults("", "Any");
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    createResult = (res,index) => <MarketplaceItem curUserId={this.props.curUserId} item={res} index={index} />;
    createResultBoxes = (results) => results.map(this.createResult);
    
    displayResults(item, category) {
        if (!item && !category) {return};
        var url = '/api/search?';
        var params;
        if (item && category) {
            params = `itemName=${item}&categories=${category}`
        } else {
            params = item ? `itemName=${item}` : `categories=${category}`;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url + params);
        xhr.onload = function() {
            if (!this._isMounted) {return;}
            var data = JSON.parse(xhr.response);
            if ((xhr.status >= 200 && xhr.status < 400) && (!data.name) && this._isMounted) {
                this.setState({results: data, errorMsg:''});
            } else { // dummy data for testing purposes
                this.setState({results: this.dummyData, errorMsg: data});
            }
        }.bind(this);
        xhr.send();
    }
    render() {
        return (
            <div className="page-content">
                <h1 className="page-title">Search the Marketplace</h1>
                <WrappedSearchBar displayResults={this.displayResults}/>
                {this.state.results ? <div className={"container"}>{this.createResultBoxes(this.state.results)}</div> : ""}
                {this.state.errorMsg ? <div>{this.state.errorMsg}</div> : ""}
            </div>
        );
    }
}

export default MarketplacePage;
