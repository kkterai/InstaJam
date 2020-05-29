import React from 'react'
import styleable from 'react-styleable'

import styles from './frame.module.css'

function Frame(props) {
  return <div className={props.css.root}>{props.children}</div>
}

export default styleable(styles)(Frame)