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
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",

          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* LEFT IMAGE (restored, unchanged structure feel) */}
        <ProfileImage />

        {/* RIGHT */}
        <div>
          <motion.div
            {...fade(0)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--disabled)",
              letterSpacing: "0.12em",
              marginBottom: "20px",
            }}
          >
            X: 0000 / Y: 0000 / SECTOR_INIT
          </motion.div>

          <motion.div
            {...fade(0.1)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--primary-C2)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{ width: "24px", height: "0.5px", background: "#4FC3F7" }}
            />
            {info.role}
          </motion.div>

          <motion.h1
            {...fade(0.18)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(36px, 5vw, 54px)",
              fontWeight: 700,
              color: "#e8e8e8",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "10px",
            }}
          >
            {info.name.split(" ")[0]}
            <br />
            <span style={{ color: "#4FC3F7" }}>BENEDICT M. GALA</span>
          </motion.h1>

          <motion.p
            {...fade(0.26)}
            style={{
              fontFamily: "var(--font-barl)",
              fontSize: "17px",
              fontWeight: 500,
              color: "#676767",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "22px",
            }}
          >
            {info.tagline}
          </motion.p>

          <motion.p
            {...fade(0.32)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              color: "#cbcbcb",
              lineHeight: 1.75,
              maxWidth: "600px",
              marginBottom: "32px",
              fontWeight: 300,
            }}
          >
            {info.bio}
          </motion.p>

          <motion.div
            {...fade(0.4)}
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
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
