import type { Metadata } from "next";
import Image from "next/image";
import { LoopVideo } from "@/components/loopVideo";
import { TrackedSection } from "@/components/navigation/TrackedSection";
import { ShapeMorph } from "@/components/shapes/shapeMorph";
import endorsi from "../../../public/krita/endorsi.png";

export const metadata: Metadata = {
  title: "Art",
  description: "Sketches and animation made in Krita.",
};

// Same rounding as the project cards on /dev.
const mediaClass = "block w-full rounded-[clamp(1rem,2vw,1.75rem)] bg-white";
const gap = "gap-3";

export default function Art() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-[clamp(0.75rem,2vw,1.5rem)]">
      <TrackedSection section="art">
        {/* Header mirrors /dev: the shape top right, a sans headline with a serif accent. */}
        <header className="relative px-[clamp(0.25rem,2vw,2rem)] pt-36 pb-[clamp(2rem,4vw,4rem)]">
          <ShapeMorph
            startAt={6}
            className="absolute top-28 right-[clamp(0.25rem,2vw,2rem)] size-[clamp(4.5rem,12vw,10rem)] text-blue-600"
          />
          <h1 className="relative text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] font-medium tracking-tight">
            Krita <em className="font-serif font-normal tracking-normal">my beloved</em>
          </h1>
        </header>

        {/* Sized by priority: the painting leads, then the portrait beside the two line tests. */}
        <div className={`flex flex-col ${gap}`}>
          <LoopVideo
            src="/krita/intro.mp4"
            label="A painted landscape with a glowing light at its center, animating in a loop"
            className={`${mediaClass} aspect-video object-cover`}
          />
          {/* At 2:3 the portrait nearly matches the two stacked 16:9 clips; object-cover trims the rest. */}
          <div className={`grid ${gap} md:grid-cols-[2fr_3fr]`}>
            <Image
              src={endorsi}
              alt="Endorsi: a loose greyscale sketch, one hand on the hip and the other raised to the brow"
              sizes="(min-width: 1152px) 450px, (min-width: 768px) 40vw, 100vw"
              placeholder="blur"
              className={`${mediaClass} h-auto md:h-full md:object-cover`}
            />
            <div className={`flex flex-col justify-between ${gap}`}>
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
