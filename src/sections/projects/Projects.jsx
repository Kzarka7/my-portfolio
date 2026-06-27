import { useState } from "react";
import { motion } from "framer-motion";

import { sectionHeader } from "../../data/sections";
import { projectsData } from "../../data/projects";
import SectionHeader from "../../components/SectionHeader";
import ProjectCard from "./ProjectCard";
import ArrowButton from "./ArrowButton";

// ── 🎯 TELEMETRY NODE IMPORT ──
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
      className="relative flex items-center min-h-screen mx-4 z-[1] py-20 md:py-32"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        
        {/* Header Block with Telemetry Component Injection */}
        <SectionHeader
          number={sectionHeader.projects.number}
          label={sectionHeader.projects.label}
          title={sectionHeader.projects.title}
          highlight={sectionHeader.projects.highlight}
          description={<GithubHeaderTelemetry />}
        />

        {/* ── CONTROLS ROW ROW CONTAINER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.7,
            delay: 0.08,
          }}
          className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full gap-4 mb-6"
        >
          {/* Active Dot Indicators Stretcher */}
          <div className="flex items-center gap-2.5 order-1">
            {projectsData.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === current ? "32px" : "10px",
                  boxShadow: i === current ? "0 0 16px 4px var(--shadow-colored)" : "none",
                }}
                className={`h-2.5 rounded-full p-0 cursor-pointer border-none transition-all duration-350 ease-out shrink-0 ${
                  i === current ? "bg-[var(--primary)]" : "bg-[var(--disabled)]"
                }`}
              />
            ))}
          </div>

          {/* Slider Numerical Counter */}
          <div
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[12px] text-[var(--text-colored)] tracking-wider order-2 sm:mx-auto"
          >
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(projectsData.length).padStart(2, "0")}
          </div>

          {/* Action Arrow Buttons Navigation */}
          <div className="flex gap-2.5 order-3 ml-auto sm:ml-0">
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

        {/* ── PRESENTATION CARDS VIEWPORT ── */}
        <ProjectCard project={projectsData[current]} direction={direction} />
      </div>
    </section>
  );
}