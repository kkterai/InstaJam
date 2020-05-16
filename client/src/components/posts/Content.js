import React from 'react'
import ReactPlayer from 'react-youtube';

export default function Content(props) {
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
    <div>
      {contentJsx}
    </div>
  )
}
