"use client";
import { ReactNode, useEffect, useState } from "react";

export function MergeSlot({ side, children }: { side: "left" | "right"; children: ReactNode }) {
  // We keep track of the last valid child so it doesn't instantly vanish.
  // This allows it to render while smoothly tucking away.
  const [renderedChild, setRenderedChild] = useState(children);

  useEffect(() => {
    if (children) {
      setRenderedChild(children);
    }
  }, [children]);

  const isLeft = side === "left";
  
  // If the current section has no children for this side, we force it to tuck (0).
  // Otherwise, we read from the scroll/hover variables.
  const isActive = !!children;
  const untuckVar = isActive ? `max(var(--untuck, 0), var(--is-hovered, 0))` : `0`;

  const marginCalc = `calc(-114px + (146px * ${untuckVar}))`;
  const scaleCalc = `scale(calc(0.4 + (0.6 * ${untuckVar})))`;
  const txStart = isLeft ? 60 : -60;
  const translateCalc = `translateX(calc(${txStart}px - (${txStart}px * ${untuckVar})))`;

  return (
    <div
      className={`shrink-0 relative z-0 group-hover:[--is-hovered:1] [--is-hovered:0] ${
        !isActive ? "pointer-events-none" : ""
      }`}
      style={{
        [isLeft ? "marginRight" : "marginLeft"]: marginCalc,
        transition: "var(--slot-trans, margin 0.4s cubic-bezier(0.4,0,0.2,1))",
        // Optional: fade out slightly when tucking away
        opacity: isActive ? 1 : 0, 
        transitionProperty: "margin, opacity",
        transitionDuration: "0.4s",
      }}
    >
      <div
        className="w-[114px] h-[114px] origin-center"
        style={{
          transform: `${translateCalc} ${scaleCalc}`,
          transition: "var(--slot-trans, transform 0.4s cubic-bezier(0.4,0,0.2,1))",
        }}
      >
        {/* Render the saved child, allowing it to animate out smoothly */}
        {renderedChild}
      </div>
    </div>
  );
}