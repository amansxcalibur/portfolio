import type { ReactNode } from "react";
import { ShapeMorph } from "@/components/shapes/shapeMorph";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  /** which shape the corner morph starts on */
  shapeStart?: number;
};

export function PageHeader({ eyebrow, title, lead, shapeStart = 0 }: PageHeaderProps) {
  return (
    <header className="px-[clamp(0.25rem,2vw,2rem)] pt-36 pb-[clamp(2rem,4vw,4rem)]">
      <div className="relative">
        <div className="pointer-events-none absolute right-0 flex items-center max-sm:-top-8 sm:inset-y-0">
          <ShapeMorph startAt={shapeStart} className="size-[clamp(4.5rem,12vw,10rem)] text-pop" />
        </div>

        <p className="eyebrow relative animate-rise">{eyebrow}</p>
        <h1 className="relative mt-3 animate-rise flex-display text-[clamp(3.25rem,7.5vw,7rem)] leading-[0.95] [animation-delay:80ms]">
          {title}
        </h1>
        <p className="relative mt-4 max-w-xl animate-rise text-[clamp(1rem,1.3vw,1.2rem)] text-on-surface-muted [animation-delay:160ms]">
          {lead}
        </p>
      </div>
    </header>
  );
}
