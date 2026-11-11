"use client";

import { useId, useRef } from "react";
import { initialFrame, morphPath, useMorphLoop } from "./useMorphLoop";

/** Which link the shape is leaning towards, if any. */
export type GlowFocus = "none" | "art" | "code";

const START_AT = 6;
// Left to right across the shape: blue, violet, pink, a touch of amber.
const COLORS = ["#4f7cff", "#9b6bff", "#f06bc4", "#ffb35c"];

// The hue turns warm for art, and towards the mint of the programming chip for code.
const FOCUS: Record<GlowFocus, string> = {
  none: "",
  art: "scale-[1.06] hue-rotate-30",
  code: "scale-[0.95] -hue-rotate-[100deg]",
};

// Masks and filters reach well past the shape, so the halo and grain aren't cut off.
const REGION = {
  filterUnits: "userSpaceOnUse",
  x: -60,
  y: -60,
  width: 220,
  height: 220,
} as const;
const MASK_AREA = { x: -60, y: -60, width: 220, height: 220 };

/**
 * One ethereal morphing shape, after Gemini's visual language: a sharp, lit
 * leading edge at the bottom that diffuses into a soft tail, a breathing halo,
 * and film grain throughout. The shape morphs but never spins, so the light
 * keeps coming from the same side.
 */
export function ShapeGlow({
  focus,
  className,
}: {
  focus: GlowFocus;
  className?: string;
}) {
  const id = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const haloRef = useRef<SVGPathElement>(null);
  const bodyRef = useRef<SVGPathElement>(null);
  const rimRef = useRef<SVGPathElement>(null);
  const initial = morphPath(initialFrame(START_AT));

  useMorphLoop(svgRef, { startAt: START_AT, holdMs: 2200 }, (frame) => {
    const d = morphPath(frame);
    for (const path of [haloRef.current, bodyRef.current, rimRef.current]) {
      path?.setAttribute("d", d);
    }
  });

  const ref = (name: string) => `${id}-${name}`;
  const url = (name: string) => `url(#${ref(name)})`;

  return (
    <div
      aria-hidden="true"
      className={`relative aspect-square transition-[scale,filter] duration-900 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${FOCUS[focus]} ${className ?? ""}`}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className="size-full overflow-visible"
      >
        <defs>
          <linearGradient id={ref("color")} x1="0" y1="0" x2="1" y2="0.35">
            {COLORS.map((color, i) => (
              <stop
                key={color}
                offset={i / (COLORS.length - 1)}
                stopColor={color}
              />
            ))}
          </linearGradient>

          {/* Opaque at the leading edge (bottom), gone by the tail (top). */}
          <linearGradient
            id={ref("fade")}
            x1="0"
            y1="92"
            x2="0"
            y2="8"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="white" />
            <stop offset="0.3" stopColor="white" stopOpacity="0.75" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={ref("tail")} maskUnits="userSpaceOnUse" {...MASK_AREA}>
            <rect {...MASK_AREA} fill={url("fade")} />
          </mask>

          {/* The rim only catches light along the bottom. */}
          <linearGradient
            id={ref("rimfade")}
            x1="0"
            y1="92"
            x2="0"
            y2="45"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          {/* The halo leans the same way, but never fully disappears. */}
          <linearGradient
            id={ref("halofade")}
            x1="0"
            y1="100"
            x2="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.2" />
          </linearGradient>
          <mask id={ref("halomask")} maskUnits="userSpaceOnUse" {...MASK_AREA}>
            <rect {...MASK_AREA} fill={url("halofade")} />
          </mask>
          <mask id={ref("rim")} maskUnits="userSpaceOnUse" {...MASK_AREA}>
            <rect {...MASK_AREA} fill={url("rimfade")} />
          </mask>

          <filter id={ref("halo")} {...REGION}>
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id={ref("soft")} {...REGION}>
            <feGaussianBlur stdDeviation="0.6" />
          </filter>

          {/* Monochrome noise, kept to wherever the glow is, overlaid for grain. */}
          <filter id={ref("grain")} {...REGION}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="2.4"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1"
              result="mono"
            />
            <feComposite
              in="mono"
              in2="SourceGraphic"
              operator="in"
              result="grain"
            />
            <feBlend
              in="grain"
              in2="SourceGraphic"
              mode="overlay"
              result="grained"
            />
            {/* Mix back with the clean image, so the grain sits at about half strength. */}
            <feComposite
              in="grained"
              in2="SourceGraphic"
              operator="arithmetic"
              k2="0.55"
              k3="0.45"
            />
          </filter>
        </defs>

        <g filter={url("grain")}>
          <g mask={url("halomask")}>
            <g className="origin-center animate-[breathe_5s_ease-in-out_infinite]">
              <path
                ref={haloRef}
                d={initial}
                fill={url("color")}
                filter={url("halo")}
                opacity={0.6}
                transform="translate(0 4) translate(50 50) scale(1.06) translate(-50 -50)"
              />
            </g>
          </g>
          <path
            ref={bodyRef}
            d={initial}
            fill={url("color")}
            filter={url("soft")}
            mask={url("tail")}
          />
          <path
            ref={rimRef}
            d={initial}
            fill="none"
            stroke="white"
            strokeWidth={0.9}
            strokeOpacity={0.85}
            filter={url("soft")}
            mask={url("rim")}
          />
        </g>
      </svg>
    </div>
  );
}
