import { SOCIAL_LINKS } from "@/content/links";
import { TrackedSection } from "./TrackedSection";

export function TrackedEnd() {
  return (
    <TrackedSection
      section="end"
      id="end"
      // Exactly viewport height or taller, so the pill can finish climbing to center.
      className="flex min-h-svh flex-col justify-end"
    >
      <footer className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 p-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,1.5vw,1.5rem)] text-on-surface-muted max-sm:flex-col">
        <p>&copy; 2026</p>
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
        <p>Be expressive</p>
      </footer>
    </TrackedSection>
  );
}
