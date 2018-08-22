import React, { Component } from 'react';
// import { Link } frosm 'react-router-dom';

class WelcomePage extends Component {
  render() {
    return (
        <div className="page-content">
            <h1 className="page-title">Error: 404 Page not found.</h1>
            <p className="welcome-lead">You tried to access a page that does not exist.</p>
            {/* <Link to={this.context.history}>Regresar </Link> */}
        </div>
    );
  }
}

export default WelcomePage;
