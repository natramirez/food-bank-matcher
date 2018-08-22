import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../images/food_cropped.jpg'

class WelcomePage extends Component {
  render() {
    return (
        <div className="page-content">
            <div className="home-image">
                <img src={image} className="img-fluid" alt="Responsive image" />
                <div className="overlay-text">
                    <h2>we help food banks<br/>distribute their<br/>surplus supplies</h2>
                    {/* TODO: add onClick property to button and route to an about us page*/}
                    <button type="button" className="btn btn-primary">Learn More</button>
                </div>
            </div>
        </div>
        
    );
  }
}
export default WelcomePage;
