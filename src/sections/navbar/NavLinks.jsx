import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { links } from "../../data/navbar";

export default function NavLinks() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observers = [];

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.35 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <ul className="flex items-center gap-2 list-none m-0 p-0">
      {links.map(({ label, href, id }) => {
        const isActive = activeId === id;

        return (
          <li key={id}>
            <a
              href={href}
              style={{ fontFamily: "var(--font-mono)" }}
              /* ── 🛠️ UPDATED: Added px-4 py-2 to create breathing room inside the container square, and z-10 on text layers ── */
              className={`relative px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] no-underline transition-colors duration-300 cursor-pointer select-none block rounded-xl ${
                isActive 
                  ? "text-[var(--primary)]" 
                  : "text-[var(--text-caption)] hover:text-[var(--primary)]"
              }`}
            >
              {/* Force text above the background slide wrapper pane */}
              <span className="relative z-10">{label}</span>

              {/* ── Dynamic Layout Animated Slide Square Capsule ── */}
              {isActive && (
                <motion.span
                  layoutId="desktop-nav-active-square"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  /* ── 🛠️ UPDATED: Changed from a bottom line configuration to full bounding coverage ── */
                  className="absolute inset-0 z-0 bg-[var(--surface-active)] border border-[var(--border-secondary)] rounded-xl shadow-[0_0_8px_rgba(var(--primary-rgb),0.15)]"
                />
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}