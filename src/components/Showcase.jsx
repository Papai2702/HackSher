import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import proj3 from '../assets/proj3.mp4';
import proj2 from '../assets/proj2.mp4';
import proj from '../assets/proj.mp4';

const Showcase = () => {
  const containerRef = useRef(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scaleBottom = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0]);

  return (
    <div className='showcase' ref={containerRef}>
      <motion.div 
        className="title-overlay"
        style={{ opacity: glow }}
      >
        <h2 style={{ mixBlendMode: 'difference' }}>Our Creative Vision</h2>
        <p style={{ mixBlendMode: 'difference' }}>Explore the possibilities</p>
      </motion.div>

      <div id="top">
        {/* Video Box 1 */}
        <motion.div 
          id="box1"
          className="video-container"
          whileHover={{ 
            scale: 1.05, 
            zIndex: 2,
          }}
          onHoverStart={() => setHoveredVideo(1)}
          onHoverEnd={() => setHoveredVideo(null)}
          style={{ y: y1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="gradient-border-wrapper">
            <motion.div
              className="gradient-border"
              initial={{ opacity: 0 }}
              whileHover={{ 
                opacity: 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <video
              className="show-video"
              src={proj2}
              autoPlay
              loop
              muted
              playsInline
              loading="lazy"
              preload="none"
            />
          </div>
          <AnimatePresence>
            {hoveredVideo === 1 && (
              <motion.div 
                className="video-caption"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={{ mixBlendMode: 'difference' }}
              >
                <h3>Digital Innovation</h3>
                <p>Cutting-edge solutions</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Video Box 2 */}
        <motion.div 
          id="box2"
          className="video-container"
          whileHover={{ 
            scale: 1.05, 
            zIndex: 2,
          }}
          onHoverStart={() => setHoveredVideo(2)}
          onHoverEnd={() => setHoveredVideo(null)}
          style={{ y: y2 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="gradient-border-wrapper">
            <motion.div
              className="gradient-border"
              initial={{ opacity: 0 }}
              whileHover={{ 
                opacity: 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <video
              className="show-video"
              src={proj3}
              autoPlay
              loop
              muted
              playsInline
              loading="lazy"
              preload="none"
            />
          </div>
          <AnimatePresence>
            {hoveredVideo === 2 && (
              <motion.div 
                className="video-caption"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={{ mixBlendMode: 'difference' }}
              >
                <h3>Immersive Experiences</h3>
                <p>Engaging interactions</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <motion.div 
        id="bottom"
        style={{ scale: scaleBottom }}
      >
        <video
          className="hero-video"
          src={proj}
          autoPlay
          loop
          muted
          playsInline
          loading="lazy"
          preload="none"
        />
        <motion.div 
          className="interaction-prompt"
          animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ mixBlendMode: 'difference' }}
        >
          Scroll to explore ↓
        </motion.div>
      </motion.div>

      <style jsx>{`
        .video-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .gradient-border-wrapper {
          position: relative;
          display: inline-block;
        }
        
        .gradient-border {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ff00cc, #3333ff, #00ccff);
          border-radius: 14px;
          z-index: -1;
          padding: 2px;
        }
        
        .show-video {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 12px;
        }
        
        .video-caption h3,
        .video-caption p,
        .title-overlay h2,
        .title-overlay p,
        .interaction-prompt {
          color: white;
          mix-blend-mode: difference;
        }
      `}</style>
    </div>
  );
};

export default Showcase;