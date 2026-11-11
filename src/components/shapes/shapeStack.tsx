import { ShapeMorph } from "./shapeMorph";

/** Which link the shapes are leaning towards, if any. */
export type StackFocus = "none" | "art" | "code";

const base = "absolute transition-[scale,rotate] duration-700 ease-spring";

/**
 * A cluster of flat Material shapes in the site's pop colors. Blue stands for
 * art and mint for code: each swells when its word is hovered.
 */
export function ShapeStack({
  focus,
  className,
}: {
  focus: StackFocus;
  className?: string;
}) {
  const art = focus === "art";
  const code = focus === "code";

  return (
    <div aria-hidden="true" className={`relative aspect-square ${className ?? ""}`}>
      <ShapeMorph
        startAt={6}
        holdMs={2200}
        className={`${base} top-[14%] left-[18%] size-[64%] text-pop-blue ${
          art ? "scale-110 -rotate-6" : code ? "scale-90" : ""
        }`}
      />
      <ShapeMorph
        startAt={1}
        holdMs={2600}
        className={`${base} top-[4%] right-[2%] size-[32%] text-peach ${art ? "scale-110 rotate-12" : ""}`}
      />
      <ShapeMorph
        startAt={3}
        holdMs={1900}
        className={`${base} bottom-[6%] left-[2%] size-[42%] text-mint ${
          code ? "scale-125 rotate-12" : art ? "scale-90" : ""
        }`}
      />
      <ShapeMorph
        startAt={5}
        holdMs={3000}
        className={`${base} right-[12%] bottom-[10%] size-[18%] text-sun ${code ? "scale-125 -rotate-12" : ""}`}
      />
    </div>
  );
}
