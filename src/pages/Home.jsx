import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import TagLine from "../components/TagLine";
import Menu from "../components/Menue";
import Flow from "../components/Flow";
import TagLine2 from "../components/TagLine2";
import Idea from "../components/Idea";
import IntroVideo from "../components/IntroVideo";
import Showcase from "../components/Showcase";
import About from "../components/About";


// Ticker component for text hover effect
const TickerText = ({ text }) => {
  const letters = Array.from(text);
  
  return (
    <motion.span
      whileHover="hover"
      style={{ display: "inline-block", whiteSpace: "nowrap" }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          variants={{
            hover: {
              y: [0, -10, 0],
              transition: {
                duration: 0.5,
                delay: i * 0.02,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const App = () => {
  return (
    <div className="App">
      {/* Add the custom cursor */}
      {/* <Cursor /> */}
      
      {/* Example of using TickerText in your components */}
      <Hero>
        {/* You can wrap any text with TickerText */}
        <TickerText text="Your Hero Text Here" />
      </Hero>
      
      <TagLine>
        <TickerText text="Your Tagline Text Here" />
      </TagLine>
      
      <Showcase />
      <Menu />
      <Flow />
      <About className="About"/>
      <TagLine2 />
      <Idea />
      <IntroVideo />
    </div>
  );
};

export default App;