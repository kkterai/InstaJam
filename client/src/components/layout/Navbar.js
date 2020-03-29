import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import '../../index.css';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  // 
  
  render() {

    let userProfile = this.props.profile.profile;
    let conditional = (isEmpty(userProfile)) ? '/create-profile' : '/profiles/:username';

    return (
      !isEmpty(localStorage.jwtToken) ?
      (<div>
        <nav className="Nav">
            <div className="Nav-menus">
              <div className="Nav-brand">
                <a className="Nav-brand-logo" href="/">
                  Instagram
                </a>
              </div>
              <div className="logout">
                <button className="btn" onClick={this.onLogoutClick.bind(this)}>Log Out</button>
              </div>
              <Link to={conditional}>
                <div className="nav-profile">
                  <img
                    className="rounded-circle d-none d-md-block"
                    src={this.props.auth.user.avatar}
                    alt=""
                  />
                </div>
              </Link>
            </div>
          </nav>
      </div>) : null
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withRouter(Navbar));