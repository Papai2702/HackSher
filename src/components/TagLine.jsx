import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const lines = [
  "We create meaningful digital experiences,",
  "that connect brands with people",
  "through thoughtful design and technology.",
];

const HeroMessage = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return; // Disable animation on mobile

    const chars = containerRef.current.querySelectorAll(".char");
    const totalChars = chars.length;

    gsap.set(chars, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 2}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    chars.forEach((char, i) => {
      tl.to(
        char,
        {
          opacity: 1,
          duration: 0.05,
          ease: "power1.inOut",
        },
        `+=0.03`
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 min-h-screen w-screen relative"
    >
      <div
        ref={containerRef}
        className="absolute w-screen left-0 top-1/2 -translate-y-1/2 text-black p-2.5 font-semibold  max-w-screen"
        style={{ whiteSpace: " ", wordBreak: "break-word" }}
      >
        {lines.map((line, i) => (
          <p
            key={i}
            className="mb-3"
            style={{ fontSize: "clamp(1.5rem, 6vw, 3rem)", lineHeight: "1.6" }}
          >
            {line.split(" ").map((word, wi) => (
              <span key={wi} className="inline-block mr-4.5">
                {word.split("").map((char, j) => (
                  <span key={j} className="char inline-block">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
};

export default HeroMessage;