import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo_small.png';
import '../App.css';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.setClass.bind(this);
  }
  getInitialState() {
    return {
      responsiveClass: false
    }
  }
  toggleClassBool() {
    this.setState({responsiveClass: this.state.responsiveClass ? false : true})
  }
  setClass() {
    return (this.state.responsiveClass ?' responsive':'');
  }
  render() {
    return (
    <div className="top-nav">
        <ul className={"top-nav-list" + this.setClass()}>
            <li className='nav-tabs' >
              <NavLink exact to="/">
              <div className="logo">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
              </NavLink>
            </li>
            <li className='nav-tabs'>
              <NavLink to="/marketplace">Marketplace</NavLink>
            </li>
            {/* <li className='nav-tabs'>
              <NavLink to="/examen_express">Examen express</NavLink>
            </li> */}
            <li className='nav-tabs'>
              <NavLink to="/surplus">Surplus</NavLink>
            </li>
            <li>
              <i className='fas fa-user-circle' />
              {/* <i className="fas fa-user-circle"/> */}
            </li>
        </ul>
    </div>
    );
  }
}

export default TopNav;
