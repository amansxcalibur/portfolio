import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { LoopVideo } from "@/components/loopVideo";
import { TrackedSection } from "@/components/navigation/TrackedSection";
import { ShapeMorph } from "@/components/shapes/shapeMorph";

const tileClass =
  "group/tile relative flex min-h-[60svh] flex-col justify-end overflow-hidden rounded-[clamp(2rem,4vw,4rem)] p-[clamp(1rem,2vw,2rem)] transition-[border-radius] duration-500 hover:rounded-[clamp(3rem,8vw,9rem)] md:min-h-[78svh]";

function TileLabel({ title, children }: { title: string; children: string }) {
  return (
    <span className="relative flex w-fit max-w-full flex-col gap-1 rounded-[clamp(1.5rem,2.5vw,2.5rem)] bg-inverse px-[clamp(1.25rem,2vw,2rem)] py-[clamp(0.75rem,1.4vw,1.5rem)] text-on-inverse">
      <span className="flex items-center gap-3 text-[clamp(2.25rem,4vw,4.5rem)] leading-none font-semibold tracking-tight">
        {title}
        <ArrowIcon className="size-[0.6em] transition-transform duration-300 group-hover/tile:translate-x-1 group-hover/tile:-translate-y-1" />
      </span>
      <span className="text-[clamp(0.95rem,1.25vw,1.25rem)] opacity-75">{children}</span>
    </span>
  );
}

export function ArtOrProject() {
  return (
    <TrackedSection
      section="art-or-project"
      className="grid gap-[clamp(0.5rem,1vw,1rem)] px-[clamp(0.5rem,1vw,1rem)] md:grid-cols-2"
    >
      <Link href="/art" className={`${tileClass} bg-blue-600`}>
        <LoopVideo
          src="/krita/intro.mp4"
          label="A painted landscape with a glowing light at its center, animating in a loop"
          className="absolute -inset-px size-[calc(100%+2px)] max-w-none object-cover"
        />
        <TileLabel title="art">Sketches and animation in Krita</TileLabel>
      </Link>

      <Link href="/dev" className={`${tileClass} items-end bg-[#a6f0cb]`}>
        <ShapeMorph
          startAt={1}
          className="absolute top-1/2 left-1/2 size-[min(70%,60svh)] -translate-x-1/2 -translate-y-1/2 text-[#004d36]"
        />
        <TileLabel title="dev">Desktop shells, shape morphing and web apps</TileLabel>
      </Link>
    </TrackedSection>
  );
}
