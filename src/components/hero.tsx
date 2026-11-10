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
        <h1 className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] leading-none">
          Aman Valiyakath
        </h1>
        <p className="mt-2 font-mono text-[clamp(0.75rem,0.9vw,0.875rem)] tracking-wide text-on-surface-muted uppercase">
          art <span className="font-serif text-[1.4em] normal-case italic">&amp;</span>{" "}
          programming, in equal measure
        </p>
      </div>
    </TrackedSection>
  );
}
