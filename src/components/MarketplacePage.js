import React, { Component } from 'react';
import WrappedSearchBar from './WrappedSearchBar';
import axios from 'axios';

class MarketplacePage extends Component {
    constructor(props) {
        super(props)
        // this.state = this.getInitialState();
        this.displayResults = this.displayResults.bind(this);
        this.createResultBoxes = this.createResultBoxes.bind(this);

    }
    getInitialState() {
        return {
            resultsReceived:false,
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
    )
    displayResults(item, category) {
        var url = item ? 'http://localhost:8080/api/searchByItem?itemName='+item : 'http://localhost:8080/api/searchByCategory?categories='+category; 
        var that = this;
        axios.get(url).then(res => {
            console.log('res: ' + JSON.stringify(res));

            console.log('res.data: ' + JSON.stringify(res.data));
            // this.questions = res.data;
            // if (res.data.name && res.data.name === "MongoError") {
            //     // this.handleError();
            // }
            // else {
            console.log("Res: " + res.body)
            // that.resultsReceived = true;
            that.results = res;
            that.setState({results:res.body});
                // this.setState({message: null});                
            // }
        });
    }
    render() {
    return (
        <div className="page-content">
            <h1 className="welcome-heading">Marketplace</h1>
            <WrappedSearchBar displayResults={this.displayResults.bind(this)}/>
            {this.resultsReceived ? (<div>{this.createResultBoxes(this.state.results)}</div>) : ""}
            {/* <div>
                {this.createResultBoxes()}
            </div> */}
        </div>
    );
  }
}

export default MarketplacePage;
