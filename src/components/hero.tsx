import { ArrowIcon } from "@/components/icons";
import { TrackedSection } from "@/components/navigation/TrackedSection";

/** The pill sits centered over this section; see usePillAnimation. */
export function Hero() {
  return (
    <TrackedSection
      section="start"
      id="start"
      className="relative flex h-svh flex-col items-center justify-end overflow-hidden pb-[clamp(1.5rem,5svh,3.5rem)] text-center"
    >
      <div className="relative flex flex-col items-center px-4">
        <h1 className="animate-rise font-serif text-[clamp(2.25rem,4.2vw,3.75rem)] leading-none [animation-delay:250ms]">
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
