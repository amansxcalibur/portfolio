import { ArrowIcon } from "@/components/icons";
import { TrackedSection } from "@/components/navigation/TrackedSection";
import { ShapeMorph } from "@/components/shapes/shapeMorph";

/** The pill sits centered over this section; see usePillAnimation. */
export function Hero() {
  return (
    <TrackedSection
      section="start"
      id="start"
      className="relative flex h-svh flex-col items-center justify-end overflow-hidden pb-[clamp(1.5rem,5svh,3.5rem)] text-center"
    >
      {/* Flat shapes leaning in from the corners, clear of the pill and the name. */}
      <div aria-hidden="true">
        <ShapeMorph
          startAt={2}
          holdMs={2400}
          className="absolute -bottom-[12vw] -left-[10vw] size-[clamp(9rem,34vw,30rem)] text-peach"
        />
        <ShapeMorph
          startAt={5}
          holdMs={1900}
          className="absolute -right-[8vw] bottom-[6vw] size-[clamp(6rem,20vw,18rem)] text-pop-blue"
        />
        <ShapeMorph
          startAt={0}
          holdMs={2900}
          className="absolute top-[18svh] right-[14vw] size-[clamp(2.5rem,6vw,5.5rem)] text-sun"
        />
      </div>

      <div className="relative flex flex-col items-center px-4">
        <p className="eyebrow animate-rise [animation-delay:150ms]">Art × code × motion</p>
        <h1 className="mt-3 animate-rise font-serif text-[clamp(2.25rem,4.2vw,3.75rem)] leading-none [animation-delay:250ms]">
          Aman <em>Valiyakath</em>
        </h1>
        <a
          href="#about"
          aria-label="Scroll to about"
          className="group mt-[clamp(1rem,3svh,2rem)] flex size-11 animate-rise items-center justify-center rounded-full bg-inverse text-on-inverse transition-[border-radius,scale] duration-300 ease-spring [animation-delay:400ms] hover:scale-110 hover:rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-surface"
        >
          <ArrowIcon className="size-4 rotate-135 animate-bob" />
        </a>
      </div>
    </TrackedSection>
  );
}
