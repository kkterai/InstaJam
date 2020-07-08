import React, { Component } from 'react';
import { connect } from 'react-redux';

import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0];

    return (
            <header>
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            <section>
              <div className="profile-info">
                <h1>{profile.username}</h1>
                <div className="edit-profile">
                  <button className="btn btn-outline-secondary">Edit Profile</button>
                </div>
                <h3>{profile.posts.length} posts</h3>
                <h3>{profile.followers.length} followers</h3>
                <h3>{profile.following.length} following</h3>
                <h3>
                  {isEmpty(profile.website) ? null : (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    > {profile.website}
                    </a>
                  )}
                </h3>
                <h3 className="bio">{profile.bio}</h3>
              </div>
            </section>
            
          </header>
    );
  }
}

export default ProfileHeader;
