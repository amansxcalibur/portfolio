import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { TrackedSection } from "@/components/navigation/TrackedSection";
import { ShapeMorph } from "@/components/shapes/shapeMorph";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-[clamp(0.75rem,2vw,1.5rem)]">
      <TrackedSection
        section="lost"
        className="flex min-h-svh flex-col items-center justify-center pt-24 pb-12 text-center"
      >
        <p className="eyebrow animate-rise">Error 404</p>
        {/* the zero is a shape, it keeps morphing while you're lost :0 */}
        <h1
          aria-label="404"
          className="mt-2 flex animate-rise items-center flex-display text-[clamp(7rem,26vw,18rem)] leading-none [animation-delay:80ms]"
        >
          4<ShapeMorph startAt={3} className="mx-[0.04em] size-[0.72em] text-pop" />4
        </h1>
        <p className="mt-4 max-w-md animate-rise text-[clamp(1rem,1.3vw,1.2rem)] text-on-surface-muted [animation-delay:160ms]">
          This page wandered off, or never existed in the first place.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex animate-rise items-center gap-2 rounded-full bg-inverse px-[1.2em] py-[0.6em] text-on-inverse transition-[filter] [animation-delay:240ms] hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          Take me home
          <ArrowIcon className="size-[0.9em] rotate-45" />
        </Link>
      </TrackedSection>
    </main>
  );
}
