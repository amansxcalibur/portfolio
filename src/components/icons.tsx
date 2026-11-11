/** Points up-right by default. Rotate it with a class for other directions. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "size-[0.85em]"}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={className ?? "size-[0.85em]"}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

// The same stroke drawn three times, each a little off, as in hand-drawn animation.
const SQUIGGLE_FRAMES = [
  "M3 15c2-7 4.5-8 5.5-4.5S7 17 9.5 15.5 13 6.5 15 8s-1 8 1.5 7S19.5 11 21 9",
  "M3.3 14.6c1.8-6.6 4.6-8.4 5.6-4.4S6.8 17.4 9.4 15.8 12.8 6.1 15.2 7.7s-1.3 8.2 1.4 7.3S19.2 11.4 20.6 9.3",
  "M2.8 15.4c2.3-7.2 4.2-7.6 5.3-4.3S7.3 16.6 9.8 15.2 13.3 6.9 14.8 8.3s-.7 7.7 1.7 6.8S19.8 10.7 21.3 8.7",
];

/**
 * A quick scribble that "boils": it swaps between redrawn frames twice a
 * second. Without motion only the first frame shows.
 */
export function SquiggleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "size-[0.85em]"}
    >
      {SQUIGGLE_FRAMES.map((d, frame) => (
        <path
          key={d}
          d={d}
          className="animate-boil"
          style={{ opacity: frame === 0 ? 1 : 0, animationDelay: `${-((3 - frame) % 3) * 0.5}s` }}
        />
      ))}
    </svg>
  );
}
