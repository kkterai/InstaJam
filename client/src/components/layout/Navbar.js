import React, { Component } from 'react'
import '../../index.css';
import isLoggedIn from '../../validation/is-logged-in'


export default class Navbar extends Component {
  render() {
    return (
      isLoggedIn(localStorage.jwtToken) ?
      (<div>
        <nav className="Nav">
            <div className="Nav-menus">
              <div className="Nav-brand">
                <a className="Nav-brand-logo" href="/">
                  Instagram
                </a>
              </div>
            </div>
          </nav>
      </div>) : null
    )
  }
}
