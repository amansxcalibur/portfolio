import type { Metadata } from "next";
import Image from "next/image";
import { ProjectCard, type ProjectTheme } from "@/components/dev/projectCard";
import { ZenithLogo } from "@/components/dev/zenithLogo";
import { ArrowIcon } from "@/components/icons";
import { TrackedSection } from "@/components/navigation/TrackedSection";
import { PageHeader } from "@/components/pageHeader";
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
    // the ring keeps the black card's edge visible on dark surfaces
    card: "bg-black text-white ring-1 ring-white/10",
    button: "bg-white text-black",
    chip: "bg-white/15",
  },
} satisfies Record<string, ProjectTheme>;

export default function Dev() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-[clamp(0.75rem,2vw,1.5rem)]">
      <TrackedSection section="dev">
        <PageHeader
          eyebrow="Dev / open source"
          title={
            <>
              Things <em>I’ve built</em>
            </>
          }
          lead="Desktop shells, shape morphing and web apps, all open source."
          shapeStart={4}
        />
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

      <ProjectCard
        project={zenithShell}
        theme={themes.zenith}
        layout="stacked"
        aside={<ZenithLogo className="h-full max-w-full [--logo-bg:#ffdad5]" />}
      >
        {/* three 16:9 thumbs plus gaps run a bit taller than the big one, so it fills the rows and crops */}
        <div className="grid gap-2 sm:grid-cols-4">
          <Image
            src={`${ZENITH_SCREENSHOTS}/dashboard-m3-2.png`}
            alt="Zenith Shell dashboard with quick settings, notifications and an agenda over a red wallpaper"
            width={1920}
            height={1080}
            sizes="(min-width: 1152px) 800px, 95vw"
            className="h-auto w-full rounded-lg object-cover sm:col-span-3 sm:row-span-3 sm:h-full"
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

      <div className="mx-auto mt-16 h-px w-2/3 bg-on-surface/15" />
      <div className="flex justify-center pt-10">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 flex-accent text-[clamp(1.25rem,2vw,1.75rem)] font-medium underline-offset-8 hover:underline"
        >
          Everything else on GitHub
          <ArrowIcon />
        </a>
      </div>
    </main>
  );
}
