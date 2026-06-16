import { useState } from "react";
import { motion } from "framer-motion";

import { sectionHeader } from "../../data/sections";
import { projectsData } from "../../data/projects";
import SectionHeader from "../../components/SectionHeader";
import ProjectCard from "./ProjectCard";
import ArrowButton from "./ArrowButton";

// ── 🎯 IMPORT YOUR NEW TELEMETRY NODE HERE ──
import GithubHeaderTelemetry from "../../components/GithubHeaderTelemetry";

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    if (current > 0) goTo(current - 1);
  };
  const next = () => {
    if (current < projectsData.length - 1) goTo(current + 1);
  };

  return (
    <section
      id="projects"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          padding: "80px 0",
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* ── 🛠️ TELEMETRY DROPPED INTO THE DESCRIPTION PROP ── */}
        <SectionHeader 
          number={sectionHeader.projects.number}
          label={sectionHeader.projects.label}
          title={sectionHeader.projects.title}
          highlight={sectionHeader.projects.highlight}
          description={<GithubHeaderTelemetry />} 
        />

        {/* ── Controls ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.7,
            delay: 0.08,
          }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "24px",
          }}
        >
          {/* Dot indicators */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {projectsData.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === current ? "32px" : "10px",
                  height: "10px",
                  borderRadius: i === current ? "50px" : "50%",
                  background:
                    i === current ? "var(--primary)" : "var(--disabled)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  boxShadow:
                    i === current ? "0 0 8px var(--primary-99)" : "none",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--primary-C2)",
              letterSpacing: "0.1em",
            }}
          >
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(projectsData.length).padStart(2, "0")}
          </div>

          {/* Arrows */}
          <div style={{ display: "flex", gap: "10px" }}>
            <ArrowButton
              direction="left"
              onClick={prev}
              disabled={current === 0}
            />
            <ArrowButton
              direction="right"
              onClick={next}
              disabled={current === projectsData.length - 1}
            />
          </div>
        </motion.div>

        {/* ── Card ── */}
        <ProjectCard project={projectsData[current]} direction={direction} />
      </div>
    </section>
  );
}