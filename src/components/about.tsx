"use client";

import { useState } from "react";
import Link from "next/link";
import { FlexWords, words } from "@/components/flexWords";
import { LoopVideo } from "@/components/loopVideo";
import { TrackedSection } from "@/components/navigation/TrackedSection";
import { ShapeStack, type StackFocus } from "@/components/shapes/shapeStack";
import { ShapeMorph } from "@/components/shapes/shapeMorph";


const inlineLinkClass =
  "group/word relative inline-flex items-baseline gap-[0.2em] whitespace-nowrap underline decoration-[0.06em] underline-offset-[0.14em] transition-colors";

const chipClass =
  "inline-block h-[0.82em] translate-y-[0.08em] overflow-hidden rounded-[0.18em] align-baseline ring-1 ring-black/10 transition-transform duration-300";

export default function AboutMe() {
  const [focus, setFocus] = useState<StackFocus>("none");
  const focusOn = (layer: StackFocus) => ({
    onPointerEnter: () => setFocus(layer),
    onPointerLeave: () => setFocus("none"),
    onFocus: () => setFocus(layer),
    onBlur: () => setFocus("none"),
  });

  return (
    <TrackedSection
      section="about"
      id="about"
      className="flex min-h-svh items-center justify-center px-[clamp(1.25rem,5vw,6rem)] py-32"
    >
      <div className="grid w-full max-w-6xl items-center gap-x-[clamp(2rem,5vw,5rem)] gap-y-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <ShapeStack focus={focus} className="w-full max-md:mx-auto max-md:max-w-[22rem]" />

        <div>
          <p className="eyebrow mb-5">About</p>
          <FlexWords className="text-[clamp(1.6rem,2.9vw,2.75rem)] leading-[1.15] font-[450] tracking-tight text-on-surface">
            {words("I enjoy exploring the intersection of")}{" "}
            <Link
              href="/art"
              {...focusOn("art")}
              className={`${inlineLinkClass} decoration-pop hover:text-pop`}
            >
              <span className={`${chipClass} aspect-4/3 -rotate-6 group-hover/word:rotate-3`}>
                <LoopVideo
                  src="/krita/intro.mp4"
                  label="A painted landscape, animating in a loop"
                  className="size-full object-cover"
                />
              </span>
              <em className="flex-accent font-semibold">art</em>
            </Link>{" "}
            {words("and")}{" "}
            <Link
              href="/dev"
              {...focusOn("code")}
              className={`${inlineLinkClass} decoration-pop-2 hover:text-pop`}
            >
              <span
                className={`${chipClass} aspect-square rotate-6 bg-pop-2 p-[0.06em] text-on-pop-2 group-hover/word:-rotate-6`}
              >
                <ShapeMorph tempo="loader" className="size-full" />
              </span>
              <span className="font-mono text-[0.78em] tracking-tight">programming</span>
            </Link>
            {words(
              ". Whether I’m building desktop environments and UI tooling for Linux or experimenting with visual art and animation, I’m drawn to whatever lets me",
            )}{" "}
            <strong className="font-semibold">combine engineering with creative expression.</strong>
          </FlexWords>

          <div className="mt-10 h-px w-full bg-on-surface/15" />
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[clamp(0.95rem,1.1vw,1.1rem)] text-on-surface-muted">
            <span className="inline-block -rotate-2 rounded-full bg-inverse px-3 py-1 font-mono text-xs tracking-wide text-on-inverse uppercase">
              Currently
            </span>
            exploring software, expressive interfaces &amp; motion.
          </div>
        </div>
      </div>
    </TrackedSection>
  );
}
