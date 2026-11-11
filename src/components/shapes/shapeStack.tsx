import { ShapeMorph } from "./shapeMorph";

/** Which link the shapes are leaning towards, if any. */
export type StackFocus = "none" | "art" | "code";

const base = "absolute transition-[scale,rotate] duration-700 ease-spring";

/**
 * A cluster of flat Material shapes in the theme's pop colors. The largest
 * stands for art and the second for code: each swells when its word is hovered.
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
        className={`${base} top-[14%] left-[18%] size-[64%] text-pop ${
          art ? "scale-110 -rotate-6" : code ? "scale-90" : ""
        }`}
      />
      <ShapeMorph
        startAt={1}
        holdMs={2600}
        className={`${base} top-[4%] right-[2%] size-[32%] text-pop-3 ${art ? "scale-110 rotate-12" : ""}`}
      />
      <ShapeMorph
        startAt={3}
        holdMs={1900}
        className={`${base} bottom-[6%] left-[2%] size-[42%] text-pop-2 ${
          code ? "scale-125 rotate-12" : art ? "scale-90" : ""
        }`}
      />
      <ShapeMorph
        startAt={5}
        holdMs={3000}
        className={`${base} right-[12%] bottom-[10%] size-[18%] text-pop-4 ${code ? "scale-125 -rotate-12" : ""}`}
      />
    </div>
  );
}
