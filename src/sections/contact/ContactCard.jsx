import emailjs from "@emailjs/browser";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CornerBrackets from "../../components/CornerBrackets";
import Button from "../../components/Button";

const MAX_CHARS = 1000;
const EASE = [0.16, 1, 0.3, 1];

const SERVICE_ID = "service_pdcj379";
const TEMPLATE_ID = "template_jqa9msp";
const PUBLIC_KEY = "hJegStJOIQE5IWyyM";

export default function ContactCard() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const [hov, setHov] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailClean = form.email.trim().toLowerCase();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(emailClean)) {
      alert("Transmission failed: Invalid email structure detected.");
      return;
    }

    const parts = emailClean.split("@");
    const username = parts[0];
    const domain = parts[1];

    const continuousConsonants = /[^aeiouy._%+-]{5,}/i;
    const repeatingPattern = /(.)\1{4,}/;

    if (
      continuousConsonants.test(username) ||
      repeatingPattern.test(username) ||
      domain.includes("qwe") ||
      username === "test"
    ) {
      alert("System Warning: Submission blocked. Please use a valid email identity.");
      return;
    }

    try {
      setSending(true);
      const currentTimestamp = new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name.trim(),
          email: emailClean,
          time: currentTimestamp,
          message: form.message.trim(),
        },
        PUBLIC_KEY,
      );

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error("System Interface Fault - EmailJS Error:", err);
      alert("Transmission pipeline interrupted. Please review your server keys.");
    } finally {
      setSending(false);
    }
  };

  const charCount = form.message.length;
  const pct = charCount / MAX_CHARS;
  const isNearLimit = pct >= 0.8;
  const isAtLimit = pct >= 1;

  const counterColor = isAtLimit
    ? "#ef4444"
    : isNearLimit
      ? "#f59e0b"
      : "var(--muted)";

  // ── Shared Base Class Definitions ──
  const labelClassName = "text-[14px] text-[var(--primary)] tracking-[0.14em] mb-1.5 uppercase block";
  const baseInputClassName = "w-full bg-transparent p-[13px_16px] text-[12px] text-[var(--text)] outline-none tracking-[0.03em] border-[0.5px] transition-colors duration-200 cursor-text";

  return (
    <motion.div
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: EASE } }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`bg-[var(--surface)] p-6 md:p-10 border-[0.5px] relative will-change-transform transition-colors duration-300 ${
        hov ? "border-[var(--border-secondary)]" : "border-[var(--border-primary)]"
      }`}
      style={{
        boxShadow: "0 4px 16px var(--shadow-card)"
      }}
    >
      <CornerBrackets color="var(--primary)" size="14" strokeWidth="1.2" />

      {/* Cyber System Header Bar */}
      <div
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-[9px] text-[var(--disabled)] tracking-[0.16em] uppercase mb-7 flex justify-between select-none"
      >
        <span>FORM_TRANSMISSION.JSX</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={sending ? "sending" : sent ? "sent" : "ready"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {sending ? "STATUS: SENDING" : sent ? "STATUS: SENT" : "STATUS: READY"}
          </motion.span>
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-5">
        {/* Input Block: Name + Email */}
        {/* 🟢 FIXED: Stacks vertically on mobile and turns into 2 columns on tablets/desktops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span style={{ fontFamily: "var(--font-mono)" }} className={labelClassName}>
              Name
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              placeholder="Your name"
              style={{ fontFamily: "var(--font-mono)" }}
              className={`${baseInputClassName} ${
                focused === "name" ? "border-[var(--border-secondary)]" : "border-[var(--border-primary)]"
              }`}
              required
              autoComplete="off"
              disabled={sending}
            />
          </div>

          <div>
            <span style={{ fontFamily: "var(--font-mono)" }} className={labelClassName}>
              Email
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              placeholder="you@email.com"
              style={{ fontFamily: "var(--font-mono)" }}
              className={`${baseInputClassName} ${
                focused === "email" ? "border-[var(--border-secondary)]" : "border-[var(--border-primary)]"
              }`}
              required
              autoComplete="off"
              disabled={sending}
            />
          </div>
        </div>

        {/* Input Block: Message Textarea Section */}
        <div>
          <span style={{ fontFamily: "var(--font-mono)" }} className={labelClassName}>
            Message
          </span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            placeholder="Tell me about your project or opportunity..."
            rows={8}
            maxLength={MAX_CHARS}
            required
            autoComplete="off"
            disabled={sending}
            style={{ fontFamily: "var(--font-mono)" }}
            className={`${baseInputClassName} resize-none ${
              focused === "message" ? "border-[var(--border-secondary)]" : "border-[var(--border-primary)]"
            }`}
          />

          {/* Interactive Character Progress bar footer */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex-1 h-[1px] bg-[var(--border-primary)] mr-3 overflow-hidden relative">
              <motion.div
                animate={{
                  scaleX: pct,
                  backgroundColor: isAtLimit ? "#ef4444" : isNearLimit ? "#f59e0b" : "var(--primary)",
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0 origin-left will-change-transform"
              />
            </div>

            <motion.span
              animate={{ color: counterColor }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[10px] tracking-[0.08em] shrink-0 font-variant-numeric-tabular-nums"
            >
              {charCount} / {MAX_CHARS}
            </motion.span>
          </div>
        </div>

        {/* System Logs & Submission Action Row */}
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <AnimatePresence mode="wait">
            <motion.span
              key={sending ? "sending" : sent ? "received" : "required"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[9px] text-[var(--disabled)] tracking-[0.1em]"
            >
              {sending
                ? "// processing upload data..."
                : sent
                  ? "// transmission received"
                  : "// all fields are required"}
            </motion.span>
          </AnimatePresence>

          <Button variant="pill-send" type="submit" disabled={sending} sent={sent}>
            {sending ? "SENDING..." : sent ? "MESSAGE SENT" : "SEND MESSAGE"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}