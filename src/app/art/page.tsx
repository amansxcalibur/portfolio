import type { Metadata } from "next";
import Image from "next/image";
import { LoopVideo } from "@/components/loopVideo";
import { TrackedSection } from "@/components/navigation/TrackedSection";
import endorsi from "../../../public/krita/endorsi.png";

export const metadata: Metadata = {
  title: "Art",
  description: "Sketches and animation made in Krita.",
};

const mediaClass = "block w-full rounded-[clamp(0.75rem,1.5vw,1.25rem)] bg-white";

export default function Art() {
  return (
    <main className="flex-1">
      <TrackedSection
        section="art"
        className="rounded-b-[clamp(1.25rem,3vw,2.5rem)] bg-blue-600 px-[clamp(0.5rem,1.5vw,1.5rem)] pt-28 pb-[clamp(0.5rem,1.5vw,1.5rem)] text-white"
      >
        <div className="mx-auto flex max-w-[1680px] flex-col gap-[clamp(0.5rem,1.5vw,1.5rem)]">
          <h1 className="px-[clamp(0.5rem,1.5vw,1.5rem)] pb-[clamp(1rem,3vw,3rem)] font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95]">
            Krita <em>my beloved</em>
          </h1>
          <LoopVideo
            src="/krita/intro.mp4"
            label="A painted landscape with a glowing light at its center, animating in a loop"
            className={`${mediaClass} aspect-video object-cover`}
          />
          {/* At 2:3 the portrait nearly matches the two stacked 16:9 clips; object-cover trims the rest. */}
          <div className="grid gap-[clamp(0.5rem,1.5vw,1.5rem)] md:grid-cols-[2fr_3fr]">
            <Image
              src={endorsi}
              alt="Endorsi: a loose greyscale sketch, one hand on the hip and the other raised to the brow"
              sizes="(min-width: 768px) 40vw, 100vw"
              placeholder="blur"
              className={`${mediaClass} h-auto md:h-full md:object-cover`}
            />
            <div className="flex flex-col justify-between gap-[clamp(0.5rem,1.5vw,1.5rem)]">
              <LoopVideo
                src="/krita/sight_output.mp4"
                label="Line art animation of a figure seen beneath a large curved form"
                className={`${mediaClass} aspect-video object-cover`}
              />
              <LoopVideo
                src="/krita/confrontation.mp4"
                label="Rough line art animation of a figure leaping with a long sword"
                className={`${mediaClass} aspect-video object-cover`}
              />
            </div>
          </div>
        </div>
      </TrackedSection>
    </main>
  );
}
