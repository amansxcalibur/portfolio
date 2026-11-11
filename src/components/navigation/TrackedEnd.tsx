import { Aurora } from "@/components/aurora";
import { SOCIAL_LINKS } from "@/content/links";
import { TrackedSection } from "./TrackedSection";

export function TrackedEnd() {
  return (
    <TrackedSection
      section="end"
      id="end"
      // Exactly viewport height or taller, so the pill can finish climbing to center.
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      <Aurora variant="calm" className="h-[60svh]" />
      {/* Equal side columns keep the links centered while the last word flexes. */}
      <footer className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-x-8 gap-y-3 p-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,1.5vw,1.5rem)] text-on-surface-muted max-sm:grid-cols-1 max-sm:justify-items-center">
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
          <em className="font-serif text-[1.15em]">Be</em>{" "}
          <span className="inline-block animate-flex-loop text-on-surface">expressive</span>
        </p>
      </footer>
    </TrackedSection>
  );
}
