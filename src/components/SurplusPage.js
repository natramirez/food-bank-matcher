import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// import ExamBegin from './ExamBegin';
// import ExamInProgress from './ExamInProgress';
// import ExamResults from './ExamResults';


class SurplusPage extends Component {
    constructor(props) {
		super(props);

        this.state = {
            FoodBankName: '',
            ItemName: '',
            Quantity: '',
            Category: '',
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
        event.preventDefault()
        const FoodBankName = this.state.FoodBankName
        const ItemName = this.state.ItemName
        const Quantity = this.state.Quantity
        const Category = this.state.Category
       
        var serverURL =  'http://localhost:8080/api/updateSurplus';
        axios.put(serverURL,{
              foodBankName: FoodBankName,
              itemName: ItemName,
              quantity: Quantity,
              categories: [Category]
          })
        .then(res => {
            console.log('res.data: ' + JSON.stringify(res.data));
            this.questions = res.data;
            if (res.data.name && res.data.error === "MongoError") {
                alert("Error adding item. Please try again later.")
            } else if (res.data.error === "Missing parameters") {
                alert("Please fill in all required fields and try again.")
            } else {
                alert("Surplus item has been added successfully.")               
            }
        });
    }
    // handleError() {
    //     this.setState({message: "An error occurred. Please try again later."});
    // }
    // constructor(props) {
    //     super(props);
    //     this.goToResultsPage = this.goToResultsPage.bind(this);
    //     this.questions = [];
    //     this.userAnswers = [];
    // }
    // goToResultsPage(questionsList, userAnswersList) {
    //     this.questions = questionsList;
    //     this.userAnswers = userAnswersList;
    //     this.props.history.push(this.props.match.path + '/resultados');
    // }
    render() {
        // if (!this.state.message) {
        return (
            <div className="page-content">
                <h1 className="page-title">Surplus</h1>
                <form onSubmit={this.handleSubmit}>
                <br/>
                <br/>
                <br/>
                <input type="text" value={this.state.FoodBankName}
                onChange={this.FoodBankNameChanged}
                placeholder="Food Bank"></input>
                <br/>
                <br/>
                <input type="text" value={this.state.ItemName}
                onChange={this.ItemNameChanged}
                placeholder="Item Name"></input>
                <br/>
                <br/>
                <input type="text" value={this.state.Quantity}
                onChange={this.QuantityChanged}
                placeholder="Quantity"></input>
                <br/>
                <br/>
                <input type="text" value={this.state.Category}
                onChange={this.CategoryChanged}
                placeholder="Category"></input>
                <br/>
                <br/>
                <input type="submit" value="Submit" />
            </form>
            {/* if () */}
            {/* <div className="feedbackMsg">{this.state.message}</div> */}

                {/* <Switch>
                    <Route exact path={this.props.match.path} component={ExamBegin} />
                    <Route exact path={this.props.match.path + '/en_proceso'} render={() => <ExamInProgress numQuestions={40} goToResultsPage={this.goToResultsPage}/>} />
                    <Route exact path={this.props.match.path + '/resultados'} render={() => <ExamResults questions={this.questions} userAnswers={this.userAnswers}/>} />
                </Switch> */}
            </div>);
        // }
        // else {
        //     return (<div className="loading-msg">{this.state.message}</div>);
        // }
        
    }
}

export default withRouter(SurplusPage);