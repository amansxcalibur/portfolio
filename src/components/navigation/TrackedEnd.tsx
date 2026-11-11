import { SOCIAL_LINKS } from "@/content/links";
import { TrackedSection } from "./TrackedSection";

export function TrackedEnd() {
  return (
    <TrackedSection
      section="end"
      id="end"
      // Shorter than the viewport; the pill's climb to center is measured against this height.
      className="flex min-h-[80svh] flex-col justify-end"
    >
      {/* Equal side columns keep the links centered while the last word flexes. */}
      <footer className="mx-[clamp(1rem,2vw,2rem)] grid border-t border-on-surface/15 grid-cols-[1fr_auto_1fr] items-center gap-x-8 gap-y-3 py-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,1.5vw,1.5rem)] text-on-surface-muted max-sm:grid-cols-1 max-sm:justify-items-center">
        <p>&copy; 2026 Aman Valiyakath</p>
        <ul className="flex flex-wrap justify-center gap-x-[clamp(1rem,3vw,3rem)]">
          {SOCIAL_LINKS.filter(({ href }) => href).map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 transition-colors hover:text-on-surface hover:underline"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="whitespace-nowrap sm:text-right">
          <em className="flex-accent">Be</em>{" "}
          <span className="inline-block animate-flex-loop text-on-surface">expressive</span>
        </p>
      </footer>
    </TrackedSection>
  );
}
