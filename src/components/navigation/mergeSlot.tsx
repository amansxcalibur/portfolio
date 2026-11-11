"use client";

import { useState, type ReactNode } from "react";

const CIRCLE_EM = 1.75;
const GAP_EM = 0.5;

type MergeSlotProps = {
  side: "left" | "right";
  /** "primary" stays out while it has content. "secondary" waits for the pill to expand. */
  level: "primary" | "secondary";
  /** A circle by default; wider for a capsule holding several buttons. */
  widthEm?: number;
  children: ReactNode;
};

/** A circle, or a wider capsule, that merges out from behind the pill. */
export function MergeSlot({ side, level, widthEm = CIRCLE_EM, children }: MergeSlotProps) {
  // Keep the last content and its width so it can tuck away smoothly when a section has none.
  const [rendered, setRendered] = useState({ children, widthEm });
  if (children && (children !== rendered.children || widthEm !== rendered.widthEm)) {
    setRendered({ children, widthEm });
  }

  const active = Boolean(children);
  const width = rendered.widthEm;
  const reveal = !active ? "0" : level === "primary" ? "1" : "var(--pill-expanded, 0)";
  const direction = side === "left" ? 1 : -1;
  const transition = "margin 0.4s, transform 0.4s, opacity 0.4s";

  return (
    <div
      inert={!active}
      // Primary slots sit above secondary ones, which tuck behind them.
      className={`relative shrink-0 ${level === "primary" ? "z-[5]" : "z-0"}`}
      style={{
        [side === "left" ? "marginRight" : "marginLeft"]:
          `calc(-${width}em + ${width + GAP_EM}em * ${reveal})`,
        opacity: reveal,
        transition,
      }}
      onTransitionEnd={(event) => {
        // Unmount once tucked away so hidden content stops animating.
        if (!active && event.target === event.currentTarget && event.propertyName === "opacity") {
          setRendered({ children: null, widthEm: CIRCLE_EM });
        }
      }}
    >
      <div
        style={{
          width: `${width}em`,
          height: `${CIRCLE_EM}em`,
          transform: `translateX(calc(${direction * Math.max(0.9, width / 2)}em * (1 - ${reveal}))) scale(calc(0.4 + 0.6 * ${reveal}))`,
          transition,
        }}
      >
        {rendered.children}
      </div>
    </div>
  );
}
