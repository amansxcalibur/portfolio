import { TrackedSection } from "@/components/navigation/TrackedSection";
import { ShapeMorph } from "@/components/shapes/shapeMorph";

/** The pill sits centered over this section; see usePillAnimation. */
export function Hero() {
  return (
    <TrackedSection
      section="start"
      id="start"
      className="relative flex h-svh flex-col items-center justify-end overflow-hidden pb-[9svh] text-center"
    >
      <ShapeMorph
        startAt={2}
        tempo="ambient"
        className="absolute -top-[14vmin] -right-[12vmin] size-[62vmin] text-surface-dim"
      />
      <ShapeMorph
        startAt={5}
        tempo="ambient"
        className="absolute -bottom-[18vmin] -left-[14vmin] size-[70vmin] text-surface-dim"
      />
      <div className="relative px-4">
        <h1 className="text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold tracking-tight">
          Aman Valiyakath
        </h1>
        <p className="mt-1 text-[clamp(1rem,1.5vw,1.5rem)] text-on-surface-muted">
          Art and programming, in equal measure
        </p>
      </div>
    </TrackedSection>
  );
}
