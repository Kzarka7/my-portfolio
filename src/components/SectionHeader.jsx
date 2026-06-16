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
      style={{
        display: "flex", // ── Changed from grid to flex ──
        justifyContent: "space-between", // Pushes the description to the right
        alignItems: "flex-end",
        flexWrap: "wrap", // Protects your text layouts on mobile screens
        gap: "40px",
        marginBottom: "40px",
      }}
    >
      {/* Left Column Container */}
      <div style={{ flex: "1 1 auto", minWidth: "250px" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--primary-C2)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "20px",
              height: "0.5px",
              background: "var(--primary-C2)",
              display: "block",
            }}
          />
          [ {number} ] — {label}
        </div>

        <h2
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(26px, 3.5vw, 42px)",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {title}
          {highlight && (
            <span style={{ color: "var(--primary)" }}> {highlight}</span>
          )}
        </h2>
      </div>

      {/* Right Column Container: Renders and takes up space ONLY if description exists */}
      {description && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "var(--muted)",
            lineHeight: 1.8,
            fontWeight: 300,
            textAlign: "end",
            flex: "1 1 400px", // Allows the text content block to scale correctly
            maxWidth: "580px",
            margin: 0,
            display: "flex",
            justifyContent: "end",
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}