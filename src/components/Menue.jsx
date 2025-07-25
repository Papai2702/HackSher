import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Animations
const glitch = keyframes`
  0% { transform: translate(0) }
  20% { transform: translate(-3px, 3px) }
  40% { transform: translate(-3px, -3px) }
  60% { transform: translate(3px, 3px) }
  80% { transform: translate(3px, -3px) }
  100% { transform: translate(0) }
`;

const slideUp = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  60% { transform: translateY(-10%); opacity: 0.5; }
  100% { transform: translateY(0); opacity: 1; }
`;

// Container Components
const MenuContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 3rem 1.5rem;
  background: #0d0d0d;
  min-height: 100vh;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 0, 204, 0.05) 0%,
      transparent 70%
    );
    z-index: 0;
  }

  @media (min-width: 768px) {
    padding: 5rem 3rem;
  }
`;

// Menu Item Components
const MenuItem = styled(motion.div)`
  position: relative;
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffffcc;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 1rem 0;
  padding: 1.5rem 2rem;
  border: 1px solid #1a1a1a;
  border-radius: 14px;
  background: #131313;
  transition: all 0.4s ease;
  overflow: hidden;
  z-index: 1;

  &:hover {
    background: #1f1f1f;
    box-shadow: 0 0 25px rgba(255, 0, 204, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 0, 204, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::after {
    transform: translateX(0);
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin: 2rem 0;
    padding: 2rem 3rem;
  }
`;

const TextWrapper = styled.div`
  display: inline-block;
  height: 2.2rem;
  overflow: hidden;
  position: relative;

  @media (min-width: 768px) {
    height: 2.8rem;
  }
`;

const AnimatedText = styled(motion.div)`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.animate &&
    css`
      animation: ${slideUp} 0.5s ease forwards, ${glitch} 0.6s linear 0.5s;
    `}
`;

const InnerText = styled.div`
  height: 2.2rem;
  line-height: 2.2rem;
  color: #ffffffee;
  position: relative;

  &:nth-child(2) {
    color: #ff00cc;
  }

  @media (min-width: 768px) {
    height: 2.8rem;
    line-height: 2.8rem;
  }
`;

const Arrow = styled(motion.span)`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  transition: all 0.4s ease;
  background-color: #ffffff15;
  border: 1px solid #ffffff30;
  border-radius: 50%;
  padding: 0.4rem;
  color: #ffffffcc;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #ff00cc;
    opacity: 0;
    transition: all 0.4s ease;
  }

  ${MenuItem}:hover & {
    transform: translateY(-50%) translateX(6px) rotate(45deg);
    background-color: #ff00cc20;
    border-color: #ff00cc50;

    &::before {
      opacity: 1;
      transform: scale(1.3);
    }
  }

  @media (min-width: 768px) {
    right: 2rem;
    font-size: 1.6rem;
    padding: 0.6rem;
    width: 2.6rem;
    height: 2.6rem;
  }
`;

const HoverParticles = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: -1;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      rgba(255, 0, 204, 0.1) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  ${MenuItem}:hover &::before {
    opacity: 1;
  }
`;

// Main Component
const Menu = () => {
  const menuItems = [
    { label: "Store-4o4", path: "/e-com" },
    { label: "About.US", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Doc'S", path: "/comingsoon" },
  ];
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <MenuContainer className="menu-container">
      {menuItems.map((item, index) => (
        <Link to={item.path} style={{ textDecoration: "none" }} key={index}>
          <MenuItem
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <HoverParticles />
            <TextWrapper>
              <AnimatedText animate={hoveredIndex === index}>
                <InnerText>{item.label}</InnerText>
                <InnerText>{item.label}</InnerText>
              </AnimatedText>
            </TextWrapper>
            <Arrow>→</Arrow>
          </MenuItem>
        </Link>
      ))}
    </MenuContainer>
  );
};

export default Menu;
