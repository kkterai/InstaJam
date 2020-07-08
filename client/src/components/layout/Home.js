import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from '../posts/PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';

import configStyles from '../posts/config-styles.js'

class Home extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCurrentProfile();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed width={configStyles.imageWidth} posts={posts} />;
    }
    
    return (
      <div className="home">
        <div className="container">
          <div className="stories">
            {/*Followed profile icons - clickthrough to stories*/}
          </div>
          <div className="friend-posts">
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(withRouter(Home));