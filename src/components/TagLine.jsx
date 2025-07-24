import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 300vh;
`;

const StickySection = styled(motion.div)`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  overflow: hidden;
`;

const TextContainer = styled.div`
  // max-width: 1200px;
  padding: 0 40px;
`;

const TextLine = styled(motion.p)`
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.2;
  font-weight: 400;
  color: #000000;
  margin: 0 0 1.5rem 0;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 6vw, 3rem);
    margin-bottom: 1rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Character = styled(motion.span)`
  display: inline-block;
  position: relative;
`;

const TextReveal = ({ lines }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const animationProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <Container ref={containerRef}>
      <StickySection>
        <TextContainer>
          {lines.map((line, lineIndex) => {
            const characters = line.split("");
            return (
              <TextLine key={lineIndex}>
                {characters.map((char, charIndex) => {
                  const charProgress = useTransform(
                    animationProgress,
                    [0, 1],
                    [0, 1],
                    { clamp: false }
                  );

                  return (
                    <Character
                      key={charIndex}
                      style={{
                        opacity: charProgress,
                        y: useTransform(charProgress, [0, 1], [20, 0], {
                          clamp: true
                        })
                      }}
                      transition={{
                        ease: [0.16, 0.77, 0.47, 0.97],
                        duration: 0.5
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </Character>
                  );
                })}
              </TextLine>
            );
          })}
        </TextContainer>
      </StickySection>
    </Container>
  );
};

const TextRevealSection = () => {
  const lines = [
    "We create meaningful digital experiences",
    "that connect brands with people",
    "through thoughtful design and technology."
  ];

  return <TextReveal lines={lines} />;
};

export default TextRevealSection;