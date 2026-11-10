"use client";

import { useState, type ReactNode } from "react";

type MergeSlotProps = {
  side: "left" | "right";
  /** "primary" stays out while it has content. "secondary" waits for the pill to expand. */
  level: "primary" | "secondary";
  children: ReactNode;
};

/** A circle that merges out from behind the pill. */
export function MergeSlot({ side, level, children }: MergeSlotProps) {
  // Keep the last content so it can tuck away smoothly when a section has none.
  const [rendered, setRendered] = useState(children);
  if (children && children !== rendered) setRendered(children);

  const active = Boolean(children);
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
          `calc(-1.75em + 2.25em * ${reveal})`,
        opacity: reveal,
        transition,
      }}
      onTransitionEnd={(event) => {
        // Unmount once tucked away so hidden content stops animating.
        if (!active && event.target === event.currentTarget && event.propertyName === "opacity") {
          setRendered(null);
        }
      }}
    >
      <div
        className="size-[1.75em]"
        style={{
          transform: `translateX(calc(${direction * 0.9}em * (1 - ${reveal}))) scale(calc(0.4 + 0.6 * ${reveal}))`,
          transition,
        }}
      >
        {rendered}
      </div>
    </div>
  );
}
