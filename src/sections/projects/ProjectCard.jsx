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
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative will-change-transform"
    >
      {/* ── 🎯 FIX: Added clipping viewport wrapper directly around AnimatePresence ── */}
      <div className="w-full overflow-hidden relative">
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
                ? "0.5px solid var(--border-secondary)"
                : "0.5px solid var(--border-primary)",
            }}
            className="bg-[var(--surface)] relative overflow-hidden transition-colors duration-300 ease-in-out"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--primary)] z-10" />

            <CornerBrackets color="var(--primary)" size="14" strokeWidth="1.2" />

            {/* ── IMAGE SECTION — Fluid Responsive Heights ── */}
            <div className="w-full h-[260px] sm:h-[340px] md:h-[400px] relative p-6 sm:p-8 overflow-hidden">
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
                overlayContent={null}
                displayOverlayContent={false}
              />

              {/* Status badge */}
              <div
                style={{ backdropFilter: "blur(6px)" }}
                className="absolute top-10 right-9 sm:top-12 sm:right-12 text-[9px] text-[var(--primary)] border-[0.5px] border-[var(--border-secondary)] bg-[var(--surface-secondary)] py-1 px-3 tracking-widest font-mono z-20 pointer-events-none"
              >
                {project.status}
              </div>

              {/* ID + year */}
              <div className="absolute top-11 left-9 sm:top-12 sm:left-12 text-[10px] text-[var(--text-colored)] tracking-widest font-mono z-20 pointer-events-none">
                — {project.id} · {project.year}
              </div>
            </div>

            {/* ── CARD BODY CONTENT ── */}
            <div className="p-6 sm:p-8 border-t-[0.5px] border-[var(--border-primary)]">
              
              {/* Title, Roles & Primary Action Target Split Block */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-4">
                <div>
                  <h3
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="text-[20px] sm:text-[22px] font-bold text-[var(--text)] tracking-tight mb-2 leading-snug"
                  >
                    {project.title}
                  </h3>

                  {/* Developer Roles Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.roles.map((role) => (
                      <span
                        key={role}
                        style={{ fontFamily: "var(--font-barl)" }}
                        className="text-[14px] sm:text-[16px] text-[var(--primary)] border-[0.5px] border-[var(--border-secondary)] py-1 px-3 tracking-wider bg-[var(--surface-secondary)] uppercase"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Anchors */}
                <div className="flex gap-2.5 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setGithubHov(true)}
                    onMouseLeave={() => setGithubHov(false)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: githubHov ? "var(--primary)" : "var(--text-caption)",
                      borderColor: githubHov ? "var(--border-secondary)" : "var(--border-muted)",
                    }}
                    className="text-[12px] no-underline tracking-wider uppercase py-2 px-3.5 bg-[var(--surface-secondary)] border-[0.5px] transition-colors duration-200 ease-out text-center flex-1 md:flex-none"
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
                      backgroundColor: liveHov ? "var(--primary)" : "var(--primary)",
                    }}
                    className="text-[12px] font-bold no-underline tracking-wider uppercase py-2 px-3.5 text-[var(--text-inverted)] transition-colors duration-250 ease-out text-center flex-1 md:flex-none"
                  >
                    Live ↗
                  </a>
                </div>
              </div>

              {/* Divider Line */}
              <div className="h-[0.5px] bg-[var(--border-primary)] mb-4" />

              {/* Long Form Summary Text Description */}
              <p
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[15px] sm:text-[16px] text-[var(--text-caption)] leading-relaxed font-light mb-5"
              >
                {project.desc}
              </p>

              {/* Framework Technical Specs Meta Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="text-[11px] sm:text-[12px] text-[var(--text-colored)] border-[0.5px] border-[var(--border-secondary)] py-1 px-2.5 tracking-wide bg-[var(--surface-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}