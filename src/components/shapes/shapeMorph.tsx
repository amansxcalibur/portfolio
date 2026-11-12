"use client";

import { useId, useRef } from "react";
import { initialFrame, morphPath, TEMPOS, useMorphLoop, type Tempo } from "./useMorphLoop";

type ShapeMorphProps = {
  startAt?: number;
  tempo?: Tempo;
  /** overrides how long the tempo holds each shape */
  holdMs?: number;
  /** colors spread from top left to bottom right, defaults to currentColor */
  gradient?: readonly string[];
  className?: string;
};

/** looping shape morph in currentColor */
export function ShapeMorph({
  startAt = 0,
  tempo = "gentle",
  holdMs,
  gradient,
  className,
}: ShapeMorphProps) {
  const gradientId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { spinMs } = TEMPOS[tempo];

  useMorphLoop(svgRef, { startAt, tempo, holdMs }, (frame) => {
    const path = pathRef.current;
    if (!path) return;
    path.setAttribute("d", morphPath(frame));
    path.setAttribute("transform", `rotate(${frame.angle} 50 50)`);
  });

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`overflow-visible fill-current ${className ?? ""}`}
      style={spinMs ? { animation: `shape-spin ${spinMs}ms linear infinite` } : undefined}
    >
      {gradient && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            {gradient.map((color, i) => (
              <stop key={i} offset={i / Math.max(1, gradient.length - 1)} stopColor={color} />
            ))}
          </linearGradient>
        </defs>
      )}
      <path
        ref={pathRef}
        d={morphPath(initialFrame(startAt))}
        style={gradient ? { fill: `url(#${gradientId})` } : undefined}
      />
    </svg>
  );
}
