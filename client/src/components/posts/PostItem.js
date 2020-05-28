import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import CommentForm from '../post/CommentForm';
import CommentFeed from '../post/CommentFeed';
// Content carousel imports
import Carousel from '../post/content-carousel/Carousel';
import Frame from '../post/content-carousel/Frame';
import PostNav from '../post/content-carousel/PostNav';
import Slide from '../post/content-carousel/Slide';

import { getPost, deletePost, addLike, removeLike } from '../../actions/postActions';

import styles from './post-item-styles.js'


class PostItem extends Component {
  constructor(props) {
    super(props)
    this.handleClickPrevious = this.handleClickPrevious.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)

    this.state = {
      showIndex: 0,
      numSlides: this.props.post.contents.length
    }
  }
  handleClickPrevious() {
    this.setState({
      showIndex: Math.max(this.state.showIndex - 1, 0)
    })
  }
  handleClickNext() {
    this.setState({
      showIndex: Math.min(this.state.showIndex + 1, this.state.numSlides - 1)
    })
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

  renderNav() {
    return (
      <PostNav
        onPrevious={this.handleClickPrevious}
        hasPrevious={this.state.showIndex > 0}
        onNext={this.handleClickNext}
        hasNext={this.state.showIndex < this.state.numSlides - 1}
      />
    )
  }

  render() {

    console.log(`post number ${this.props.post._id}`)
    console.log(this.props.post.contents)
    
    const { post, auth, showActions } = this.props;
    const contentCollection = post.contents.map( content => <div key={content._id}><Slide content={content} /></div>)
   
    let datePub = new Date(post.date);
    let now = new Date();
    let dateDiff = now.getTime() - datePub.getTime();
    let diffInDays = Math.floor(dateDiff/(1000 * 3600 * 24))
  
    return (
      <article style={styles.root} className="post-item">
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
        <Frame>
          <Carousel
            showIndex={this.state.showIndex}
            nav={this.renderNav()}
            width={640}
          >
          <div className="post-item-content" >
            <div className="box"> 
              {contentCollection} {/* Need to refactor here to enable carousel */}
            </div>
          </div>
          </Carousel>
        </Frame>
        
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
