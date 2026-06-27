import { motion } from "framer-motion";

import { educationData } from "../../data/education";
import { sectionHeader } from "../../data/sections";
import EducationCard from "./EducationCard";
import SectionHeader from "../../components/SectionHeader";

export default function Education() {
  return (
    <section
      id="education"
      className="min-h-screen flex items-center relative z-10 bg-alt"
    >
      <div className="py-20 px-4 md:px-6 lg:px-0 max-w-[1200px] w-full mx-auto">
        {/* Section Header */}
        <SectionHeader {...sectionHeader.education} />

        {/* ── Two Column Responsive Grid Layout ── */}
        {/* 🟢 FIXED: Collapses to 1 column on mobile and expands to 2 columns on tablet/desktop viewports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-[50px] items-start">
          {educationData.map((cat) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.7,
                delay: 0.08,
              }}
            >
              {/* Category Sub-Header Line Tracker */}
              <div
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-[12px] text-[var(--text-caption)] tracking-[0.18em] uppercase mb-4 flex items-center gap-3"
              >
                {cat.category}
                <span className="flex-1 h-[0.5px] bg-[var(--muted)] block" />
              </div>

              {/* Education Cards Mapping Block */}
              <div className="flex flex-col gap-5">
                {cat.items.map((education, index) => (
                  <EducationCard
                    key={education.id}
                    education={education}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
