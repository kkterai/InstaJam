import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProfilePosts extends Component {
  render() {
    
    return (
      <div className="user-posts">
        User posts here
      </div>
    );
  }
}

ProfilePosts.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfilePosts