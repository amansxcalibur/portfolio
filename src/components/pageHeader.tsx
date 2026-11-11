import type { ReactNode } from "react";
import { ShapeMorph } from "@/components/shapes/shapeMorph";

const SPECTRUM = ["var(--glow-blue)", "var(--glow-violet)", "var(--glow-pink)"];

type PageHeaderProps = {
  eyebrow: string;
  /** Serif headline. Wrap the accent in <em>. */
  title: ReactNode;
  lead: string;
  /** Which shape the morph in the corner begins on. */
  shapeStart?: number;
};

/** The opening of every inner page: label, serif headline, one line, and a lit shape. */
export function PageHeader({ eyebrow, title, lead, shapeStart = 0 }: PageHeaderProps) {
  return (
    <header className="relative px-[clamp(0.25rem,2vw,2rem)] pt-36 pb-[clamp(2rem,4vw,4rem)]">
      {/* The shape, and the light it throws: the same form blurred behind itself. */}
      <div
        aria-hidden="true"
        className="absolute top-28 right-[clamp(0.25rem,2vw,2rem)] size-[clamp(4.5rem,12vw,10rem)]"
      >
        <ShapeMorph
          startAt={shapeStart}
          gradient={SPECTRUM}
          className="absolute inset-0 scale-125 animate-[breathe_6s_ease-in-out_infinite] opacity-(--glow-strength) blur-2xl"
        />
        <ShapeMorph startAt={shapeStart} gradient={SPECTRUM} className="absolute inset-0" />
      </div>

      <p className="eyebrow relative animate-rise">{eyebrow}</p>
      <h1 className="relative mt-3 animate-rise font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] [animation-delay:80ms]">
        {title}
      </h1>
      <p className="relative mt-4 max-w-xl animate-rise text-[clamp(1rem,1.3vw,1.2rem)] text-on-surface-muted [animation-delay:160ms]">
        {lead}
      </p>
    </header>
  );
}
