import PropTypes from 'prop-types';
import React from 'react'

import styles from './carousel-styles.js';

function renderSlides(props) {
  return React.Children.map(props.content, (slide, i) => {
    console.log(`style: {${slide.props.children.props.style.root},width: ${props.width},left: ${props.width * (i - props.showIndex)}}`)
    return React.cloneElement(slide.props.children, {
      style: {
        ...slide.props.children.props.style.root,
        width: props.width,
        left: props.width * (i - props.showIndex)
      }
    })
  })
}

function Carousel(props) {
  return (
    <div style={styles.root}>
      {renderSlides(props)}
      {props.nav}
    </div>
  )
}


Carousel.propTypes = {
  nav: PropTypes.node.isRequired,
  showIndex: PropTypes.number,
  width: PropTypes.number
}

export default Carousel;