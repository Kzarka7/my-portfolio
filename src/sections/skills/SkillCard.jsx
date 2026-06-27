import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CornerBrackets from "../../components/CornerBrackets";

export default function SkillCard({ skill, index }) {
  const [hov, setHov] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const Icon = skill.icon;

  // Track viewport dimensions and active theme changes
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    
    // Check light mode status by reading document classes
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };

    checkMobile();
    checkTheme();

    // Listen for theme toggles if your app dispatches mutations on the HTML element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, []);

  // Determine if the card should showcase the full-color accent treatment
  const isHighlighted = hov || isMobile;

  // 🟢 ADJUST BRIGHTNESS FOR LIGHT MODE ACCESSIBILITY
  const getAdaptiveColor = (hexColor) => {
    if (!isLight) return hexColor;
    
    const upperHex = hexColor.toUpperCase();
    
    // 1. Invert pure white (Framer Motion) directly to deep charcoal text color
    if (upperHex === "#FFFFFF" || upperHex === "#FFF") return "#111827";
    
    // 2. Safely lower brightness for problematic bright tech colors in light mode
    const colorMap = {
      "#F7DF1E": "#D4AF37", // JavaScript Yellow -> Deep Rich Amber/Gold
      "#61DAFB": "#0284C7", // React Light Cyan -> Deep Sky Blue
      "#06B6D4": "#0891B2", // Tailwind Cyan -> Darker Cyan
    };

    return colorMap[upperHex] || hexColor;
  };

  const activeColor = getAdaptiveColor(skill.color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => !isMobile && setHov(true)}
      onMouseLeave={() => !isMobile && setHov(false)}
      style={{
        border: isHighlighted
          ? `1px solid ${activeColor}66` 
          : "0.5px solid var(--border-primary)",
        background: isHighlighted 
          ? "var(--surface-secondary)" 
          : "var(--surface)",
        boxShadow: "0 4px 12px var(--shadow-card)",
      }}
      className="relative flex flex-col gap-3.5 p-6 transition-all duration-250 ease-out select-none"
    >
      {/* Corner brackets */}
      <CornerBrackets
        color={isHighlighted ? activeColor : "var(--primary)"}
        size="10"
        strokeWidth="0.8"
      />

      {/* Accent line */}
      <div
        style={{
          background: activeColor,
          transform: isHighlighted ? "scaleX(1)" : "scaleX(0)",
        }}
        className="absolute top-0 left-0 right-0 h-[1.5px] origin-left transition-transform duration-500 ease-in-out"
      />

      {/* Icon & Content Row Container */}
      <div className="flex items-center gap-3.5">
        {/* Icon Frame Wrapper */}
        <div
          style={{
            border: isHighlighted
              ? `0.5px solid ${activeColor}44`
              : "1.5px solid var(--border-primary)",
            background: isHighlighted
              ? "var(--surface-tertiary)" 
              : "var(--surface-secondary)",
          }}
          className="w-12 h-12 flex items-center justify-center shrink-0 transition-all duration-250"
        >
          <Icon
            style={{ color: isHighlighted ? activeColor : "var(--text)" }}
            className="text-[24px]"
          />
        </div>

        {/* Text Details Block */}
        <div className="min-w-0">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--text)", 
            }}
            className="text-[14px] font-bold tracking-tight truncate"
          >
            {skill.name}
          </div>

          <div
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-caption)", 
            }}
            className="text-[13px] leading-snug mt-0.5 line-clamp-2"
          >
            {skill.desc}
          </div>
        </div>
      </div>

      {/* Animated Proficiency Bar */}
      <div className="h-[2px] bg-[var(--border-muted)] overflow-hidden w-full mt-auto">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: false }}
          transition={{
            duration: 0.8,
            delay: index * 0.06,
          }}
          style={{
            background: isHighlighted ? activeColor : "var(--border-secondary)",
          }}
          className="h-full"
        />
      </div>
    </motion.div>
  );
}