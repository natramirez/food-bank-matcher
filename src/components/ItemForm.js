import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ItemForm extends Component {
    constructor(props) {
		super(props);
        this.state = {
            FoodBankName: props.presetData ? props.presetData.foodBankName : '',
            ItemName: props.presetData ? props.presetData.itemName : '',
            Quantity: props.presetData ? props.presetData.quantity : '',
            Category: props.presetData ? props.presetData.categories[0] : 'Produce',
            Status: props.presetData ? props.presetData.status : 'Available',
            Id: props.presetData ? props.presetData._id : '',

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.FoodBankNameChanged = this.FoodBankNameChanged.bind(this);
        this.ItemNameChanged = this.ItemNameChanged.bind(this);
        this.QuantityChanged = this.QuantityChanged.bind(this);
        this.CategoryChanged = this.CategoryChanged.bind(this);
    }

    FoodBankNameChanged(event) {
        this.setState({FoodBankName: event.target.value});
    }

    ItemNameChanged(event) {
        this.setState({ItemName: event.target.value});
    }

    QuantityChanged(event) {
        this.setState({Quantity: event.target.value});
    }

    CategoryChanged(event) {
        this.setState({Category: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const FoodBankName = this.state.FoodBankName;
        const ItemName = this.state.ItemName;
        const Quantity = this.state.Quantity;
        const Category = this.state.Category;
        const Status = this.state.Status;
        const Id = this.state.Id;
       
        var serverURL =  '/api/updateSurplus';
        axios.put(serverURL, {
            foodBankName: FoodBankName,
            itemName: ItemName,
            quantity: Quantity,
            categories: [Category],
            status: Status,
            id: Id
          })
        .then(res => {
            this.questions = res.data;
            if (res.data.name && res.data.error === "MongoError") {
                alert("Error adding item. Please try again later.");
            } else if (res.data.error === "Missing/invalid parameters") {
                alert("Please fill in all required fields and try again.");
            } else {
                let msgStatus = this.props.presetData ? "updated" : "added";
                alert(`Surplus item has been ${msgStatus} successfully.`);
            }
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <br/>
                <label>Food Bank Name</label>
                <input type="text" value={this.state.FoodBankName}
                onChange={this.FoodBankNameChanged}></input>
                <br/>
                <br/>
                <label>Item Name</label>
                <input type="text" value={this.state.ItemName}
                onChange={this.ItemNameChanged}></input>
                <br/>
                <br/>
                <label>Quantity</label>
                <input type="text" value={this.state.Quantity}
                onChange={this.QuantityChanged}
                placeholder="i.e. # of lbs, boxes, dozens, etc."></input>
                <br/>
                <br/>
                <label>Category</label>
                <select value={this.state.Category} onChange={this.CategoryChanged}>
                    {/* <option value="" disabled selected>Category</option> */}
                    <option value="Produce">Produce</option>
                    <option value="Canned Goods">Canned Goods</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Frozen">Frozen</option>
                    <option value="Cereal">Cereal</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Bread & Baked Goods">Bread & Baked Goods</option>
                    <option value="Dairy & Eggs">Dairy & Eggs</option>
                    <option value="Meat & Seafood">Meat & Seafood</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
                <br/>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default withRouter(ItemForm);