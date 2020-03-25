import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import '../../index.css';
import isLoggedIn from '../../validation/is-logged-in'
import setAuthToken from '../../utils/setAuthToken';


class Navbar extends Component {
  
  logout = click => {
    // Remove token from localStorage
    this.props.setToken(null);
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);

    // this.props.history.push('/login')

  }
  

  render() {
    
    return (
      isLoggedIn(this.props.token) ?
      (<div>
        <nav className="Nav">
            <div className="Nav-menus">
              <div className="Nav-brand">
                <a className="Nav-brand-logo" href="/">
                  Instagram
                </a>
              </div>
              <div className="logout">
                <button className="btn" onClick={this.logout}>Log Out</button>
              </div>
            </div>
          </nav>
      </div>) : <Redirect to="/login" />
    )
  }
}

export default Navbar;