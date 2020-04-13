import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import CommentForm from '../post/CommentForm';
import CommentFeed from '../post/CommentFeed';
import { getPost, deletePost, addLike, removeLike } from '../../actions/postActions';
import ReactPlayer from 'react-youtube';

class PostItem extends Component {

  componentWillReceiveProps(nextProps) {
    debugger;
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    const renderContent = () => {
        const opts = {
          height: '390',
          width: '640',
          playerVars: {
            // autoplay: 1
          }
        };

        if (post.content && post.content.match(/youtube/)) {
          let youTubeId = post.content.replace(/^[^_]*=/,'');
          return <ReactPlayer videoId={youTubeId} opts={opts} />
        }
          return <img src={post.content} alt={post.content} />
      }
    
    let datePub = new Date(post.date);
    let now = new Date();
    let dateDiff = now.getTime() - datePub.getTime();
    let diffInDays = Math.floor(dateDiff/(1000 * 3600 * 24))
    
    
    return (
      <article className="post-item">
        <header className="post-item-hdr">
          <Link to="/profile">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </Link>
          <span>{post.username}</span>
        </header>
        <div className="post-item-content" >
          <div className="box"> 
            {renderContent()}
          </div>
        </div>
        <div className="post-social" >
          <section className="interaction-btns">
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </section>
          <section className="like-number">
                {(post.likes.length === 1) ? `${post.likes.length} like` : `${post.likes.length} likes` } 
          </section>
          <div className="post-comments">
            <CommentFeed postId={post._id} comments={post.comments} />
          </div>
          <div className="time-ago-posted" >
            {diffInDays} days ago {/* update to accomodate hours and sing vs. plural*/}
          </div>
          <section className="post-comment-form" >
            < CommentForm postId={post._id} />
          </section>
        </div>
      </article>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getPost, deletePost, addLike, removeLike })(
  PostItem
);
