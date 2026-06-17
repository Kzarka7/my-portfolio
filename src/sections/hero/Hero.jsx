import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { info } from "../../data/portfolio";
import Button from "../../components/Button";
import ProfileImage from "./ProfileImage";

export default function Hero() {
  const heroRef = useRef(null);

  const isInView = useInView(heroRef, {
    once: false,
    amount: 0.2,
  });

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <section
      ref={heroRef}
      id="about"
      className="relative flex items-center min-h-screen mx-4 z-[1] mt-[120px] lg:mt-0"
    >
      <div className="flex flex-col lg:flex-row items-center justify-around w-full max-w-[1200px] mx-auto gap-[36px] lg:gap-0">
        
        {/* LEFT IMAGE */}
        <ProfileImage />

        {/* RIGHT CONTENT */}
        <div className="text-center lg:text-left">
          <motion.div
            {...fade(0)}
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[10px] text-[var(--disabled)] tracking-[0.12em] mb-5"
          >
            X: 0000 / Y: 0000 / SECTOR_INIT
          </motion.div>

          <motion.div
            {...fade(0.1)}
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[12px] text-[var(--primary-C2)] tracking-[0.16em] uppercase flex items-center justify-center lg:justify-start gap-[10px] mb-4"
          >
            <span className="w-6 h-[0.5px] bg-[var(--primary)]" />
            {info.role}
          </motion.div>

          <motion.h1
            {...fade(0.18)}
            style={{ fontFamily: "var(--font-mono)" }}
            className="font-bold text-[var(--text)] text-[clamp(44px,5vw,54px)] leading-[1.08] tracking-[-0.02em] mb-2.5"
          >
            {info.name.split(" ")[0]}
            <br />
            <span className="text-[var(--primary)]">BENEDICT M. GALA</span>
          </motion.h1>

          <motion.p
            {...fade(0.26)}
            style={{ fontFamily: "var(--font-barl)" }}
            className="uppercase text-[var(--muted)] font-medium text-[17px] tracking-[0.2em] mb-[22px]"
          >
            {info.tagline}
          </motion.p>

          {/* 🟢 BIO PARAGRAPH CONVERTED */}
          <motion.p
            {...fade(0.32)}
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[14px] text-[#cbcbcb] leading-[1.75] max-w-[600px] mb-8 font-light"
          >
            {info.bio}
          </motion.p>

          {/* 🟢 BUTTONS WRAPPER CONVERTED */}
          <motion.div
            {...fade(0.4)}
            className="flex gap-3 flex-wrap items-center justify-center"
          >
            <Button variant="solid" href="#projects">
              VIEW PROJECTS
            </Button>
            <Button variant="ghost" href="#contact">
              GET IN TOUCH
            </Button>
            <Button variant="pill-resume" href="/resume.pdf" download>
              DOWNLOAD RESUME
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}