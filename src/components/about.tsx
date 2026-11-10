import Link from "next/link";
import { TrackedSection } from "@/components/navigation/TrackedSection";

const inlinePillClass =
  "inline-block rounded-full bg-blue-600 px-[0.6em] leading-[1.25] text-white transition-[border-radius,background-color] hover:rounded-2xl hover:bg-blue-700";

export default function AboutMe() {
  return (
    <TrackedSection
      section="about"
      id="about"
      className="flex min-h-svh items-center justify-center px-[clamp(1rem,4vw,5rem)] py-32"
    >
      <div className="w-full max-w-[1400px] space-y-[0.6em] text-[clamp(1.75rem,4.2vw,4rem)] leading-[1.2] font-medium tracking-tight text-on-surface-muted">
        <p>
          I enjoy exploring the intersection of{" "}
          <Link href="/art" className={inlinePillClass}>
            ART
          </Link>{" "}
          🖌️ and{" "}
          <Link href="/dev" className={inlinePillClass}>
            programming.
          </Link>{" "}
          Whether I’m building desktop environments and UI tooling for Linux or
          experimenting with visual art and animation, I’m drawn to what lets me
          combine engineering with creative expression.
        </p>
        <p className="text-on-surface">
          Currently exploring software, expressive interfaces &amp; motion.
        </p>
      </div>
    </TrackedSection>
  );
}
