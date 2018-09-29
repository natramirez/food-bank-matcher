import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ItemForm from './ItemForm';


class SurplusPage extends Component {
    render() {
        return (
            <div className="page-content">
                <h1 className="page-title">Add a Surplus Item to the Marketplace</h1>
                <ItemForm/>
            </div>
        );
    }
}

export default withRouter(SurplusPage);