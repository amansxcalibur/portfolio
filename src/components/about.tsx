import Link from "next/link";
import { LoopVideo } from "@/components/loopVideo";
import { TrackedSection } from "@/components/navigation/TrackedSection";
import { ShapeMorph } from "@/components/shapes/shapeMorph";

const inlineLinkClass =
  "group/word relative inline-flex items-baseline gap-[0.2em] whitespace-nowrap underline decoration-[0.06em] underline-offset-[0.14em] transition-colors";

/** A small media chip set into the line of text, tilted like a sticker. */
const chipClass =
  "inline-block h-[0.82em] translate-y-[0.08em] overflow-hidden rounded-[0.18em] align-baseline ring-1 ring-black/10 transition-transform duration-300";

export default function AboutMe() {
  return (
    <TrackedSection
      section="about"
      id="about"
      className="flex min-h-svh items-center justify-center px-[clamp(1.25rem,5vw,6rem)] py-32"
    >
      <div className="grid w-full max-w-6xl gap-x-12 gap-y-8 md:grid-cols-[10rem_1fr]">
        <p className="font-mono text-xs tracking-wide text-on-surface-muted uppercase md:pt-4">
          (01) About
        </p>

        <div>
          <p className="font-serif text-[clamp(1.85rem,3.6vw,3.4rem)] leading-[1.12] text-on-surface">
            I enjoy exploring the intersection of{" "}
            <Link
              href="/art"
              className={`${inlineLinkClass} decoration-blue-600/40 hover:text-blue-600`}
            >
              <span className={`${chipClass} aspect-[4/3] -rotate-6 group-hover/word:rotate-3`}>
                <LoopVideo
                  src="/krita/intro.mp4"
                  label="A painted landscape, animating in a loop"
                  className="size-full object-cover"
                />
              </span>
              <em>art</em>
            </Link>{" "}
            and{" "}
            <Link
              href="/dev"
              className={`${inlineLinkClass} decoration-[#00795a]/40 hover:text-[#00795a]`}
            >
              <span
                className={`${chipClass} aspect-square rotate-6 bg-[#a6f0cb] p-[0.06em] text-[#004d36] group-hover/word:-rotate-6`}
              >
                <ShapeMorph tempo="loader" className="size-full" />
              </span>
              <span className="font-mono text-[0.78em] tracking-tight">programming</span>
            </Link>
            . Whether I’m building desktop environments and UI tooling for Linux
            or experimenting with visual art and animation, I’m drawn to whatever
            lets me <em>combine engineering with creative expression.</em>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-[clamp(0.95rem,1.1vw,1.1rem)] text-on-surface-muted">
            <span className="inline-block -rotate-2 rounded-md bg-inverse px-2.5 py-1 font-mono text-xs tracking-wide text-on-inverse uppercase">
              Currently
            </span>
            exploring software, expressive interfaces &amp; motion.
          </div>
        </div>
      </div>
    </TrackedSection>
  );
}
