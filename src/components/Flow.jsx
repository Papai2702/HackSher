import React from 'react';
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
        <h1 className="flow-task">Ideation</h1>
        <h1 className="flow-task">Design & Planning</h1>
        <h1 className="flow-task">Select Components</h1>
        <h1 className="flow-task">Hardware Assembly</h1>
        <h1 className="flow-task">Programming & Logic Building</h1>
        <h1 className="flow-task">Testing & Iteration</h1>
        <h1 className="flow-task">Calibrate & Improve</h1>
        <h1 className="flow-task">Deploy & Iterate</h1>
      </div>
    </div>
  );
};

export default Flow;
