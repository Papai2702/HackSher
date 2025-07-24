import React from 'react'
import hello from '../assets/hello.mp4'; 

const Flow = () => {

  
  return (
    <div className='flow'>
      <div id="cursor">
        <video 
        src={hello} 
        className='cursor-video'
        autoPlay
        loop
        muted
        ></video>
      </div>
        <div className="flow-content">
            <h1 className="flow-tasks"> Ideation</h1>
            <h1 className="flow-tasks">Design & Planning</h1>
            <h1 className="flow-tasks">Select Components</h1>
            <h1 className="flow-tasks"> Hardware Assembly</h1>
            <h1 className="flow-tasks">Programming & Logic Building</h1>
            <h1 className="flow-tasks">Testing & Iteration</h1>
            <h1 className="flow-tasks">Calibrate & Improve</h1>
            <h1 className="flow-tasks">Deploy & Iterate</h1>
        </div>
      
    </div>
  )
}

export default Flow



