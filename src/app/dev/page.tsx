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
    <main className="flex-1 px-[clamp(0.5rem,1vw,1rem)]">
      <TrackedSection
        section="dev"
        className="relative flex min-h-[70svh] flex-col justify-end px-[clamp(0.5rem,3vw,4rem)] pt-28 pb-[clamp(2rem,5vw,5rem)]"
      >
        <ShapeMorph
          startAt={4}
          className="absolute top-24 right-[clamp(0.5rem,3vw,4rem)] size-[clamp(6rem,22vw,22rem)] text-blue-600"
        />
        <h1 className="relative text-[clamp(3.5rem,13vw,13rem)] leading-[0.9] font-semibold tracking-tight">
          Things
          <br />
          I’ve built
        </h1>
        <p className="relative mt-[clamp(1.25rem,2.5vw,2.5rem)] max-w-3xl text-[clamp(1.25rem,2.1vw,2.25rem)] leading-tight font-medium tracking-tight text-on-surface-muted">
          Desktop shells, shape morphing and web apps, all open source.
        </p>
      </TrackedSection>

      <ProjectCard
        project={expressiveShapes}
        theme={themes.shapes}
        layout="split"
        footnote={
          <code className="mt-3 block w-fit max-w-full overflow-x-auto rounded-2xl bg-[#00392a]/10 px-4 py-3 font-mono text-[clamp(0.875rem,1vw,1rem)]">
            pip install expressive-shapes
          </code>
        }
      >
        <figure className="flex flex-col items-center gap-6">
          <ShapeMorph holdMs={1100} className="aspect-square w-[min(80%,34rem)] text-[#004d36]" />
          <figcaption className="text-center text-[clamp(0.95rem,1.1vw,1.125rem)] opacity-80">
            Live, not a recording. Every shape morphing on this site was generated
            by this library.
          </figcaption>
        </figure>
      </ProjectCard>

      <ProjectCard project={zenithShell} theme={themes.zenith} layout="stacked">
        <div className="grid gap-[clamp(0.5rem,1vw,1rem)] sm:grid-cols-3">
          <Image
            src={`${ZENITH_SCREENSHOTS}/dashboard-m3-2.png`}
            alt="Zenith Shell dashboard with quick settings, notifications and an agenda over a red wallpaper"
            width={1920}
            height={1080}
            sizes="(min-width: 1800px) 1700px, 95vw"
            className="h-auto w-full rounded-[clamp(1rem,2.5vw,2.5rem)] sm:col-span-3"
          />
          {zenithGallery.map(({ file, alt }) => (
            <Image
              key={file}
              src={`${ZENITH_SCREENSHOTS}/${file}`}
              alt={alt}
              width={1920}
              height={1080}
              sizes="(min-width: 640px) 32vw, 95vw"
              className="h-auto w-full rounded-[clamp(1rem,2vw,2rem)]"
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
          sizes="(min-width: 1024px) 48vw, 95vw"
          placeholder="blur"
          className="relative h-auto w-full rounded-[clamp(1rem,2vw,2rem)] ring-1 ring-white/20"
        />
      </ProjectCard>

      <div className="flex justify-center pt-[clamp(2.5rem,6vw,6rem)]">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[clamp(1.25rem,2.1vw,2.25rem)] font-medium tracking-tight underline-offset-8 hover:underline"
        >
          Everything else on GitHub
          <ArrowIcon />
        </a>
      </div>
    </main>
  );
}
