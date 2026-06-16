import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "SYSTEM: INITIALIZING CORE PROTOCOLS...",
  "VIRTUAL DOM: CONNECTING DATA DISKS...",
  "METRICS: FETCHING TELEMETRY CHANNEL...",
  "GUI: RENDERING HUD GRAPHICS ACTIVE.",
  "SECURITY: HANDSHAKE SUCCESSFUL.",
];

export default function Preloader({ onComplete }) {
  const [currentLog, setCurrentLog] = useState(0);
  const [progress, setProgress] = useState(0);

  // 🔄 Synchronized: Cycles through the 5 log entries exactly every 800ms
  // (5 logs * 800ms = 4000ms total loop for log printing)
  useEffect(() => {
    if (currentLog < BOOT_LOGS.length - 1) {
      const logTimeout = setTimeout(() => {
        setCurrentLog((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(logTimeout);
    }
  }, [currentLog]);

  // 🔄 Exact Precision: Ticks up to exactly 100% at the 4000ms mark, then holds for 1000ms
  useEffect(() => {
    const totalLoadingTime = 4000; // 4 seconds to climb
    const tickRate = 40; // Update every 40ms for a super smooth progress line
    const totalTicks = totalLoadingTime / tickRate; // 100 ticks total
    const incrementPerTick = 100 / totalTicks; // Exactly 1% per tick

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // ── 🎯 THE FINAL HOLD ──
          // Holds at 100% for exactly 1 second. 4s + 1s = 5 seconds total runtime.
          setTimeout(onComplete, 1000); 
          return 100;
        }
        return Math.min(prev + incrementPerTick, 100);
      });
    }, tickRate);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scaleY: 0.005, // Collapses vertically like an old CRT television screen switching off
        transition: { duration: 0.4, ease: [0.85, 0, 0.15, 1] },
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#06090e",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "var(--font-mono, monospace)",
        overflow: "hidden",
      }}
    >
      {/* Background Matrix Scanning Line Grid Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
          backgroundSize: "100% 4px",
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />

      {/* Main Terminal Shell Layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Terminal Text Log */}
        <div
          style={{ height: "45px", marginBottom: "20px", overflow: "hidden" }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentLog}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.15 }}
              style={{
                fontSize: "12px",
                color: "var(--primary, #00f0ff)",
                letterSpacing: "0.05em",
                margin: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>&gt;&nbsp;{BOOT_LOGS[currentLog]}</span>
              {/* Blinking Terminal Prompt Cursor Block */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  ease: "steps(2)",
                }}
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "14px",
                  background: "var(--primary, #00f0ff)",
                  marginLeft: "6px",
                }}
              />
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Outer Tech Frame Grid */}
        <div
          style={{
            border: "0.5px solid var(--border-2E, #222)",
            padding: "5px",
            position: "relative",
            background: "rgba(0, 240, 255, 0.01)",
          }}
        >
          {/* Tech decorative crosshairs */}
          <div
            style={{
              position: "absolute",
              top: "-3px",
              left: "-3px",
              width: "6px",
              height: "6px",
              borderLeft: "1px solid var(--primary, #00f0ff)",
              borderTop: "1px solid var(--primary, #00f0ff)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-3px",
              right: "-3px",
              width: "6px",
              height: "6px",
              borderRight: "1px solid var(--primary, #00f0ff)",
              borderBottom: "1px solid var(--primary, #00f0ff)",
            }}
          />

          {/* Progress Bar Track */}
          <div
            style={{
              height: "6px",
              background: "rgba(255,255,255,0.01)",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.04 }} // Perfectly synced visual transition matching the speed state
              style={{
                height: "100%",
                background:
                  "linear-gradient(90deg, #0055ff, var(--primary, #00f0ff))",
                boxShadow: "0 0 8px rgba(0, 240, 255, 0.4)",
              }}
            />
          </div>
        </div>

        {/* Counter & Status Display */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            fontSize: "10px",
            color: "var(--text-gray, #888)",
            letterSpacing: "0.1em",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {/* Pulsing online network indicator dot */}
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background:
                  progress === 100 ? "#00ffaa" : "var(--primary, #00f0ff)",
              }}
            />
            SYS_BOOT_SEQUENCE
          </span>
          <span style={{ color: "var(--text, #fff)", fontWeight: "bold" }}>
            {Math.round(progress).toString().padStart(2, "0")}%
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}