"use client";

import { useState, type ReactNode } from "react";

const CIRCLE_EM = 1.75;
const GAP_EM = 0.5;

type MergeSlotProps = {
  side: "left" | "right";
  /** "primary" stays out while it has content, "secondary" waits for the pill to expand */
  level: "primary" | "secondary";
  children: ReactNode;
};

/** a circle that merges out from behind the pill */
export function MergeSlot({ side, level, children }: MergeSlotProps) {
  // keep the last content so it can tuck away smoothly
  const [rendered, setRendered] = useState(children);
  if (children && children !== rendered) setRendered(children);

  const active = Boolean(children);
  const reveal = !active ? "0" : level === "primary" ? "1" : "var(--pill-expanded, 0)";
  const direction = side === "left" ? 1 : -1;
  const transition = "margin 0.4s, transform 0.4s, opacity 0.4s";

  return (
    <div
      inert={!active}
      // primary slots sit above secondary ones
      className={`relative shrink-0 ${level === "primary" ? "z-[5]" : "z-0"}`}
      style={{
        [side === "left" ? "marginRight" : "marginLeft"]:
          `calc(-${CIRCLE_EM}em + ${CIRCLE_EM + GAP_EM}em * ${reveal})`,
        opacity: reveal,
        transition,
      }}
      onTransitionEnd={(event) => {
        // unmount once tucked away so hidden stuff stops animating
        if (!active && event.target === event.currentTarget && event.propertyName === "opacity") {
          setRendered(null);
        }
      }}
    >
      <div
        style={{
          width: `${CIRCLE_EM}em`,
          height: `${CIRCLE_EM}em`,
          transform: `translateX(calc(${direction * 0.9}em * (1 - ${reveal}))) scale(calc(0.4 + 0.6 * ${reveal}))`,
          transition,
        }}
      >
        {rendered}
      </div>
    </div>
  );
}
