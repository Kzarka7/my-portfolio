import { useState } from "react";

export default function ArrowButton({ direction, onClick, disabled }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "46px",
        height: "46px",
        border: disabled
          ? "0.5px solid var(--disabled)"
          : hov
            ? "0.5px solid var(--primary)"
            : "0.5px solid var(--primary-C2)",
        background: hov && !disabled ? "var(--surface-blue-05)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--surface-blue-05)",
          transform: hov && !disabled ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: direction === "left" ? "right" : "left",
          transition: "transform 0.2s ease",
        }}
      />
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={
          disabled
            ? "var(--disabled)"
            : hov
              ? "var(--primary)"
              : "var(--primary-C2)"
        }
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.2s", position: "relative", zIndex: 1 }}
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}
