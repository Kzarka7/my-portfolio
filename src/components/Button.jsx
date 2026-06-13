import { useState } from "react";
import { FiDownload, FiCheck } from "react-icons/fi";
import { MdSend } from "react-icons/md";

/* Only ::before pseudo-elements — cannot be done inline */
const SKEW_CSS = `
  .btn-solid::before {
    content: ""; position: absolute;
    left: -50px; top: 0; width: 0; height: 100%;
    background: #0c5f78;
    transform: skewX(45deg); z-index: 0;
    transition: width 1000ms;
  }
  .btn-ghost::before {
    content: ""; position: absolute;
    left: -50px; top: 0; width: 0; height: 100%;
    background: var(--primary-E2);
    transform: skewX(45deg); z-index: 0;
    transition: width 1000ms;
  }
  .btn-solid:hover::before,
  .btn-ghost:hover::before { width: 250%; }

  /* pill-resume: dark box → turns accent on hover */
  .btn-pill-resume .pill-box { transition: width 0.3s ease, background 0.3s ease; }

  /* pill-send: dark box → expands on hover */
  .btn-pill-send .pill-box { transition: width 0.3s ease, background 0.3s ease; }
`;

/*
  VARIANTS
    'solid'      — filled accent + skew wipe        → VIEW PROJECTS
    'ghost'      — outline + skew fill on hover     → GET IN TOUCH
    'pill-resume'— ghost + dark pill slides right   → DOWNLOAD RESUME
    'pill-send'  — filled + dark pill slides right  → SEND_MESSAGE

  PROPS
    href         — renders <a>, omit for <button>
    type         — 'button' | 'submit'  (default: 'button')
    download     — boolean, adds download attr
    sent         — boolean, success state for pill-send
    label        — text fallback if no children
    target       — link target (default: '_self')
*/
export default function Button({
  children,
  href,
  variant = "",
  type = "button",
  download = false,
  sent = false,
  label,
  target = "_self",
  ...props
}) {
  const [hov, setHov] = useState(false);

  const Tag = href ? "a" : "button";

  const tagProps = {
    ...(href
      ? { href, target, ...(download && { download: true }) }
      : { type }),
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    ...props,
  };

  /* ── Shared base ── */
  const base = {
    position: "relative",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--font-mono)",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: "color 1000ms, transform 800ms, box-shadow 800ms",
  };

  /* ── Per-variant styles + CSS class name ── */
  const variants = {
    solid: {
      cls: "btn-solid",
      style: {
        ...base,
        justifyContent: "center",
        padding: "16px 24px",
        fontSize: "14px",
        background: "var(--primary-E2)",
        color: hov ? "var(--text)" : "var(--text-dark)",
        border: "2px solid var(--primary-E2)",
        transform: hov ? "scale(1.05)" : "scale(1)",
        boxShadow: hov ? "4px 5px 16px 2px var(--primary-59)" : "none",
      },
    },
    ghost: {
      cls: "btn-ghost",
      style: {
        ...base,
        justifyContent: "center",
        padding: "16px 24px",
        fontSize: "14px",
        background: "var(--surface-0D)",
        color: hov ? "var(--text-dark)" : "var(--primary-E2)",
        border: "2px solid var(--primary-E2)",
        transform: hov ? "scale(1.05)" : "scale(1)",
        boxShadow: hov ? "4px 5px 16px 2px var(--primary-59)" : "none",
      },
    },
    "pill-resume": {
      cls: "btn-pill-resume",
      style: {
        ...base,
        justifyContent: "flex-start",
        padding: "16px 24px",
        fontSize: "14px",
        height: "100%",
        minWidth: "210px",
        background: "var(--surface-0D)",
        color: "var(--primary-E2)",
        border: "2px solid var(--primary-E2)",
      },
    },
    "pill-send": {
      cls: "btn-pill-send",
      style: {
        ...base,
        justifyContent: "flex-start",
        padding: "24px 16px",
        fontSize: "12px",
        height: "46px",
        minWidth: "180px",
        background: sent ? "var(--surface-0D)" : "var(--primary-E2)",
        color: sent ? "var(--primary-E2)" : "var(--text-dark)",
        border: sent ? "0.5px solid var(--primary-E2)" : "none",
        boxShadow: hov ? "0 0 16px 2px var(--primary-59)" : "none",
      },
    },
  };

  const current = variants[variant];

  /* Pill box and icon differ between resume and send */
  const isPillResume = variant === "pill-resume";
  const isPillSend = variant === "pill-send";
  const isPill = isPillResume || isPillSend;

  const pillBoxStyle = isPillResume
    ? {
        /* ghost pill: dark bg, turns accent on hover via CSS */
        position: "absolute",
        right: "7px",
        background: hov ? "var(--primary)" : "var(--text-dark)",
        height: "35px",
        width: hov ? "calc(100% - 5.5%)" : "35px",
        border: "1.5px solid var(--border-67)",
        boxShadow: "0 0 8px 2px var(--primary-59)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        zIndex: 2,

        transition: "background 0.3 ease",
      }
    : {
        /* send pill: accent bg, turns dark on hover via CSS */
        position: "absolute",
        right: "7px",
        background: sent ? "var(--primary)" : "var(--text-dark)",
        height: "35px",
        width: hov ? "calc(100% - 7.5%)" : "35px",
        boxShadow: "0 0 8px 2px var(--primary-59)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        zIndex: 2,
      };

  const PillIcon = () => {
    if (isPillSend) {
      return sent ? (
        <FiCheck size={18} color="var(--text-dark)" />
      ) : (
        <MdSend
          className="pill-icon"
          size={16}
          style={{ color: "var(--primary-E2)", flexShrink: 0 }}
        />
      );
    }
    return (
      <FiDownload
        className="pill-icon"
        style={{
          fontSize: "18px",
          color: hov ? "var(--text-dark)" : "var(--primary-E2)",
          flexShrink: 0,
        }}
      />
    );
  };

  return (
    <>
      <style>{SKEW_CSS}</style>
      <Tag className={current.cls} style={current.style} {...tagProps}>
        <span
          style={{
            position: "relative",
            zIndex: 1,
            ...(isPill && { marginRight: "42px" }),
          }}
        >
          {children ?? label}
        </span>

        {isPill && (
          <div className="pill-box" style={pillBoxStyle}>
            <PillIcon />
          </div>
        )}
      </Tag>
    </>
  );
}
