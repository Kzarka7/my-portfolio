import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import profileImage1 from "../../assets/profile-image.png";
import CornerBrackets from "../../components/CornerBrackets";
import Availability from "../../components/Availability";
import GlareHover from "../../components/GlareHover";

export default function ProfileImage() {
  const heroRef = useRef(null);

  const isInView = useInView(heroRef, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={heroRef}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative" }}
    >
      {/* Pulsing glow ring */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0px 0px var(--primary-00)",
            "0 0 28px 4px var(--border-2E)",
            "0 0 0px 0px var(--primary-00)",
          ],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: "-10px",
          border: "0.5px solid var(--border-2E)",
          pointerEvents: "none",
        }}
      />

      {/* ── Image frame — GlareHover wraps the entire square ── */}
      <GlareHover
        width="366px"
        height="366px"
        background="var(--surface-05)"
        borderColor="var(--primary-59)"
        glareColor="#4FC3F7"
        glareOpacity={0.12}
        glareAngle={-45}
        glareSize={300}
        transitionDuration={700}
        style={{ aspectRatio: "1 / 1", border: "0.5px solid var(--primary-59)", position: "relative" }}
      >
        <CornerBrackets color="var(--primary)" size="14" strokeWidth="1.2" />

        <img
          src={profileImage1}
          alt="Profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.85) contrast(1.1)",
            scale: "0.8",
          }}
        />

        {/* Bottom gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "60%",
            background: "linear-gradient(to top, rgb(0,0,0) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Name tag */}
        <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "8px",
            color: "var(--disabled)",
            letterSpacing: "0.14em",
            marginBottom: "3px",
          }}>
            // PROFILE_IMG
          </div>
          <div style={{
            fontFamily: "var(--font-barl)",
            fontSize: "12px",
            color: "var(--text)",
            letterSpacing: "0.14em",
          }}>
            JOHN BENEDICT M. GALA
          </div>
        </div>

        {/* Scan line — opacity + translateY, GPU-composited */}
        <motion.div
          animate={{ y: ["-2px", "102%", "-2px"] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2.5,
          }}
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--primary-C2), transparent)",
            pointerEvents: "none",
            willChange: "transform",
          }}
        />
      </GlareHover>

      <Availability style={{ top: "-14px", right: "-14px" }} />

      {/* Measurement annotation */}
      <div
        style={{
          position: "absolute",
          right: "-44px",
          top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          fontFamily: "var(--font-mono)",
          fontSize: "8px",
          color: "var(--disabled)",
          letterSpacing: "0.16em",
          whiteSpace: "nowrap",
        }}
      >
        320×320 · 1:1
      </div>
    </motion.div>
  );
}