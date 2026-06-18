import { useState } from "react";
import { motion } from "framer-motion";

export default function EducationCard({ education, index }) {
  const [hov, setHov] = useState(false);
  const Icon = education.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="grid grid-cols-[48px_1fr] gap-3 md:gap-5 md:px-5 py-6 border-b border-[var(--border-3D)] cursor-pointer relative"
    >
      {/* Interactive indicator bar pinned to the left edge */}
      <span
        style={{
          backgroundColor: education.color,
          transform: hov ? "scaleY(1)" : "scaleY(0)",
        }}
        className="hidden md:block absolute left-0 top-0 bottom-0 w-[2px] origin-top transition-transform duration-300 ease-in-out"
      />

      {/* Timeline Column (Icon Container + Connecting Line) */}
      <div className="flex flex-col items-center gap-2">
        <div
          style={{
            borderColor: hov ? education.color : "var(--border-3D)",
            backgroundColor: hov ? "var(--surface-0D)" : "transparent",
          }}
          className="w-10 h-10 border-[0.5px] flex items-center justify-center shrink-0 transition-all duration-250"
        >
          <Icon
            style={{
              color: hov ? education.color : "var(--text-gray)",
            }}
            className="text-[16px] transition-colors duration-250"
          />
        </div>

        {/* ── 🛠️ ANIMATED TIMELINE CONNECTOR LINE ── */}
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false }}
          /* Synchronized with the card slide reveal or custom tuned */
          transition={{ duration: 0.6, ease: "easeInOut", delay: (index * 0.12) + 0.2 }}
          style={{ transformOrigin: "top" }}
          className="w-[0.5px] flex-1 bg-[var(--muted)] min-h-[20px]"
        />
      </div>

      {/* Content Metadata Block */}
      <div className="flex flex-col w-full">
        {/* Badges / Header Row */}
        <div className="flex items-center gap-3 mb-1.5">
          {/* Degree / Certificate Type Badge */}
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[11px] text-[var(--primary-C2)] border border-[var(--border-2E)] px-2 py-[2px] tracking-[0.14em]"
          >
            {education.type}
          </span>

          {/* Enrollment Status Badge */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              borderColor: education.status === "ONGOING" ? "var(--border-67)" : "var(--border-3D)",
              color: education.status === "ONGOING" ? "var(--primary)" : "var(--text-gray)",
            }}
            className="text-[11px] bg-[var(--surface-blue-05)] border-[0.5px] px-2 py-[2px] tracking-[0.1em]"
          >
            {education.status}
          </span>

          {/* Timeline Year Tracker */}
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[11px] text-[var(--text-gray)] tracking-[0.1em] ml-auto"
          >
            {education.year}
          </span>
        </div>

        {/* Course / Program Title */}
        <h3
          style={{ fontFamily: "var(--font-mono)" }}
          className={`text-[18px] font-bold mb-1 tracking-[-0.01em] transition-colors duration-200 ${
            hov ? "text-[var(--text)]" : "text-[var(--text-gray)]"
          }`}
        >
          {education.title}
        </h3>

        {/* School / Institution Name */}
        <div
          style={{
            fontFamily: "var(--font-barl)",
          }}
          className={`text-[18px] font-medium tracking-[0.08em] uppercase mb-2.5 ${
            hov ? "text-[var(--primary)]" : "text-[var(--primary-C2)]"
          }`}
        >
          {education.institution}
        </div>

        {/* Description Details paragraph */}
        <p
          style={{ fontFamily: "var(--font-body)" }}
          className="text-[15px] text-[var(--text-gray)] leading-[1.7] font-light"
        >
          {education.desc}
        </p>
      </div>
    </motion.div>
  );
}