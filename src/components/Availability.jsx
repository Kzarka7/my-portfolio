import { motion } from "framer-motion";

export default function Availability({ className = "", style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      style={{
        ...style
      }}
      className={`absolute flex items-center gap-[7px] bg-[var(--surface-secondary)] border-[0.5px] border-[var(--border-secondary)] p-[6px_12px] backdrop-blur-[8px] ${className}`}
    >
      {/* 🔮 Pulsing Radar Status Dot Indicator */}
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_6px_var(--primary)] block shrink-0"
      />
      
      {/* System Availability Text Log */}
      <span
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-[9px] text-[var(--primary)] tracking-[0.1em] whitespace-nowrap"
      >
        OPEN TO INTERNSHIP
      </span>
    </motion.div>
  );
}