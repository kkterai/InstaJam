import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfilePosts from './ProfilePosts';


import { getProfileByusername } from '../../actions/profileActions';

class Profile extends Component {
  
  componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfileByusername(this.props.match.params.username);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <ProfileHeader profile={profile} />
              <ProfilePosts profile={profile} />
            </div>
            <div className="col-md-6" />
          </div>
        </div>
      );
    }

    return (
      
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByusername: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByusername })(Profile);
