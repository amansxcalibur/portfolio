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
