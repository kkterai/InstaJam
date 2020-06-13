import React from 'react';
import ReactPlayer from 'react-youtube';

import styles from './slide-styles.js';

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

  if (contentStr && contentStr.match(/youtu.be/)) {
    let youTubeId = contentStr.replace(/^(https:\/\/)?[a-z0-9]+([.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?\W/,'');
    contentJsx = <ReactPlayer videoId={youTubeId} opts={opts} />
  } 
  
  else if (contentStr && contentStr.match(/youtube/)) {
    let youTubeId = contentStr.replace(/^[^_]*=/,'');
    contentJsx = <ReactPlayer videoId={youTubeId} opts={opts} />
  } 
  
  else {
    contentJsx = <img src={contentStr} alt={contentStr} /> 
  }

  return (
    <article style={{ ...styles.root, ...props.style }}>
      {contentJsx}
    </article>
  )
}

export default Slide;