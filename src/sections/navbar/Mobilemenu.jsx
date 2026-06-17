import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { links } from "../../data/navbar";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function MobileMenu({ scrolled, onClose }) {
  const [activeId, setActiveId] = useState("");

  /* Active section tracking */
  useEffect(() => {
    const observers = [];
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        }),
        { threshold: 0.35 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0, y: "-48px" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-48px" }}
      transition={{ duration: 0.3, ease: [5, 5, 5, 5] }}
      /* 🟢 Dynamic background matching the glass navbar pill perfectly */
      className={`w-full mt-2 z-[101] lg:hidden backdrop-blur-[50px] border border-[var(--border-3D)] rounded-2xl p-4 shadow-[0_8px_24px_rgba(27,27,27,0.3)] will-change-[transform,opacity] transition-colors duration-300 ease-in-out ${
        scrolled ? "bg-[#ffffff08]" : "bg-[#ffffff06]"
      }`}
    >
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="list-none m-0 p-0"
      >
        {links.map(({ label, href, id }) => {
          const isActive = activeId === id;
          return (
            <motion.li key={id} variants={itemVariants}>
              <a
                href={href}
                onClick={onClose}
                className={`flex items-center justify-between p-[14px_16px] rounded-lg text-[13px] font-medium tracking-[0.04em] uppercase no-underline transition-all duration-200 select-none cursor-pointer hover:bg-[var(--surface-blue-05)] hover:text-[var(--primary)] ${
                  isActive
                    ? "text-[var(--primary)] bg-[var(--primary-1F)]"
                    : "text-[var(--text-gray)] bg-transparent"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span>{label}</span>

                {/* Active dot indicator */}
                {isActive && (
                  <motion.span
                    layoutId="mobile-active-dot"
                    className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_6px_var(--primary)] shrink-0"
                  />
                )}
              </a>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
}