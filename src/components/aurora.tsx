import { useId, type CSSProperties } from "react";

type Blob = {
  color: string;
  /** Center and size, in percent of the aurora's box. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Seconds for one drift, there and back. */
  drift: number;
};

type Variant = {
  /** The horizon, drawn in a 1440×400 box that stretches to fit. */
  ridge: string;
  blobs: Blob[];
  /** Colors along the lit edge, left to right. */
  rim: string[];
};

const VARIANTS = {
  /** Vibrant, nuanced: the whole spectrum behind a rolling ridge. */
  vibrant: {
    ridge:
      "M0 190C180 190 300 70 480 70C660 70 760 170 940 170C1120 170 1260 110 1440 100",
    blobs: [
      { color: "var(--glow-blue)", x: 2, y: 69, w: 44, h: 60, drift: 23 },
      { color: "var(--glow-violet)", x: 16, y: 64, w: 40, h: 70, drift: 17 },
      { color: "var(--glow-pink)", x: 34, y: 51, w: 32, h: 64, drift: 13 },
      { color: "var(--glow-amber)", x: 62, y: 65, w: 36, h: 76, drift: 19 },
      { color: "var(--glow-green)", x: 81, y: 60, w: 32, h: 62, drift: 15 },
      { color: "var(--glow-blue)", x: 98, y: 55, w: 38, h: 66, drift: 21 },
    ],
    rim: [
      "var(--glow-blue)",
      "var(--glow-violet)",
      "var(--glow-pink)",
      "var(--glow-amber)",
      "var(--glow-green)",
      "var(--glow-blue)",
    ],
  },
  /** Calm, decisive: one blue, a flat horizon and a single bright line. */
  calm: {
    ridge: "M0 150C360 100 1080 100 1440 150",
    blobs: [
      { color: "var(--glow-blue)", x: 50, y: 58, w: 120, h: 96, drift: 23 },
      { color: "var(--glow-violet)", x: 22, y: 60, w: 46, h: 50, drift: 17 },
      { color: "var(--glow-blue)", x: 76, y: 58, w: 50, h: 60, drift: 19 },
    ],
    rim: ["transparent", "var(--glow-blue)", "#cfe0ff", "var(--glow-blue)", "transparent"],
  },
} satisfies Record<string, Variant>;

/**
 * Light rising from behind a horizon, after Gemini's gradients: a sharp, lit
 * leading edge that diffuses into a soft tail. The soft part is plain radial
 * gradients moved by transforms, so nothing is blurred or repainted per frame.
 * Place it in a `relative overflow-hidden` section; it anchors to the bottom.
 */
export function Aurora({
  variant,
  className,
}: {
  variant: keyof typeof VARIANTS;
  className?: string;
}) {
  const id = useId();
  const { ridge, blobs, rim }: Variant = VARIANTS[variant];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className ?? "h-[72svh]"}`}
    >
      <div className="absolute inset-0 opacity-(--glow-strength)">
        {blobs.map(({ color, x, y, w, h, drift }, i) => (
          <div
            key={i}
            className="absolute dark:mix-blend-screen"
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                width: `${w}%`,
                height: `${h}%`,
                translate: "-50% -50%",
                background: `radial-gradient(closest-side, ${color}, color-mix(in oklab, ${color} 50%, transparent) 38%, transparent)`,
                animation: `aurora-drift ${drift}s ease-in-out ${-i * 3}s infinite alternate`,
              } satisfies CSSProperties
            }
          />
        ))}
      </div>

      {/* The ground in front of the light: this is what gives the glow its hard edge. */}
      <svg
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-3/5 w-full overflow-visible"
      >
        <defs>
          <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="0">
            {rim.map((color, i) => (
              <stop key={i} offset={i / (rim.length - 1)} style={{ stopColor: color }} />
            ))}
          </linearGradient>
          <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--surface)" }} stopOpacity="0.78" />
            <stop offset="0.35" style={{ stopColor: "var(--surface)" }} />
          </linearGradient>
          <filter id={`${id}-bloom`} x="-5%" y="-100%" width="110%" height="300%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <path d={`${ridge}V400H0Z`} fill={`url(#${id}-ground)`} />
        <path
          d={ridge}
          fill="none"
          stroke={`url(#${id}-rim)`}
          strokeWidth="10"
          filter={`url(#${id}-bloom)`}
          opacity="0.8"
        />
        <path
          d={ridge}
          fill="none"
          stroke={`url(#${id}-rim)`}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
