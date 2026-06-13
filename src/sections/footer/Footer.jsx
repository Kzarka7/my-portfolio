import { useState } from "react";
import { motion } from "framer-motion";

import { contactInfo, socialLinks } from "../../data/footer";

import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";
import FooterProfile from "./FooterProfile";

import Availabity from "../../components/Availability";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerHeader = {
    fontFamily: "var(--font-barl)",
    fontSize: "12px",
    color: "var(--muted)",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const footerLine = {
    flex: 1,
    height: "0.5px",
    background: "var(--border-3D)",
    display: "block",
  };

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "0.5px solid var(--border-3D)",
        background: "var(--surface-blue-05)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 0 28px" }}
      >
        {/* ── 3-COLUMN GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "40px",
            alignItems: "start",
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "0.5px solid var(--border-3D)",
          }}
        >
          {/* COL 1 — Name + School */}
          <FooterProfile />

          {/* COL 2 — Email, Phone, Address */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div style={footerHeader}>
              Contact Info
              <span style={footerLine} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {contactInfo.map((item, i) => (
                <FooterContact key={i} item={item} />
              ))}
            </div>
          </motion.div>

          {/* COL 3 — Social Links + Availability */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <div style={footerHeader}>
              Find me on
              <span style={footerLine} />
            </div>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "24px",
              }}
            >
              {socialLinks.map((s) => (
                <FooterLinks key={s.label} item={s} />
              ))}
            </div>

            <Availabity />
          </motion.div>
        </div>

        {/* Copyright */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--muted)",
              letterSpacing: "0.08em",
            }}
          >
            © {year} · JOHN BENEDICT M. GALA · ALL RIGHTS RESERVED
          </span>
        </div>
      </div>
    </footer>
  );
}
