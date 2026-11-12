import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { LoopVideo } from "@/components/loopVideo";
import { TrackedSection } from "@/components/navigation/TrackedSection";
import { ShapeMorph } from "@/components/shapes/shapeMorph";
import { bunkmate, expressiveShapes, zenithShell } from "@/content/projects";
import bunkmateScreenshot from "../../public/dev/bunkmate.png";

type Entry = {
  title: string;
  kind: "art" | "dev";
  blurb: string;
  href: string;
  /** tool or stack, shown on wide screens */
  meta: string;
  thumb: ReactNode;
};

const thumbMedia = "size-full object-cover";

const ENTRIES: Entry[] = [
  {
    title: expressiveShapes.name,
    kind: "dev",
    blurb: "Shape morphing library for Python",
    href: `/dev#${expressiveShapes.slug}`,
    meta: "Python",
    thumb: (
      <div className="flex size-full items-center justify-center bg-[#a6f0cb] text-[#004d36]">
        <ShapeMorph startAt={3} className="size-[70%]" />
      </div>
    ),
  },
  {
    title: zenithShell.name,
    kind: "dev",
    blurb: "Desktop shell for i3wm and sway",
    href: `/dev#${zenithShell.slug}`,
    meta: "Python · GTK",
    thumb: (
      <Image
        src="https://amansxcalibur.github.io/zenith-resources/reverse-bar/screenshots/dashboard-m3-2.png"
        alt=""
        width={320}
        height={180}
        sizes="12rem"
        className={thumbMedia}
      />
    ),
  },
  {
    title: "Krita sketches",
    kind: "art",
    blurb: "Paintings and line-art animation",
    href: "/art",
    meta: "Krita",
    thumb: (
      <LoopVideo
        src="/krita/sight_output.mp4"
        label="Line art animation of a figure"
        className={`${thumbMedia} bg-white`}
      />
    ),
  },
  {
    title: bunkmate.name,
    kind: "dev",
    blurb: "Attendance tracker with 1,000+ monthly users",
    href: `/dev#${bunkmate.slug}`,
    meta: "Next.js",
    thumb: (
      <Image src={bunkmateScreenshot} alt="" sizes="12rem" className={thumbMedia} />
    ),
  },
];

const KIND_STYLE = {
  art: "bg-blue-600 text-white",
  dev: "bg-[#a6f0cb] text-[#00392a]",
};

export function SelectedWork() {
  return (
    <TrackedSection
      section="work"
      id="work"
      className="flex justify-center px-[clamp(1.25rem,5vw,6rem)] pb-32"
    >
      <div className="w-full max-w-6xl">
        <h2 className="mb-6 font-round text-[clamp(1.25rem,1.8vw,1.6rem)] font-medium tracking-tight text-on-surface-muted">
          Selected work
        </h2>

        <ol className="border-t border-on-surface/15">
          {ENTRIES.map((entry, index) => (
            <li key={entry.title} className="border-b border-on-surface/15">
              <Link
                href={entry.href}
                className="group/row grid grid-cols-[2rem_1fr_auto] items-center gap-x-4 py-5 sm:grid-cols-[2.5rem_1fr_auto_7rem] sm:gap-x-6"
              >
                <span className="font-mono text-xs text-on-surface-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span className="flex items-center gap-3">
                    <span className="truncate text-[clamp(1.5rem,2.4vw,2.2rem)] leading-tight font-medium tracking-tight transition-[font-weight,translate] duration-300 group-hover/row:translate-x-1 group-hover/row:font-bold">
                      {entry.title}
                    </span>
                    <span
                      className={`shrink-0 -rotate-3 rounded px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wide uppercase transition-transform group-hover/row:rotate-3 ${KIND_STYLE[entry.kind]}`}
                    >
                      {entry.kind}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-on-surface-muted">
                    {entry.blurb}
                  </span>
                </span>

                <span className="flex items-center gap-4">
                  <span className="font-mono text-xs text-on-surface-muted max-sm:hidden">
                    {entry.meta}
                  </span>
                  <ArrowIcon className="size-4 transition-transform duration-300 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 sm:hidden" />
                </span>

                <span className="relative aspect-4/3 w-28 overflow-hidden rounded-lg ring-1 ring-on-surface/10 transition-transform duration-300 group-hover/row:-rotate-3 group-hover/row:scale-105 max-sm:hidden">
                  {entry.thumb}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </TrackedSection>
  );
}
