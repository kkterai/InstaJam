import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import '../../index.css';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';
import PostForm from '../posts/PostForm';
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
              <div className="new-post-modal">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                  <PostForm/>
                </button>
              </div>
              <div className="logout">
                <button className="btn" onClick={this.onLogoutClick.bind(this)}>Log Out</button>
              </div>
              <div className="nav-profile">
                <Link to={conditional}>
                  <img
                    className="rounded-circle d-none d-md-block"
                    src={this.props.auth.user.avatar}
                    alt=""
                  />
                </Link>
              </div>
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