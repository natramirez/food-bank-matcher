import React, { Component } from 'react';
import '../App.css';
import TopNav from './TopNav.js'
import { NavLink } from 'react-router-dom';
import logo from '../logo_small.png';

class Header extends Component {
  render() {
    return (
      <header>
        <NavLink exact to="/" className="logo">        
          <img src={logo} className="App-logo" alt="logo" />
        </NavLink>
        <TopNav/> 
      </header>
    );
  }
}

export default Header;
