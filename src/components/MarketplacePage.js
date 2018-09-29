import React, { Component } from 'react';
import WrappedSearchBar from './WrappedSearchBar';
import ItemForm from './ItemForm';
import Modal from './Modal';

class MarketplacePage extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {};
        this.displayResults = this.displayResults.bind(this);
        this.createResultBoxes = this.createResultBoxes.bind(this);
        this.handleReserveBtnClick = this.handleReserveBtnClick.bind(this);
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
    createResult = (res,index) => {
        var reserveBtnText = res.status && (res.status === "Reserved") ? "Waitlist": "Reserve";
        return (
            <div className="result-box" key={index}>
                <div className="result-box-col"> {res.itemName}</div>
                <div className="result-box-col"> {res.quantity}</div>
                <div className="result-box-col"> {res.categories}</div>
                <div className="result-box-col"> {res.foodBankName}</div>
                <button label={reserveBtnText} onClick={event => this.handleReserveBtnClick(event, res, reserveBtnText)}>{reserveBtnText}</button>
                <Modal 
                    modalTitle="Update Item Details"
                    modalBody={<ItemForm presetData={res} />}
                />
                <br/>
                <br/>
            </div>
    )};
    createResultBoxes = (results) => (
        results.map(this.createResult)
    );
    handleReserveBtnClick(event, item, text) {
        event.preventDefault();
        switch (text) {
            case "Reserve":
                alert(`The item ${item.itemName} has been reserved.`);
                break;
                // change item's status to reserved, 
                // add current user to item's reserved field
                // add item to user's reserved list
                // change button from "Reserve" to "Reserved" and new color
                // (on hover, change text to "unreserve" or something like that?)
            case "Waitlist":
                alert(`You have been added to the waitlist for the item ${item.itemName}.`);
                break;
                // 1. Add the current user to the item's waitlist
                // 2. Add item to user's list of items for which user is on waitlist
                // 3.
                // OPTION 1: change button to "On waitlist" with own color
                //      (on hover, change text to "Remove from waitlist" or something like that?)
                // OPTION 2: have separate status field, which changes to "On Waitlist"
                //      Button text changes to "Remove from Waitlist"
            case "Remove from Waitlist":
                alert(`You have been removed from the waitlist for the item ${item.itemName}.`);
                break;
                // 1. Remove the current user from the item's waitlist
                // 2. Remove item from user's list of items for which user is on waitlist
                // 3.
                // OPTION 1: change button to "Waitlist" with own color
                // OPTION 2: have separate status field, which changes to "Reserved"
                //      Button text changes to "Waitlist"
            case "Cancel Reserve":
                alert(`You have canceled your reservation for the item ${item.itemName}.`);
                break;
                // Add alert to confirm, tell user that item will be given to first user on waitlist,
                // and if they want it back they will have to be added to the waitlist
                // Once they confirm:
                // 1. Check the item's waitlist. Assign to first user:
                        //a. change item's reserved field to new user
                        //b. remove new user from item's waitlist
                        //c. add item to new user's reserved list
                        //d. remove from new user's waitlist list
                        //e. item's status field stays as "Reserved"
                // 2. If no users on waitlist, then change item's status to available and 
                    //remove old user from item's reserved field
                // 3. Remove item from old user's reserved list
                // 4.
                // OPTION 1: change button to status name with own color, on hover change to action
                // OPTION 2: have separate status field, which changes to "Available" if no user
                //      on item's waitlist, or stays as "Reserved" if user on item's waitlist
                //      Button text changes to "Reserve" or "Waitlist" depending on above case
                default:
                    console.log("Error occurred in reserve button click. Had incorrect text");
                    break;
            
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
                this.setState({results: this.dummyData});
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
