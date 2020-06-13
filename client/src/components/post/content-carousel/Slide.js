import React from 'react';
import ReactPlayer from 'react-youtube';

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
    <article style={props.style} className={props.root}>
      {contentJsx}
    </article>
  )
}

export default Slide;