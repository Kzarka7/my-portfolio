import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

import ThemeToggle from "./ThemeToggle";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  /* ── Scroll Tracking ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Screen Resize Safety: Auto-closes menu if window goes desktop ── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // 1024px is Tailwind's default 'lg' breakpoint
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: "-100%" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      /* 🟢 FIXED: Changed broken [5,5,5,5] easing array to standard cubic-bezier curve */
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-4 right-4 z-[100] flex flex-col items-center max-w-[1200px] mx-auto lg:left-0 lg:right-0 w-[calc(100%-32px)] lg:w-full"
    >
      {/* Floating Pill Frame */}
      <div
        /* 🟢 FIXED: Corrected 'gl:py-4' typo to 'lg:py-4' */
        className={`w-full flex items-center justify-between px-4 md:px-8 py-3 lg:py-4 rounded-2xl border border-[var(--border-3D)] shadow-[0_8px_24px_rgba(27,27,27,0.3)] backdrop-blur-[50px] transition-all duration-300 ease-in-out ${
          scrolled ? "bg-[#ffffff08]" : "bg-[#ffffff06]"
        }`}
      >
        <a
          href="#about"
          style={{ fontFamily: "var(--font-mono)" }}
          className="font-bold text-[16px] text-[var(--text)] tracking-[0.01em] no-underline cursor-pointer select-none"
        >
          JOHN
          <span className="text-[var(--primary)] sm:hidden">.</span>
          <span className="text-[var(--primary)] hidden sm:inline">
            &nbsp;BENEDICT M. GALA
          </span>
        </a>

        {/* Desktop Links Viewport */}
        <div className="hidden lg:block">
          <NavLinks />
        </div>

        {/* Interaction Elements Group */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex lg:hidden items-center justify-center p-1.5 rounded-lg text-[var(--text)] transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <FiX className="w-[22px] h-[22px]" />
            ) : (
              <FiMenu className="w-[22px] h-[22px]" />
            )}
          </button>
        </div>
      </div>

      {/* ── MOBILE DROPDOWN MOUNT FRAME ── */}
      {/* 🟢 FIXED: Extracted responsive classes out of AnimatePresence wrapper */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <div className="w-full lg:hidden">
            <MobileMenu scrolled={scrolled} onClose={() => setIsOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}