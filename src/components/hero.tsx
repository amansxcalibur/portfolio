import { TrackedSection } from "@/components/navigation/TrackedSection";

/** The pill sits centered over this section; see usePillAnimation. */
export function Hero() {
  return (
    <TrackedSection
      section="start"
      id="start"
      className="relative flex h-svh flex-col items-center justify-end overflow-hidden pb-[9svh] text-center"
    >
      <div className="relative px-4">
        <h1 className="font-round text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-medium tracking-tight">
          Aman Valiyakath
        </h1>
        <p className="mt-2 font-mono text-[clamp(1.75rem,2vw,1.875rem)] tracking-wide text-on-surface-muted uppercase">
          👇
        </p>
      </div>
    </TrackedSection>
  );
}
