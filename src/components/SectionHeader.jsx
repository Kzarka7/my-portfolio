import { motion } from "framer-motion";

export default function SectionHeader({
  number,
  label,
  title,
  highlight,
  description,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7 }}
      /* 🟢 FIXED: Switched from items-center to items-stretch for reliable multi-row scaling */
      className="flex flex-col md:flex-row justify-between items-stretch md:items-end gap-1 md:gap-10 mb-8 text-center md:text-left"
    >
      {/* Left Column Container */}
      <div className="flex-1 min-w-[250px]">
        <div
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[12px] font-medium text-[var(--text-colored)] tracking-[0.16em] uppercase flex items-center justify-center md:justify-start gap-2.5 mb-2"
        >
          <span className="w-5 h-[0.5px] bg-[var(--text-colored)] block" />
          [ {number} ] — {label}
        </div>

        <h2
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[clamp(40px,3.5vw,42px)] font-bold text-[var(--text)] tracking-[-0.02em] leading-[1.1]"
        >
          {title}
          {highlight && (
            <span className="text-[var(--primary)]"> {highlight}</span>
          )}
        </h2>
      </div>

      {/* Right Column Container */}
      {description && (
        <div
          style={{ fontFamily: "var(--font-body)" }}
          /* 🟢 FIXED: Changed alignment logic to sit center on mobile, text-right on desktops, with zero text stretching layout voids */
          className="text-[16px] text-[var(--muted)] text-center
          leading-[1.8] font-light max-w-[580px] 
          md:text-right mt-2 md:mt-0"
        >
          {description}
        </div>
      )}
    </motion.div>
  );
}