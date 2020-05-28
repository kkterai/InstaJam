import React from 'react'

import styles from './frame.module.css'

export default function Frame(props) {
  return <div className={styles['root']}>{props.children}</div>
}
