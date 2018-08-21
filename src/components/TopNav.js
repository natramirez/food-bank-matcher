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
            <li className='nav-tabs'>
              <NavLink to="/marketplace">MARKETPLACE</NavLink>
            </li>
            {/* <li className='nav-tabs'>
              <NavLink to="/examen_express">Examen express</NavLink>
            </li> */}
            <li className='nav-tabs'>
              <NavLink to="/surplus">SURPLUS</NavLink>
            </li>
            <li className='nav-tabs'>
              <NavLink exact to="/">
                <i className='fas fa-user-circle' />
              </NavLink>
            </li>
        </ul>
    </div>
    );
  }
}

export default TopNav;
