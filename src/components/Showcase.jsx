import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import proj3 from "../assets/proj3.mp4";
import proj2 from "../assets/proj2.mp4";
import proj from "../assets/proj.mp4";

const Showcase = () => {
  const containerRef = useRef(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scaleBottom = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0]);

  return (
    <div className="showcase" ref={containerRef}>
      {!isMobile && (
        <motion.div className="title-overlay" style={{ opacity: glow }}>
          <h2 style={{ mixBlendMode: "difference" }}>Our Creative Vision</h2>
          <p style={{ mixBlendMode: "difference" }}>
            Explore the possibilities
          </p>
        </motion.div>
      )}

      <div id="top">
        {/* Video Box 1 */}
        <motion.div
          id="box1"
          className="video-container"
          whileHover={{
            scale: isMobile ? 1 : 1.05,
            zIndex: 2,
          }}
          onHoverStart={() => !isMobile && setHoveredVideo(1)}
          onHoverEnd={() => !isMobile && setHoveredVideo(null)}
          style={{ y: isMobile ? 0 : y1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="gradient-border-wrapper">
            <motion.div
              className="gradient-border"
              initial={{ opacity: 0 }}
              whileHover={{
                opacity: isMobile ? 0 : 1,
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

          {isMobile ? (
            <div className="mobile-caption glassmorphism">
              <h3>Digital Innovation</h3>
              <p>Cutting-edge solutions</p>
            </div>
          ) : (
            <AnimatePresence>
              {hoveredVideo === 1 && (
                <motion.div
                  className="video-caption"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  style={{ mixBlendMode: "difference" }}
                >
                  <h3>Digital Innovation</h3>
                  <p>Cutting-edge solutions</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Video Box 2 */}
        <motion.div
          id="box2"
          className="video-container"
          whileHover={{
            scale: isMobile ? 1 : 1.05,
            zIndex: 2,
          }}
          onHoverStart={() => !isMobile && setHoveredVideo(2)}
          onHoverEnd={() => !isMobile && setHoveredVideo(null)}
          style={{ y: isMobile ? 0 : y2 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="gradient-border-wrapper">
            <motion.div
              className="gradient-border"
              initial={{ opacity: 0 }}
              whileHover={{
                opacity: isMobile ? 0 : 1,
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

          {isMobile ? (
            <div className="mobile-caption glassmorphism">
              <h3>Immersive Experiences</h3>
              <p>Engaging interactions</p>
            </div>
          ) : (
            <AnimatePresence>
              {hoveredVideo === 2 && (
                <motion.div
                  className="video-caption"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  style={{ mixBlendMode: "difference" }}
                >
                  <h3>Immersive Experiences</h3>
                  <p>Engaging interactions</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      <motion.div id="bottom" style={{ scale: isMobile ? 1 : scaleBottom }}>
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
        {!isMobile && (
          <motion.div
            className="interaction-prompt"
            animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ mixBlendMode: "difference" }}
          >
            Scroll to explore ↓
          </motion.div>
        )}
      </motion.div>

      {isMobile && (
        <div className="mobile-title glassmorphism">
          <h2>Our Creative Vision</h2>
          <p>Explore the possibilities</p>
        </div>
      )}

      <style jsx>{`
        .showcase {
          width: 100%;
          overflow: hidden;
        }

        .video-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          width: 100%;
          margin-bottom: ${isMobile ? "24px" : "0"};
        }

        .gradient-border-wrapper {
          position: relative;
          display: inline-block;
          width: 100%;
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

        .show-video,
        .hero-video {
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

        /* Mobile specific styles */
        .mobile-caption {
          margin-top: 16px;
          padding: 20px;
          border-radius: 16px;
          width: 100%;
          color: #fff;
        }

        .mobile-title {
          margin-top: 32px;
          padding: 24px;
          border-radius: 20px;
          text-align: center;
          color: #fff;
        }

        .glassmorphism {
          background: linear-gradient(
            135deg,
            rgba(98, 0, 234, 0.2),
            rgba(236, 64, 122, 0.2)
          );
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .glassmorphism h2,
        .glassmorphism h3 {
          color: #ffffff;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .glassmorphism p {
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          font-size: 0.9em;
        }

        /* Gradient border for mobile to maintain visual interest */
        .mobile-caption {
          position: relative;
        }

        .mobile-caption::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ff00cc, #3333ff, #00ccff);
          border-radius: 18px;
          z-index: -1;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default Showcase;
