import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import '../../index.css';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostModal from '../posts/PostModal';

import { logoutUser } from '../../actions/authActions';
import { getCurrentProfile, clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  onNewPostClick(e) {
    this.props.toggleModal(
      (this.props.modalState === false) ? true : false
    )
  }

  render() {
    let userProfile = this.props.profile.profile;
    let conditional = (isEmpty(userProfile)) ? '/create-profile' : '/profile';

    return (
      !isEmpty(localStorage.jwtToken) ?
      (<div>
        <nav className="Nav">
            <div className="Nav-menus">
              <div className="Nav-brand">
                <a className="Nav-brand-logo" href="/home">
                  Instagram
                </a>
              </div>
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Find People
              </Link>
              <div className="new-post-modal">
                <button className="btn btn-outline-secondary" onClick={this.onNewPostClick.bind(this)}>New Post</button>
              </div>
              <div className="new-modal" >
                <PostModal toggleModal={this.props.toggleModal} modalState={this.props.modalState} />
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

export default connect(mapStateToProps, { getCurrentProfile, logoutUser, clearCurrentProfile })(withRouter(Navbar));