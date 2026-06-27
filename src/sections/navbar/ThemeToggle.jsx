import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  // ── ☀️/🌙 INITIALIZE STATE FROM LOCALSTORAGE ──
  const [isDark, setIsDark] = useState(() => {
    // If running in an SSR environment (like Next.js), default to true safely
    if (typeof window === "undefined") return true;
    
    const savedTheme = localStorage.getItem("theme");
    // Default to dark theme (true) unless explicitly saved as "light"
    return savedTheme !== "light";
  });
  
  const [themeHover, setThemeHover] = useState(false);

  // ── ☀️/🌙 THEME STATE DETECTOR & PERSISTENCE ──
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((d) => !d)}
      onMouseEnter={() => setThemeHover(true)}
      onMouseLeave={() => setThemeHover(false)}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        cursor: "pointer",
        boxShadow: themeHover
          ? isDark
            ? "0 0 8px 2px var(--shadow-colored)"
            : "0 0 8px 2px rgba(0, 0, 0, 0.15)"
          : "none",
      }}
      className={`relative flex items-center justify-between w-14 md:w-16 h-7 md:h-8 p-1 rounded-full overflow-hidden transition-all duration-300 border-[1.5px] select-none
        [--slide-dist:30px] md:[--slide-dist:34px] 
        ${
          themeHover
            ? "border-[var(--primary)]"
            : isDark
              ? "border-[var(--border-muted)] bg-transparent"
              : "border-[var(--border-muted)] bg-[var(--surface)]"
        }`}
    >
      {/* Icon Display (Sun/Moon Background Layer) */}
      <motion.div
        animate={{ x: isDark ? 0 : "var(--slide-dist)" }}
        transition={{ type: "spring", stiffness: 10000000, damping: 50000 }}
        className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center bg-transparent"
      >
        {isDark ? (
          <FiSun
            className="w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-200"
            style={{ color: themeHover ? "var(--primary)" : "var(--text)" }}
          />
        ) : (
          <FiMoon
            className="w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-200"
            style={{ color: themeHover ? "var(--primary)" : "var(--text)" }}
          />
        )}
      </motion.div>

      {/* Moving Circle (The Switch Slider Ball) */}
      <motion.div
        animate={{ x: isDark ? 0 : "calc(-1 * var(--slide-dist))" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center transition-[box-shadow,background-color] duration-500 z-10 ${
          themeHover ? "bg-[var(--primary)]" : "bg-[var(--text)]"
        }`}
      >
        {isDark ? (
          <FiMoon
            className="w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-300"
            style={{ color: themeHover ? "var(--text)" : "var(--bg)" }}
          />
        ) : (
          <FiSun
            className="w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-300"
            style={{ color: themeHover ? "var(--text-inverted)" : "var(--bg)" }}
          />
        )}
      </motion.div>
    </button>
  );
}