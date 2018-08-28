import React, { Component } from 'react';
import WrappedSearchBar from './WrappedSearchBar';

class MarketplacePage extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {};
        this.displayResults = this.displayResults.bind(this);
        this.createResultBoxes = this.createResultBoxes.bind(this);
        this.handleReserveBtnClick = this.handleReserveBtnClick.bind(this);

    }
    componentDidMount() {
        this._isMounted = true;
        this.displayResults("", "Any");
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    createResult = (res,index) => {
        var reserveBtnText = res.status && (res.status === "Reserved") ? "Waitlist": "Reserve";
        return (
          <div className="result-box" key={index}>
            <div className="result-box-col"> {res.itemName}</div>
            <div className="result-box-col"> {res.quantity}</div>
            <div className="result-box-col"> {res.categories}</div>
            <div className="result-box-col"> {res.foodBankName}</div>
            <button label={reserveBtnText} onClick={event => this.handleReserveBtnClick(event, res, reserveBtnText)}>{reserveBtnText}</button>
          </div>
      )};
    createResultBoxes = (results) => (
        results.map(this.createResult)
    );
    handleReserveBtnClick(event, item, text) {
        event.preventDefault();
        if (item.status === "Reserved") {
            console.log()
            // add the current user to the waitlist
            // change button to "On waitlist" with own color
            // (on hover, change text to "Remove from waitlist" or something like that?)
        } else if (text === "Reserve") {
            console.log("hello")
            alert(`The item ${item.itemName} has been reserved.`);
            // change item's status to reserved, 
            // add current user to item's reserved list
            // add item to user's reserved list
            // change button from "Reserve" to "Reserved" and new color
            // (on hover, change text to "unreserve" or something like that?)
        } else {
            console.log("else stmnt in handleReserveBtnClick")
        }
    }
    displayResults(item, category) {
        if (!item && !category) {return};
        var url = 'http://localhost:8080/api/search?';
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
            } else {
                this.setState({errorMsg: "An error occurred. Please try again later."});
            }
        }.bind(this);
        xhr.send();
    }
    render() {
    return (
        <div className="page-content">
            <h1 className="page-title">Search the Marketplace</h1>
            <WrappedSearchBar displayResults={this.displayResults}/>
            {this.state.results ? (<div>{this.createResultBoxes(this.state.results)}</div>) : ""}
            {this.state.errorMsg ? (<div>{this.state.errorMsg}</div>) : ""}
        </div>
    );
  }
}

export default MarketplacePage;
