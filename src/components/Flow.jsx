import React from "react";
import hello from "../assets/hello.mp4";

const Flow = () => {
  return (
    <div className="flow">
      <div id="cursor">
        <video src={hello} className="cursor-video" autoPlay loop muted></video>
      </div>

      <div className="flow-content">
        <h1 className="flow-task">
          <p> Ideation</p>
        </h1>
        <h1 className="flow-task">
          <p> Design & Planning</p>
        </h1>
        <h1 className="flow-task">
          <p> Select Components</p>
        </h1>
        <h1 className="flow-task">
          <p> Hardware Assembly</p>
        </h1>
        <h1 className="flow-task">
          <p> Programming & Logic Building</p>
        </h1>
        <h1 className="flow-task">
          <p> Testing & Iteration</p>
        </h1>
        <h1 className="flow-task">
          <p> Calibrate & Improve</p>
        </h1>
        <h1 className="flow-task">
          <p> Deploy & Iterate</p>
        </h1>
      </div>
    </div>
  );
};

export default Flow;
