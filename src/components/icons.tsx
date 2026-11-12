/** points up-right, rotate it with a class */
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

// same stroke drawn three times, slightly off, like hand-drawn animation
const SQUIGGLE_FRAMES = [
  "M3 15c2-7 4.5-8 5.5-4.5S7 17 9.5 15.5 13 6.5 15 8s-1 8 1.5 7S19.5 11 21 9",
  "M3.3 14.6c1.8-6.6 4.6-8.4 5.6-4.4S6.8 17.4 9.4 15.8 12.8 6.1 15.2 7.7s-1.3 8.2 1.4 7.3S19.2 11.4 20.6 9.3",
  "M2.8 15.4c2.3-7.2 4.2-7.6 5.3-4.3S7.3 16.6 9.8 15.2 13.3 6.9 14.8 8.3s-.7 7.7 1.7 6.8S19.8 10.7 21.3 8.7",
];

/** a scribble that "boils" by swapping frames @ 2fps. stays still under reduced motion */
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

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className ?? "size-[0.85em]"}
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      className={className ?? "size-[0.85em]"}
    >
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" />
    </svg>
  );
}
