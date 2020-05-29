import PropTypes from 'prop-types'
import React from 'react'
import styleable from 'react-styleable'

import styles from './carousel.module.css'

function renderSlides(props) {
  return React.Children.map(props.content, (slide, i) => {
    debugger
    console.log(`style: {${slide.props.children.props.style.root},width: ${props.width},left: ${props.width * (i - props.showIndex)}}`)
    console.log(slide.props.children)
    return React.cloneElement(slide, {
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
    <div className={props.css.root}>
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

export default styleable(styles)(Carousel)