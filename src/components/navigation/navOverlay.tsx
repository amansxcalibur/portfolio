"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GITHUB_URL } from "@/content/links";
import Pill from "./pill";
import { ThemeSwitch } from "./themeSwitch";

const NAV_LINKS = [
  { label: "contact", href: "#end" },
];

// Hover balloons an island with a big overshoot. Its size grows in the layout
// (text and em padding), so it shoves its neighbours aside instead of covering them.
const linkClass =
  "pointer-events-auto rounded-full bg-glass px-[1.1em] py-[0.5em] backdrop-blur-xl transition-[font-size,background-color,color] duration-500 ease-[cubic-bezier(0.34,1.8,0.5,1)] motion-safe:hover:text-[1.6em] motion-safe:active:text-[1.45em] hover:bg-inverse hover:text-on-inverse focus-visible:bg-inverse focus-visible:text-on-inverse focus-visible:outline-none aria-[current=page]:bg-inverse aria-[current=page]:text-on-inverse aria-[current=page]:shadow-[0_0_0_1px_rgb(255_255_255/0.2)]";

export default function NavOverlay() {
  const pathname = usePathname();

  return (
    <>
      <nav
        aria-label="Main"
        className="pointer-events-none fixed top-0 z-50 flex w-full items-start justify-between gap-2 p-[clamp(0.75rem,1vw,1.25rem)] text-[clamp(0.875rem,1.15vw,1.25rem)]"
      >
        <Link href="/" className={linkClass}>
          aman<span className="max-sm:hidden"> valiyakath</span>
        </Link>
        <div className="flex items-start gap-1">
          <ThemeSwitch className={linkClass} />
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={linkClass}
            >
              {label}
            </Link>
          ))}
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={linkClass}>
            github
          </a>
        </div>
      </nav>
      <Pill />
    </>
  );
}
