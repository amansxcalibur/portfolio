import { Aurora } from "@/components/aurora";
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
      <Aurora variant="vibrant" />

      <div className="relative flex flex-col items-center px-4">
        <p className="eyebrow animate-rise [animation-delay:150ms]">
          Art <span className="text-glow-pink">×</span> code{" "}
          <span className="text-glow-amber">×</span> motion
        </p>
        <h1 className="mt-3 animate-rise font-serif text-[clamp(2.25rem,4.2vw,3.75rem)] leading-none [animation-delay:250ms]">
          Aman <em>Valiyakath</em>
        </h1>
        <a
          href="#about"
          aria-label="Scroll to about"
          className="group mt-[clamp(1rem,3svh,2rem)] flex size-11 animate-rise items-center justify-center rounded-full bg-glass ring-1 ring-on-surface/10 backdrop-blur-xl transition-[border-radius,background-color,color] duration-300 ease-spring [animation-delay:400ms] hover:rounded-xl hover:bg-inverse hover:text-on-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          <ArrowIcon className="size-4 rotate-135 animate-bob" />
        </a>
      </div>
    </TrackedSection>
  );
}
