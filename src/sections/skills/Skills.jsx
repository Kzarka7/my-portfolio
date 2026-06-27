import { motion } from "framer-motion";

import { skillCategories } from "../../data/skills";
import { sectionHeader } from "../../data/sections";
import SkillCard from "./SkillCard";
import SectionHeader from "../../components/SectionHeader";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative flex items-center min-h-screen px-4 z-[1] bg-alt"
    >
      <div className="w-full max-w-[1200px] mx-auto py-20">
        {/* Header */}
        <SectionHeader {...sectionHeader.skills} />

        {/* Categories */}
        <div className="flex flex-col gap-12">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.7,
                delay: catIndex * 0.08,
              }}
            >
              {/* Category Info Strip */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[12px] font-medium text-[var(--text-caption)] tracking-[0.2em] uppercase whiteSpace: nowrap"
                >
                  {cat.category}
                </div>

                <div className="flex-1 h-[0.5px] bg-[var(--muted)]" />
 
                <div
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[9px] text-[var(--text-caption)] tracking-[0.1em]"
                >
                  {cat.items.length} tools
                </div>
              </div>

              {/* ── RESPONSIVE SKILL CARD GRID ── */}
              {/* Starts as 1 column on mobile, changes to 2 columns on small screens, and scales up to 4 columns on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {cat.items.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}