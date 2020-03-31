import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
  render() {
    const { posts } = this.props;

    return posts.map(post => (
      <div className="post-item-wrapper">
        <PostItem key={post._id} post={post} />
      </div>
    ));
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
