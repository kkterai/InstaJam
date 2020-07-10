import React, { Component } from 'react';

import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {

  render() {
    const { profile } = this.props;

    return (
      <header>
        <div className="profile-image">
          <img
            className="rounded-circle"
            src={profile.user.avatar}
            alt=""
          />
        </div>
        <section className="profile-right">
          <div className="profile-info">
            <h1 className="profile-username">{profile.username}</h1>
            {/* <div className="edit-profile-button">
              <button className="btn btn-outline-secondary">Edit Profile</button>
            </div> */}
            <br></br>
            <ul className="profile-stats">
              <li className="stat-list">
                <span> {profile.posts.length} posts </span>
              </li>
              <li className="stat-list">
                <span> {profile.followers.length} followers </span>
              </li>
              <li className="stat-list">
                <span> {profile.following.length} following </span>
              </li>
            </ul>
            
            <h4>
              {isEmpty(profile.website) ? null : (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                > {profile.website}
                </a>
              )}
            </h4>
            <h4 className="bio">{profile.bio}</h4>
          </div>
        </section>
      </header>
    );
  }
}

export default ProfileHeader;
