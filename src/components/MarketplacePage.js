import React, { Component } from 'react';
import WrappedSearchBar from './WrappedSearchBar';

class MarketplacePage extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {};
        this.displayResults = this.displayResults.bind(this);
        this.createResultBoxes = this.createResultBoxes.bind(this);

    }
    componentDidMount() {
        this._isMounted = true;
        this.displayResults("", "Any");
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    createResult = (res,index) => {
        var reserveBtn = <button label="Reserve" value="Reserve"/>;
        return (
          <div className="result-box" key={index}>
            <div className="result-box-col"> {res.itemName}</div>
            <div className="result-box-col"> {res.quantity}</div>
            <div className="result-box-col"> {res.categories}</div>
            <div className="result-box-col"> {res.foodBankName}</div>
            {reserveBtn}
          </div>
      )};
    createResultBoxes = (results) => (
        results.map(this.createResult)
    );
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
            <h1 className="welcome-heading">Search the Marketplace</h1>
            <WrappedSearchBar displayResults={this.displayResults}/>
            {this.state.results ? (<div>{this.createResultBoxes(this.state.results)}</div>) : ""}
            {this.state.errorMsg ? (<div>{this.state.errorMsg}</div>) : ""}
        </div>
    );
  }
}

export default MarketplacePage;
