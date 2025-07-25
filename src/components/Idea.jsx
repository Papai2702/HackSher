import React from "react";
import { Link } from "react-router-dom";
const Idea = () => {
  return (
    <div className="idea-page min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-4 sm:p-6 md:p-10">
      <div className="idea max-w-5xl w-full text-center space-y-8">
        <div className="idea-content">
          <h1 className="idea-quest text-[1.75rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-bold text-white leading-tight tracking-tight">
            Got A Project Idea In Mind?
            <br className="hidden sm:block" />
            We Can Help You Build It :)
          </h1>
        </div>
        <div className="help">
          <span className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <p className="text-base sm:text-lg md:text-xl text-gray-300">
              Visit{" "}
              <Link
                to="/e-com"
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Our Store
              </Link>{" "}
              to explore our offerings!
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Idea;
