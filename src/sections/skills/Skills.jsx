import { motion } from "framer-motion";

import { skillCategories } from "../../data/skills";
import { sectionHeader } from "../../data/sections";
import SkillCard from "./SkillCard";
import SectionHeader from "../../components/SectionHeader";

export default function Skills() {
  return (
    <section
      id="skills"
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
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <SectionHeader {...sectionHeader.skills} />

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var(--text-gray)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.category}
                </div>

                <div
                  style={{
                    flex: 1,
                    height: "0.5px",
                    background: "var(--muted)",
                  }}
                />

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    color: "var(--text-gray)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {cat.items.length} tools
                </div>
              </div>

              {/* Skill Card */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                }}
              >
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
