import React, {Component} from 'react';
import Modal from './Modal';
import ItemForm from './ItemForm';

class MarketplaceItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        }
        this.handleReserveBtnClick = this.handleReserveBtnClick.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleReserveBtnClick(event, text) {
        event.preventDefault();
        let status, reserved, waitlist;
        let item = this.state.item;
        let curUserId = this.props.curUserId;
        switch (text) {
            case "Reserve":
                alert(`The item ${item.itemName} has been reserved.`);
                
                // change item's status to reserved,
                // add current user to item's reserved field
                status = "Reserved";
                reserved = curUserId;
                // this.updateItem("Reserved", this.props.curUserId, null);

                // add item to user's reserved list
                break;
                // rerender item:
                // - UI status field from "Reserve" to "Reserved" and new color
                // - Btn changes to "Cancel Reserve"
                
            case "Waitlist":
                alert(`You have been added to the waitlist for the item ${item.itemName}.`);
                
                // 1. Add the current user to the item's waitlist
                item.waitlistUserIds.push(curUserId);
                waitlist = item.waitlistUserIds;

                // 2. Add item to user's list of items for which user is on waitlist
                break;
                // 3. rerender item:
                // - UI status field changes to "On Waitlist"
                // - Button text changes to "Remove from Waitlist"
                
            case "Remove from Waitlist":
                alert(`You have been removed from the waitlist for the item ${item.itemName}.`);
                
                // 1. Remove the current user from the item's waitlist
                if (item.waitlistUserIds) {
                    let userIndex = item.waitlistUserIds.indexOf(curUserId);
                    if (userIndex > -1) {
                        item.waitlistUserIds.splice(userIndex, 1);
                        waitlist = item.waitlistUserIds;
                    }
                }
                
                // 2. Remove item from user's list of items for which user is on waitlist
                break;
                // 3. rerender item:
                // - Button text changes to "Waitlist"
            case "Cancel Reserve":
                alert(`You have canceled your reservation for the item ${item.itemName}.`);
                
                // check item's waitlist and assign to first user there
                if (item.waitlistUserIds && item.waitlistUserIds.length > 0) {
                    let newUser = item.waitlistUserIds.shift();
                    waitlist = item.waitlistUserIds;
                    reserved = newUser;
                    status = "Reserved";
                    //c. add item to new user's reserved list
                    //d. remove from new user's waitlist list
                } else {
                    status = "Available";
                    reserved = "";
                }                   
                // Remove item from old user's reserved list
                break;
                // 4. Rerender item:
                // - Button text changes to "Reserve" or "Waitlist" depending on status
                
            default:
                console.log("Error occurred in reserve button click. Had incorrect button text.");
                return;
        }
        this.updateItem(status, reserved, waitlist, item._id);
    }
    updateItem(itemStatus, itemReservedUserId, itemWaitlist, id) {
        var url = '/api/updateSurplus';
        var data = {
            id: id,
            status: itemStatus,
            reservedUserId: itemReservedUserId,
            waitlistUserIds: itemWaitlist
        };
        data = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', url);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onload = function() {
            if (!this._isMounted) {return;}
            console.log("response: ", xhr.response);
            var data = JSON.parse(xhr.response);
            if ((xhr.status >= 200 && xhr.status < 400) && (!data.name) && this._isMounted) {
                this.setState({item: data}); //renrender item with updated data
            } else {
                this.setState({item: "", errorMsg: data});
            }
        }.bind(this);
        xhr.send(data);
    }
    render() {
        let curUserId = this.props.curUserId; //eventually store in user session
        let item = this.state.item;
        let reserveBtnText;
        if (item.waitlistUserIds.includes(curUserId)) {
            reserveBtnText = "Remove from Waitlist";
        } else if (item.reservedUserId === curUserId) {
            reserveBtnText = "Cancel Reserve";
        } else {
            reserveBtnText = item.status && (item.status === "Reserved") ? "Waitlist": "Reserve";
        }
        let onClickFunc = event => this.handleReserveBtnClick(event, reserveBtnText);
        let modalMsg = "Are you sure you want to cancel your reservation? If there is someone on the waitlist, this item will automatically be reserved by them.";
        let modal = <Modal 
            modalToggleBtn={reserveBtnText}
            modalTitle="" 
            modalBody={<p>{modalMsg}</p>}
            modalBtn1={"Yes, cancel item reservation"}
            modalBtn1OnClick={onClickFunc}
            />
        let regularActionBtn = <button label={reserveBtnText} type="button" className="btn btn-primary" onClick={onClickFunc}>{reserveBtnText}</button>
        let actionBtn = reserveBtnText === "Cancel Reserve" ? modal : regularActionBtn;
        return (
            <div className="result-box" key={this.props.index}>
                <div className="result-box-col"> {item.itemName}</div>
                <div className="result-box-col"> {item.quantity}</div>
                <div className="result-box-col"> {item.categories}</div>
                <div className="result-box-col"> {item.foodBankName}</div>
                <div className="result-box-col"> {item.status}</div>
                {actionBtn}
                <Modal 
                    modalToggleBtn="Edit"
                    modalTitle="Update Item Details"
                    modalBody={<ItemForm presetData={item} />}
                />
                <br/>
                <br/>
                {this.state.errorMsg ? <div>{this.state.errorMsg}</div>:""}
            </div>    
    )};
}
export default MarketplaceItem;