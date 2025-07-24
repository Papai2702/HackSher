import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import styled from "styled-components";
import { useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
const CyberContainer = styled(motion.div)`
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle at 50% 30%, #0a0a0a, #000);
  color: #f0f8ff;
  text-align: center;
  overflow: hidden;
  position: relative;
  padding: 2rem;
  perspective: 1000px;
`;

const GlitchContainer = styled(motion.div)`
  position: relative;
  display: inline-block;
`;

const GlitchEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
  transform: translate(-2px, 2px);
  opacity: 0.8;
  mix-blend-mode: color-dodge;
`;

const CyberTitle = styled(motion.h1)`
  font-size: 4.2rem;
  font-family: "Orbitron", sans-serif;
  font-weight: 800;
  background: linear-gradient(90deg, #a1a1a1, #f0f8ff, #d2b48c);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 8px rgba(240, 248, 255, 0.4);
  margin-top: -1rem;
  margin-bottom: 0.5rem;
  z-index: 3;
  position: relative;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const CyberCode = styled(motion.div)`
  font-family: "Orbitron", sans-serif;
  font-size: 5.5rem;
  font-weight: 800;
  letter-spacing: 1rem;
  color: rgba(240, 248, 255, 0.07);
  z-index: 2;
  position: relative;
  text-shadow: 0 0 15px rgba(240, 248, 255, 0.3);

  @media (max-width: 768px) {
    font-size: 4rem;
    letter-spacing: 0.5rem;
  }
    
`;

const CyberMessage = styled(motion.div)`
  font-size: 2rem;
  font-weight: 700;
  font-family: "Orbitron", sans-serif;
  color: #f0f8ff;
  margin-top: 1.5rem;
  text-shadow: 0 0 10px rgba(240, 248, 255, 0.3);
  z-index: 5;
  line-height: 1.6;
  padding: 0 1rem;
  position: relative;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CyberSubMessage = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 600;
  color: #d3d3d3;
  margin-top: 3.98rem;
  text-shadow: 0 0 3px rgba(240, 248, 255, 0.3);
  z-index: 3;
  position: relative;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-top: 2rem;
  }
`;

const CyberButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  margin-top: 2rem;
  background: linear-gradient(45deg, #f0f8ff, #d2b48c);
  color: #0a0a0a;
  border: none;
  border-radius: 40px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(240, 248, 255, 0.4);
  transition: all 0.3s ease;
  z-index: 2;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 25px rgba(240, 248, 255, 0.7);
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`;

const CyberBot = styled(motion.div)`
  position: absolute;
  width: 80px;
  height: 80px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: drop-shadow(0 0 10px rgba(240,248,255,0.8));
  z-index: 1;
  opacity: 0.6;
  will-change: transform;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const CyberParticle = styled(motion.div)`
  position: absolute;
  background: linear-gradient(45deg, #f0f8ff, #d2b48c);
  border-radius: 50%;
  filter: blur(1px);
  z-index: 0;
  will-change: transform;
`;

const CyberGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(240, 248, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(240, 248, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
  z-index: 0;
`;

const CyberScanline = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: linear-gradient(to bottom, 
    transparent, 
    rgba(240, 248, 255, 0.5), 
    transparent);
  z-index: 4;
  pointer-events: none;
`;

const CyberGlow = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(240, 248, 255, 0.2) 0%, transparent 70%);
  z-index: 1;
  pointer-events: none;
`;

const Cyber404 = () => {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: false });
  const [clicked, setClicked] = useState(false);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Memoized CyberText component to prevent unnecessary re-renders
  const CyberText = useCallback(({ text, glitch = false }) => {
    const [isHovering, setIsHovering] = useState(false);
    
    return (
      <GlitchContainer
        onHoverStart={() => glitch && setIsHovering(true)}
        onHoverEnd={() => glitch && setIsHovering(false)}
      >
        <motion.span
          style={{ display: "inline-block", position: "relative" }}
          animate={{
            y: [0, -5, 0],
            rotateZ: [0, 2, -2, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.1
          }}
        >
          {text}
        </motion.span>
        {glitch && (
          <>
            <GlitchEffect
              initial={{ opacity: 0 }}
              animate={isHovering ? {
                opacity: [0, 0.8, 0],
                x: [0, 2, -2, 0],
                y: [0, -2, 2, 0]
              } : { opacity: 0 }}
              transition={{
                duration: 0.3,
                times: [0, 0.2, 0.8, 1]
              }}
              style={{
                background: "linear-gradient(45deg, #f0f8ff, #d2b48c)"
              }}
            />
            <GlitchEffect
              initial={{ opacity: 0 }}
              animate={isHovering ? {
                opacity: [0, 0.8, 0],
                x: [0, -2, 2, 0],
                y: [0, 2, -2, 0]
              } : { opacity: 0 }}
              transition={{
                duration: 0.3,
                times: [0, 0.2, 0.8, 1]
              }}
              style={{
                background: "linear-gradient(45deg, #d2b48c, #f0f8ff)",
                clipPath: "polygon(0 65%, 100% 65%, 100% 70%, 0 70%)"
              }}
            />
          </>
        )}
      </GlitchContainer>
    );
  }, []);

  // Enhanced bot variants with 3D movement
  const botVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.2, 1],
      x: [0, Math.random() * 300 - 150, 0],
      y: [0, Math.random() * 300 - 150, 0],
      z: [0, Math.random() * 100 - 50, 0],
      rotateX: [0, Math.random() * 360],
      rotateY: [0, Math.random() * 360],
      transition: {
        duration: Math.random() * 15 + 15,
        repeat: Infinity,
        repeatType: "reverse",
        delay: i * 0.3
      }
    })
  };

  // Enhanced particle animation
  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: [0, 0.8, 0],
      scale: [0, Math.random() * 0.8 + 0.5, 0],
      x: [0, Math.random() * 600 - 300],
      y: [0, Math.random() * 600 - 300],
      z: [0, Math.random() * 200 - 100],
      transition: {
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: "reverse",
        delay: i * 0.1
      }
    })
  };

  // SVG data for bots with new color scheme
  const botSvgs = [
    // Robot head
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23f0f8ff' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z'/%3E%3C/svg%3E`,
    // Circuit board
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23d2b48c' viewBox='0 0 24 24'%3E%3Cpath d='M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z'/%3E%3C/svg%3E`,
    // Radar
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23a1a1a1' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-8.06V7h-2v5.06l-3.24 3.24 1.41 1.41L12 13.92l2.83 2.83 1.41-1.41L13 10.94z'/%3E%3C/svg%3E`,
    // Chip
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23f0f8ff' viewBox='0 0 24 24'%3E%3Cpath d='M9 3v18h6V3H9zm4 16h-2V5h2v14z'/%3E%3Cpath d='M5 7H3v10h2V7zm14 0h2v10h-2V7z'/%3E%3C/svg%3E`
  ];

  // Create array of bots
  const bots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    svg: botSvgs[i % botSvgs.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 0.5 + 0.5
  }));

  // Create array of particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100
  }));

  // Matrix rain effect
  const MatrixRain = () => {
    const columns = 20;
    return (
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none"
      }}>
        {Array.from({ length: columns }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: -100,
              left: `${(100 / columns) * i}%`,
              width: `${100 / columns}%`,
              color: "#d2b48c",
              fontSize: "16px",
              writingMode: "vertical-rl",
              textOrientation: "mixed"
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              delay: Math.random() * 5
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <span 
                key={j} 
                style={{ 
                  opacity: Math.random(),
                  color: Math.random() > 0.8 ? "#f0f8ff" : "#d2b48c"
                }}
              >
                {String.fromCharCode(Math.random() * (126 - 33) + 33)}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    );
  };

  return (<>
    <CyberContainer
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        rotateX,
        rotateY
      }}
    >
      {/* Background elements */}
      <CyberGrid />
      <CyberGlow 
        animate={{
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <MatrixRain />
      
      <AnimatePresence>
        {bots.map((bot, i) => (
          <CyberBot
            key={bot.id}
            custom={i}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={botVariants}
            style={{
              backgroundImage: `url("${bot.svg}")`,
              top: `${bot.y}%`,
              left: `${bot.x}%`,
              width: `${bot.size * 80}px`,
              height: `${bot.size * 80}px`,
              filter: `drop-shadow(0 0 ${bot.size * 10}px rgba(240,248,255,0.8))`
            }}
          />
        ))}
        
        {particles.map((particle, i) => (
          <CyberParticle
            key={particle.id}
            custom={i}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={particleVariants}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.y}%`,
              left: `${particle.x}%`,
              borderRadius: `${particle.size}px`
            }}
          />
        ))}
      </AnimatePresence>

      <CyberScanline
        animate={{
          y: [0, window.innerHeight],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Content */}
      <div ref={ref} style={{ position: 'relative', zIndex: 10 }}>
        <CyberCode
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { 
            scale: 1, 
            opacity: 0.07,
            textShadow: "0 0 15px rgba(240, 248, 255, 0.3)"
          } : {}}
          transition={{ 
            duration: 0.8, 
            delay: 0.2
          }}
        >
          404
        </CyberCode>

        <CyberTitle
          initial={{ y: -50, opacity: 0 }}
          animate={inView ? { 
            y: 0, 
            opacity: 1,
            backgroundPosition: "100% center"
          } : {}}
          transition={{ 
            type: "spring", 
            damping: 10, 
            delay: 0.4,
            backgroundPosition: {
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          404 <br /> <CyberText text="Bots Not Found" glitch />
        </CyberTitle>

        <CyberMessage
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ type: "spring", damping: 10, delay: 0.6 }}
        >
          We provide Ideas & Solutions
          <br />
          along with Faith — not just Emotionless Robots.
        </CyberMessage>

        <CyberSubMessage
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Let's redefine intelligence with emotion, ethics & innovation.
        </CyberSubMessage>

        <CyberButton
          initial={{ scale: 0.7, opacity: 0 }}
          animate={inView ? { 
            scale: 1, 
            opacity: 1,
            boxShadow: "0 0 15px rgba(240, 248, 255, 0.4)"
          } : {}}
          transition={{ 
            type: "spring", 
            damping: 6, 
            delay: 1
          }}
          whileHover={{ 
            scale: 1.05, 
            y: -2,
            background: "linear-gradient(45deg, #a1a1a1, #d2b48c)",
            boxShadow: "0 0 25px rgba(210, 180, 140, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setClicked(!clicked)}
        >
          {clicked ? "System Rebooting..." : "Explore Our Bots"}
        </CyberButton>
      </div>
    </CyberContainer>
</>
  );
};
export default Cyber404;