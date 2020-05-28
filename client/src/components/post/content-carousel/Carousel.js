import PropTypes from 'prop-types'
import React from 'react'

import styles from './carousel.module.css'

function renderSlides(props) {
  return React.Children.map(props.children, (slide, i) => {
    return React.cloneElement(slide, {
      style: {
        ...slide.props.style,
        width: props.width,
        left: props.width * (i - props.showIndex)
      }
    })
  })
}

export default function Carousel(props) {
  return (
    <div className={styles['root']}>
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
