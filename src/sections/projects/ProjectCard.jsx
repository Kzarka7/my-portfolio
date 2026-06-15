import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CornerBrackets from "../../components/CornerBrackets";
import TiltedCard from "../../components/TiltedCard";

/* ── Slide variants — opacity + x only, GPU composited ── */
const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProjectCard({ project, direction }) {
  const [githubHov, setGithubHov] = useState(false);
  const [liveHov, setLiveHov] = useState(false);
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      /* y-only lift — GPU composited, no layout reflow */
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", willChange: "transform" }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          onHoverStart={() => setHov(true)}
          onHoverEnd={() => setHov(false)}
          key={project.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            border: hov
              ? "0.5px solid var(--border-67)"
              : "0.5px solid var(--border-2E)",
            background: "var(--surface)",
            position: "relative",
            overflow: "hidden",
            transition: "border 0.3s ease",
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "var(--primary-C2)",
              zIndex: 2,
            }}
          />

          <CornerBrackets color="var(--primary)" size="14" strokeWidth="1.2" />

          {/* ── Image — TiltedCard replaces flat scale hover ── */}
          <div
            style={{
              width: "100%",
              height: "400px",
              position: "relative",
              padding: "32px 36px",
              /* overflow visible so tilt doesn't clip at card edge */
              overflow: "hidden",
            }}
          >
            <TiltedCard
              imageSrc={project.image}
              altText={project.title}
              captionText={project.title}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.04}
              rotateAmplitude={8}
              showMobileWarning={false}
              showTooltip={true}
              /* Override TiltedCard's rounded corners — keep Blueprint OS sharp edges */
              overlayContent={null}
              displayOverlayContent={false}
            />

            {/* Status badge — above TiltedCard's z-index */}
            <div
              style={{
                position: "absolute",
                top: "48px",
                right: "52px",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: "var(--primary)",
                border: "0.5px solid var(--border-67)",
                background: "var(--surface-blue-05)",
                padding: "5px 12px",
                letterSpacing: "0.12em",
                backdropFilter: "blur(6px)",
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              {project.status}
            </div>

            {/* ID + year */}
            <div
              style={{
                position: "absolute",
                top: "48px",
                left: "52px",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--primary-C2)",
                letterSpacing: "0.12em",
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              — {project.id} · {project.year}
            </div>
          </div>

          {/* ── Card body ── */}
          <div
            style={{
              padding: "32px 36px",
              borderTop: "0.5px solid var(--border-2E)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "20px",
                marginBottom: "16px",
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "var(--text)",
                    letterSpacing: "-0.02em",
                    marginBottom: "8px",
                    lineHeight: 1.2,
                  }}
                >
                  {project.title}
                </h3>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {project.roles.map((role) => (
                    <span
                      key={role}
                      style={{
                        fontFamily: "var(--font-barl)",
                        fontSize: "16px",
                        color: "var(--primary)",
                        border: "0.5px solid var(--border-67)",
                        padding: "4px 12px",
                        letterSpacing: "0.14em",
                        background: "var(--surface-blue-05)",
                        textTransform: "uppercase",
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setGithubHov(true)}
                  onMouseLeave={() => setGithubHov(false)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    textDecoration: "none",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "8px 14px",
                    background: "var(--surface-blue-05)",
                    /* opacity transition — compositor only */
                    color: githubHov ? "var(--primary)" : "var(--text-gray)",
                    border: githubHov
                      ? "0.5px solid var(--border-67)"
                      : "0.5px solid var(--border-3D)",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  GitHub ↗
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setLiveHov(true)}
                  onMouseLeave={() => setLiveHov(false)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "8px 14px",
                    color: "var(--text-dark)",
                    background: liveHov
                      ? "var(--primary)"
                      : "var(--primary-C2)",
                    transition: "background 0.25s ease",
                  }}
                >
                  Live ↗
                </a>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "0.5px",
                background: "var(--border-2E)",
                marginBottom: "16px",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                color: "var(--text-gray)",
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: "20px",
              }}
            >
              {project.desc}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--primary-C2)",
                    border: "0.5px solid var(--border-67)",
                    padding: "4px 10px",
                    letterSpacing: "0.08em",
                    background: "var(--surface-blue-05)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
