import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 200vh;
  margin: 10vh 0;
`;

const StickySection = styled(motion.div)`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: transparent;
`;

const TextContainer = styled.div`
  max-width: 1200px;
  padding: 0 40px;
  text-align: center;
`;

const TextLine = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.3;
  font-weight: 600;
  color: #000000;
  margin: 0;
  overflow: hidden;
  text-align: center;

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 6vw, 3rem);
    line-height: 1.2;
  }
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const Character = styled(motion.span)`
  display: inline-block;
  position: relative;
`;

const Highlight = styled(motion.span)`
  color: #0066ff;
  font-weight: 700;
`;

const Cursor = styled(motion.span)`
  display: inline-block;
  width: 2px;
  height: 1em;
  background: #0066ff;
  margin-left: 2px;
  vertical-align: middle;
`;

const TextRevealTagline = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const animationProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const text = "Experience robotics beyond theory — build, learn, and innovate with real tools, smart kits, and custom lab solutions.";
  const words = text.split(" ");
  const highlightWords = ["robotics", "build", "learn", "innovate", "real", "smart", "custom"];

  // Typewriter effect state
  const [visibleChars, setVisibleChars] = React.useState(0);
  const totalChars = text.length;

  // Combine scroll progress with typewriter effect
  useEffect(() => {
    const unsubscribe = animationProgress.onChange((value) => {
      const newVisibleChars = Math.floor(value * totalChars);
      setVisibleChars(newVisibleChars);
      
      // Trigger animations when characters become visible
      if (newVisibleChars > 0) {
        controls.start("visible");
      }
    });

    return () => unsubscribe();
  }, [animationProgress, totalChars, controls]);

  // Check if a character should be visible based on typewriter progress
  const isCharVisible = (wordIndex, charIndex, wordStartIndex) => {
    const charGlobalIndex = wordStartIndex + charIndex;
    return charGlobalIndex < visibleChars;
  };

  // Calculate word start positions for typewriter effect
  let charCount = 0;
  const wordStartIndices = words.map(word => {
    const start = charCount;
    charCount += word.length + 1; // +1 for space
    return start;
  });

  return (
    <Container ref={containerRef}>
      <StickySection>
        <TextContainer>
          <TextLine>
            {words.map((word, wordIndex) => {
              const characters = word.split("");
              const shouldHighlight = highlightWords.includes(word.replace(/[^a-zA-Z]/g, '').toLowerCase());
              const wordStartIndex = wordStartIndices[wordIndex];
              
              return (
                <Word key={wordIndex}>
                  {characters.map((char, charIndex) => {
                    const charVisible = isCharVisible(wordIndex, charIndex, wordStartIndex);
                    
                    return (
                      <Character
                        key={charIndex}
                        initial="hidden"
                        animate={charVisible ? "visible" : "hidden"}
                        variants={{
                          visible: { 
                            opacity: 1,
                            y: 0,
                            transition: {
                              ease: [0.16, 0.77, 0.47, 0.97],
                              duration: 0.5,
                              delay: wordIndex * 0.03 + charIndex * 0.01
                            }
                          },
                          hidden: { 
                            opacity: 0,
                            y: shouldHighlight ? 40 : 20
                          }
                        }}
                      >
                        {shouldHighlight ? (
                          <Highlight>{char === ' ' ? '\u00A0' : char}</Highlight>
                        ) : (
                          char === ' ' ? '\u00A0' : char
                        )}
                      </Character>
                    );
                  })}
                  {/* Add space after each word except last */}
                  {wordIndex < words.length - 1 && (
                    <Character
                      initial="hidden"
                      animate={isCharVisible(wordIndex, characters.length, wordStartIndex) ? "visible" : "hidden"}
                      variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 20 }
                      }}
                    >
                      &nbsp;
                    </Character>
                  )}
                </Word>
              );
            })}
            {/* Blinking cursor at the end of visible text */}
            {visibleChars < totalChars && (
              <Cursor
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </TextLine>
        </TextContainer>
      </StickySection>
    </Container>
  );
};

export default TextRevealTagline;