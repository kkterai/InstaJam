import PropTypes from 'prop-types';
import React from 'react';

import styles from './post-nav-styles.js';

function getPrevClassName(props) {
  return props.hasPrevious ? styles.prev : styles.prevHidden
}

function getNextClassName(props) {
  return props.hasNext ? styles.next : styles.nextHidden
}

function PostNav(props) {
  return (
    <div className={styles.root}>
      <button className={getPrevClassName(props)} onClick={props.onPrevious}>
        &#10094;
      </button>
      <button className={getNextClassName(props)} onClick={props.onNext}>
        &#10095;
      </button>
    </div>
  )
}

PostNav.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  hasPrevious: PropTypes.bool,
  hasNext: PropTypes.bool
}

export default PostNav;

