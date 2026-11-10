import type { Metadata } from "next";
import Image from "next/image";
import { ProjectCard, type ProjectTheme } from "@/components/dev/projectCard";
import { ArrowIcon } from "@/components/icons";
import { TrackedSection } from "@/components/navigation/TrackedSection";
import { ShapeMorph } from "@/components/shapes/shapeMorph";
import { GITHUB_URL } from "@/content/links";
import { bunkmate, expressiveShapes, zenithShell } from "@/content/projects";
import bunkmateScreenshot from "../../../public/dev/bunkmate.png";

export const metadata: Metadata = {
  title: "Dev",
  description:
    "Software by Aman Valiyakath: expressive-shapes, Zenith Shell and Bunkmate.",
};

const ZENITH_SCREENSHOTS =
  "https://amansxcalibur.github.io/zenith-resources/reverse-bar/screenshots";

const zenithGallery = [
  { file: "launcher-1.png", alt: "Zenith Shell app launcher over a forest illustration" },
  { file: "player-1.png", alt: "Zenith Shell media player over a photo of two minidiscs" },
  { file: "wallpaper-2.png", alt: "Zenith Shell wallpaper picker showing a grid of images" },
];

const themes = {
  shapes: {
    card: "bg-[#a6f0cb] text-[#00392a]",
    button: "bg-[#00392a] text-[#a6f0cb]",
    chip: "bg-[#00392a]/10",
  },
  zenith: {
    card: "bg-[#ffdad5] text-[#561e19]",
    button: "bg-[#561e19] text-[#ffdad5]",
    chip: "bg-[#561e19]/10",
  },
  bunkmate: {
    card: "bg-black text-white",
    button: "bg-white text-black",
    chip: "bg-white/15",
  },
} satisfies Record<string, ProjectTheme>;

export default function Dev() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-[clamp(0.75rem,2vw,1.5rem)]">
      <TrackedSection
        section="dev"
        className="relative flex flex-col justify-end px-[clamp(0.25rem,2vw,2rem)] pt-36 pb-[clamp(2rem,4vw,4rem)]"
      >
        <ShapeMorph
          startAt={4}
          className="absolute top-28 right-[clamp(0.25rem,2vw,2rem)] size-[clamp(4.5rem,12vw,10rem)] text-blue-600"
        />
        <p className="relative font-mono text-xs tracking-wide text-on-surface-muted uppercase">
          Dev / open source
        </p>
        <h1 className="relative mt-3 font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95]">
          Things <em>I’ve built</em>
        </h1>
        <p className="relative mt-4 max-w-xl text-[clamp(1rem,1.3vw,1.2rem)] text-on-surface-muted">
          Desktop shells, shape morphing and web apps, all open source.
        </p>
      </TrackedSection>

      <ProjectCard
        project={expressiveShapes}
        theme={themes.shapes}
        layout="split"
        footnote={
          <code className="mt-3 block w-fit max-w-full overflow-x-auto rounded-md bg-[#00392a]/10 px-3 py-2 font-mono text-sm">
            pip install expressive-shapes
          </code>
        }
      >
        <figure className="flex flex-col items-center gap-4">
          <ShapeMorph holdMs={1100} className="aspect-square w-[min(70%,20rem)] text-[#004d36]" />
          <figcaption className="max-w-xs text-center text-sm opacity-80">
            Live, not a recording. Every shape morphing on this site was generated
            by this library.
          </figcaption>
        </figure>
      </ProjectCard>

      <ProjectCard project={zenithShell} theme={themes.zenith} layout="stacked">
        {/* Three 16:9 thumbs stacked in one column match the height of a 16:9 image three columns wide. */}
        <div className="grid gap-2 sm:grid-cols-4">
          <Image
            src={`${ZENITH_SCREENSHOTS}/dashboard-m3-2.png`}
            alt="Zenith Shell dashboard with quick settings, notifications and an agenda over a red wallpaper"
            width={1920}
            height={1080}
            sizes="(min-width: 1152px) 800px, 95vw"
            className="h-auto w-full rounded-lg sm:col-span-3 sm:row-span-3"
          />
          {zenithGallery.map(({ file, alt }) => (
            <Image
              key={file}
              src={`${ZENITH_SCREENSHOTS}/${file}`}
              alt={alt}
              width={1920}
              height={1080}
              sizes="(min-width: 640px) 270px, 95vw"
              className="h-auto w-full rounded-lg"
            />
          ))}
        </div>
      </ProjectCard>

      <ProjectCard project={bunkmate} theme={themes.bunkmate} layout="split">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-0 size-[min(60vw,48rem)] -translate-y-1/2 translate-x-1/4 bg-[radial-gradient(circle,#22d3ee66,#2563eb33_45%,transparent_70%)]"
        />
        <Image
          src={bunkmateScreenshot}
          alt="The bunkmate.in landing page, with BUNK-MATE in huge white letters under a glowing blue orb"
          sizes="(min-width: 1024px) 540px, 95vw"
          placeholder="blur"
          className="relative h-auto w-full rounded-lg ring-1 ring-white/20"
        />
      </ProjectCard>

      <div className="flex justify-center pt-16">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-serif text-[clamp(1.5rem,2.2vw,2rem)] italic underline-offset-8 hover:underline"
        >
          Everything else on GitHub
          <ArrowIcon />
        </a>
      </div>
    </main>
  );
}
