import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  openNav = () => {
    document.getElementById('nav').style.width = '200px'
  }

  closeNav = () => {
    document.getElementById('nav').style.width = '0'
  }
  
  renderLogoutLink() {
    return (
      <div>
        <i className="fas fa-bars fa-2x open" onClick={this.openNav}></i>
        <nav id="nav">
        <i className="fas fa-bars fa-2x closebtn" onClick={this.closeNav}></i>
          <Link 
            id='home'
            className='nav-link'
            to='/'>
            Home
          </Link>
          <Link 
            id='logout'
            className='nav-link'
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
        <span className="current-user">
        <span className="shadowbox"> {`Hello, ${this.context.user.name}!`}</span>
        </span>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <>
        <i className="fas fa-bars fa-2x open" onClick={this.openNav}></i>
        <nav id="nav">
          <i className="fas fa-bars fa-2x closebtn" onClick={this.closeNav}></i>
          <Link to='/' className='nav-link'>Home</Link>
          <Link to='/login' className='nav-link' onClick={this.closeNav}>Login</Link>
          {' '}
          <Link to='/register' className='nav-link' onClick={this.closeNav}> Sign up</Link>
        </nav>
      </>
    )
  }

  render() {
    return (
      <header>
        <h1>
          <Link to='/'>
          <span className="shadowbox">Spaced Repetition</span>
          </Link>
        </h1>
        {TokenService.hasAuthToken()
        ? this.renderLogoutLink()
        : this.renderLoginLink()}

      </header>
    );
  }
};

export default Header;
