import React, { Component } from 'react';
import WrappedSearchBar from './WrappedSearchBar';
// import axios from 'axios';

class MarketplacePage extends Component {
    constructor(props) {
        super(props)
        this.state = this.getInitialState();
        this.displayResults = this.displayResults.bind(this);
        this.createResultBoxes = this.createResultBoxes.bind(this);

    }
    getInitialState() {
        return {
            results:null
        }
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
            // url = `http://localhost:8080/api/searchByItemAndCategory?itemName=${item}&categories=${category}`;
        } else {
            params = item ? `itemName=${item}` : `categories=${category}`;
            // url = item ? 'http://localhost:8080/api/searchByItem?itemName='+item : 'http://localhost:8080/api/searchByCategory?categories='+category; 
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url + params);
        xhr.onload = function() {
            var data = JSON.parse(xhr.response);
            console.log("data: ", data);
            console.log("xhr status: ", xhr.status);
            console.log("data name: ", data.name);

            if ((xhr.status >= 200 && xhr.status < 400) && (!data.name)) {
                console.log("here")
                this.setState({results: data});
            } else {
                console.log("xhr status: ", xhr.status);
                this.setState({errorMsg: "An error occurred. Please try again later."});
            }
        }.bind(this);
        xhr.send();
        // var that = this;
        // axios.get(url).then(res => {
        //     console.log('res: ' + JSON.stringify(res));

        //     console.log('res.data: ' + JSON.stringify(res.data));
        //     // this.questions = res.data;
        //     // if (res.data.name && res.data.name === "MongoError") {
        //     //     // this.handleError();
        //     // }
        //     // else {
        //     console.log("Res: " + res.body)
        //     // that.resultsReceived = true;
        //     that.results = res;
        //     that.setState({results:res.body});
        //         // this.setState({message: null});                
        //     // }
        // });
    }
    render() {
    return (
        <div className="page-content">
            <h1 className="welcome-heading">Marketplace</h1>
            <WrappedSearchBar displayResults={this.displayResults}/>
            {this.state.results ? (<div>{this.createResultBoxes(this.state.results)}</div>) : ""}
            {this.state.errorMsg ? (<div>{this.state.errorMsg}</div>) : ""}
            {/* <div>
                {this.createResultBoxes()}
            </div> */}
        </div>
    );
  }
}

export default MarketplacePage;
