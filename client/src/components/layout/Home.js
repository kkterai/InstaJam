import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from '../posts/PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import PostForm from '../posts/PostForm';
import ReactModal from 'react-modal';

class Home extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    const modal = this.props.modalState ? <h1> Hello! </h1> : null
    
    return (
      <div className="home">
      <div className="new-modal" >
        {modal}
      </div>
        <div className="container">
          <div className="stories">
            Followed profile icons - clickthrough to stories
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
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(withRouter(Home));