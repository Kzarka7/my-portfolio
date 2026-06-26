import { motion } from "framer-motion";

export default function FooterProfile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7 }}
      className="text-center md:text-left"
    >
      {/* ── Profile Brand Header ── */}
      <div
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-[18px] font-bold text-[var(--text)] tracking-[-0.01em] mb-2.5 line-height-[1.2]"
      >
        JOHN
        <span className="text-[var(--primary)]"> BENEDICT M. GALA</span>
      </div>

      {/* ── Professional Academic Metadata ── */}
      <div
        style={{ fontFamily: "var(--font-barl)" }}
        className="text-[14px] text-[var(--text-caption)] tracking-[0.12em] uppercase leading-[1.6]"
      >
        Intern Student
        <br />
        Bachelor of Science in Computer Engineering
        <br />
        Cebu Technological University - Danao Campus
      </div>
    </motion.div>
  );
}