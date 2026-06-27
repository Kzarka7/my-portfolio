import { useState } from "react";

export default function FooterLinks({ item }) {
  const [hov, setHov] = useState(false);
  const Icon = item.icon;

  return (
    <div className="relative inline-block">
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="flex items-center justify-center no-underline cursor-pointer"
      >
        <Icon
          className={`text-[22px] block transition-all duration-200 ${
            hov ? "text-[var(--primary)] scale-125" : "text-[var(--text)] scale-100"
          }`}
        />
      </a>

      {/* Interactive Tooltip Component Block */}
      <div
        className={`absolute bottom-[140%] left-1/2 origin-bottom -translate-x-1/2 bg-[var(--text-inverted)] border-[0.5px] border-[var(--border-secondary)] p-[5px_12px] whitespace-nowrap z-50 pointer-events-none transition-transform duration-200 ease-in-out ${
          hov ? "scale-100" : "scale-0"
        }`}
      >
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[10px] text-[var(--primary)] tracking-[0.1em]"
        >
          {item.label}
        </span>
        
        {/* Tooltip Downward Caret Arrow */}
        <div className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 rotate-45 w-1.5 h-1.5 bg-[var(--text-inverted)] border-r-[0.5px] border-b-[0.5px] border-[var(--border-secondary)]" />
      </div>
    </div>
  );
}