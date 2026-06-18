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
      initial={{ opacity: 0, x: -64 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -64 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-[300px] h-[300px] md:w-[366px] md:h-[366px]"
    >
      {/* Pulsing glow ring */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0px 0px var(--primary-00)",
            "0 0 36px 4px var(--border-2E)",
            "0 0 0px 0px var(--primary-00)",
          ],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[-10px] border-[0.5px] border-[var(--border-2E)]"
      />

      {/* ── Image frame — GlareHover wraps the entire square ── */}
      <GlareHover
        width="100%"
        height="100%"
        background="var(--surface-05)"
        borderColor="var(--primary-59)"
        glareColor="#4FC3F7"
        glareOpacity={0.12}
        glareAngle={-45}
        glareSize={300}
        transitionDuration={700}
        className="aspect-square border-[0.5px] border-[var(--primary-59)] relative"
      >
        <CornerBrackets color="var(--primary)" size="14" strokeWidth="1.2" />

        <img
          src={profileImage1}
          alt="John Benedict Gala - Computer Engineering Student"
          className="w-full h-full object-cover block brightness-[0.85] contrast-[1.1] scale-[0.8]"
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black from-0% to-transparent to-70% pointer-events-none" />

        {/* Name tag */}
        <div className="absolute bottom-[16px] left-[16px] right-[16px]">
          <div
            className="text-[8px] text-[var(--disabled)] tracking-[0.14em] mb-[3px]"
            style={{
              fontFamily: "var(--font-mono)",
            }}
          >
            // PROFILE_IMG
          </div>
          <div
            className="text-[14px] text-[var(--text)] tracking-[0.14em]"
            style={{
              fontFamily: "var(--font-barl)",
            }}
          >
            JOHN BENEDICT M. GALA
          </div>
        </div>

        {/* Scan line — opacity + translateY, GPU-composited */}
        <motion.div
          initial={{ y: -5 }} 
          animate={{ y: [-5, 370, -5] }} 
          transition={{
            duration: 7.0, 
            repeat: Infinity,
            ease: "linear", 
            repeatDelay: 2.5, 
          }}
          className="absolute top-0 left-0 right-0 h-px pointer-events-none will-change-transform"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--primary-C2), transparent)",
          }}
        />
      </GlareHover>

      <Availability style={{ top: "-14px", right: "-14px" }} />

      {/* Measurement annotation */}
      <div
        className="absolute right-[-44px] top-1/2 -translate-y-1/2 rotate-90 text-[8px] text-[var(--disabled)] tracking-[0.16em] whitespace-nowrap"
        style={{
          fontFamily: "var(--font-mono)",
        }}
      >
        320×320 · 1:1
      </div>
    </motion.div>
  );
}
