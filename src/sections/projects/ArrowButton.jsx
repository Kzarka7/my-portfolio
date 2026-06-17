import { useState } from "react";

export default function ArrowButton({ direction, onClick, disabled }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={direction === "left" ? "Previous project" : "Next project"}
      style={{
        borderColor: disabled
          ? "var(--disabled)"
          : hov
            ? "var(--primary)"
            : "var(--primary-C2)",
      }}
      className={`w-[46px] h-[46px] border-[0.5px] bg-transparent flex items-center justify-center relative overflow-hidden shrink-0 transition-all duration-200 ease-in-out ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {/* Interactive sliding background overlay block */}
      <div
        style={{
          transform: hov && !disabled ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: direction === "left" ? "right" : "left",
        }}
        className="absolute inset-0 bg-[var(--surface-blue-05)] transition-transform duration-200 ease-in-out"
      />

      {/* Navigation Arrow SVG */}
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
        className="relative z-10 transition-colors duration-200"
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