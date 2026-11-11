import type { ReactNode } from "react";
import { ShapeMorph } from "@/components/shapes/shapeMorph";

type PageHeaderProps = {
  eyebrow: string;
  /** Headline. Wrap the accent in <em>. */
  title: ReactNode;
  lead: string;
  /** Which shape the morph in the corner begins on. */
  shapeStart?: number;
};

/** The opening of every inner page: label, headline, one line, and a shape. */
export function PageHeader({ eyebrow, title, lead, shapeStart = 0 }: PageHeaderProps) {
  return (
    <header className="relative px-[clamp(0.25rem,2vw,2rem)] pt-36 pb-[clamp(2rem,4vw,4rem)]">
      <ShapeMorph
        startAt={shapeStart}
        className="absolute top-28 right-[clamp(0.25rem,2vw,2rem)] size-[clamp(4.5rem,12vw,10rem)] text-pop"
      />

      <p className="eyebrow relative animate-rise">{eyebrow}</p>
      <h1 className="relative mt-3 animate-rise flex-display text-[clamp(3.25rem,7.5vw,7rem)] leading-[0.95] [animation-delay:80ms]">
        {title}
      </h1>
      <p className="relative mt-4 max-w-xl animate-rise text-[clamp(1rem,1.3vw,1.2rem)] text-on-surface-muted [animation-delay:160ms]">
        {lead}
      </p>
    </header>
  );
}
