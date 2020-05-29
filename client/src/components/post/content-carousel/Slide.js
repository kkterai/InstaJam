import React from 'react'
import ReactPlayer from 'react-youtube';
import styleable from 'react-styleable'

import styles from './slide.module.css';

function Slide(props) {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // autoplay: 1
    }
  };

  let contentStr = props.content.content
  let contentJsx;
  
  if (contentStr && contentStr.match(/youtube/)) {
    let youTubeId = contentStr.replace(/^[^_]*=/,'');
    contentJsx = <ReactPlayer videoId={youTubeId} opts={opts} />
  } else {
    contentJsx = <img src={contentStr} alt={contentStr} /> 
  }

  return (
    <article style={props.style} className={props.css.root}>
      {contentJsx}
    </article>
  )
}

export default styleable(styles)(Slide)