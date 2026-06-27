import { useState } from "react";
import { motion } from "framer-motion";

import { contactInfo, socialLinks } from "../../data/footer";

import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";
import FooterProfile from "./FooterProfile";

import Availabity from "../../components/Availability";

export default function Footer() {
  const year = new Date().getFullYear();

  // ── Shared Base Class Definitions ──
  const headerClassName =
    "text-[12px] text-[var(--muted)] tracking-[0.18em] uppercase mb-4 flex items-center gap-2.5";
  const lineClassName = "flex-1 h-[0.5px] bg-[var(--border-muted)] block";

  return (
    <footer className="relative z-10 border-t border-[var(--border-muted)] bg-[var(--bg-alt)] backdrop-blur-[50px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-0 py-5">
        {/* ── 3-COLUMN GRID ── */}
        {/* 🟢 FIXED: Collapses to a readable single column on mobile, unfolds to 3 columns on tablet/desktop viewports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 items-start mb-5 pb-12 md:pb-5 border-b border-[var(--border-muted)]">
          {/* COL 1 — Name + School Profile Info */}
          <FooterProfile />

          {/* COL 2 — Email, Phone, Address Meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <div
              style={{ fontFamily: "var(--font-barl)" }}
              className={headerClassName}
            >
              Contact Info
              <span className={lineClassName} />
            </div>
            <div className="flex flex-col gap-3">
              {contactInfo.map((item, i) => (
                <FooterContact key={i} item={item} />
              ))}
            </div>
          </motion.div>

          {/* COL 3 — Social Links + Availability Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            <div
              style={{ fontFamily: "var(--font-barl)" }}
              className={headerClassName}
            >
              Find me on
              <span className={lineClassName} />
            </div>

            <div className="flex gap-5 mb-6 items-center justify-center md:justify-start">
              {socialLinks.map((s) => (
                <FooterLinks key={s.label} item={s} />
              ))}
            </div>

            <div className="flex justify-center md:justify-start">
              <Availabity />
            </div>
          </motion.div>
        </div>

        {/* Copyright System Log Row */}
        <div className="flex justify-center items-center text-center">
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[10px] text-[var(--muted)] tracking-[0.08em] select-none"
          >
            © {year} · JOHN BENEDICT M. GALA · ALL RIGHTS RESERVED
          </span>
        </div>
      </div>
    </footer>
  );
}
