import React from 'react'
import intro from '../assets/intro.mp4'; // Adjust the path as necessary

const IntroVideo = () => {
  return (
    <div>
      <video
      className="hero-video"
      objectFit="cover"
      src={intro}
      autoPlay
      muted
      playsInline
    //   style={{ width: "100%", height: "auto" }}
    />
     
    </div>
  )
}

export default IntroVideo
