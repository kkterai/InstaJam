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
  console.log(props)
  let something;
  if (props.content && props.content.match(/youtube/)) {
    let youTubeId = props.content.replace(/^[^_]*=/,'');
    something = <ReactPlayer videoId={youTubeId} opts={opts} />
  } else {
    something = <img src={props.content} alt={props.content} /> 
  }

  return (
    <div>
      {something}
    </div>
  )
}
