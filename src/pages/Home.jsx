import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
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
                repeatType: "reverse",
              },
            },
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const App = () => {
  const [opacity, setOpacity] = useState(0);
  const tagLineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!tagLineRef.current) return;
      const rect = tagLineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate the opacity based on position in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleRatio = 1 - rect.top / windowHeight;
        setOpacity(Math.max(0, Math.min(visibleRatio, 1)));
      } else {
        setOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <Hero>
        <TickerText text="Your Hero Text Here" />
      </Hero>

      <motion.div ref={tagLineRef} style={{ opacity }}>
        <TagLine>
          <TickerText text="Your Tagline Text Here" />
        </TagLine>
      </motion.div>

      <Showcase />
      <Menu />
      <Flow />
      <About className="About" />
      <TagLine2 />
      <Idea />
      <IntroVideo />
    </div>
  );
};

export default App;