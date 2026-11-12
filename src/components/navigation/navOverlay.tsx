"use client";

import Link from "next/link";
import { GitHubIcon } from "@/components/icons";
import { GITHUB_URL } from "@/content/links";
import Pill from "./pill";
import { HashLink } from "./hashLink";
import { ThemeSwitch } from "./themeSwitch";

// sections on the current page, by id
const NAV_LINKS = [{ label: "contact", to: "end" }];

// on phones these drop their text, so keep them as tall as a text island
const compactClass = "max-sm:min-h-[calc(1lh+1em)]";
const linkClass =
  "pointer-events-auto rounded-full bg-glass px-[1.1em] py-[0.5em] backdrop-blur-xl whitespace-nowrap transition-[font-size,background-color,color,scale] duration-500 ease-[cubic-bezier(0.34,1.8,0.5,1),ease-out,ease-out,cubic-bezier(0.34,1.8,0.5,1)] motion-safe:hover:text-[1.6em] motion-safe:pointer-fine:active:text-[1.45em] motion-safe:pointer-coarse:active:scale-110 hover:bg-inverse hover:text-on-inverse focus-visible:bg-inverse focus-visible:text-on-inverse focus-visible:outline-none aria-[current=page]:bg-inverse aria-[current=page]:text-on-inverse aria-[current=page]:shadow-[0_0_0_1px_rgb(255_255_255/0.2)]";

export default function NavOverlay() {
  return (
    <>
      <nav
        aria-label="Main"
        className="pointer-events-none fixed top-0 z-50 flex w-full items-start justify-between gap-2 p-[clamp(0.75rem,1vw,1.25rem)] text-[clamp(0.875rem,1.15vw,1.25rem)]"
      >
        <Link href="/" className={linkClass}>
          aman<span className="max-[20rem]:hidden"> valiyakath</span>
        </Link>
        <div className="flex items-start gap-1">
          <ThemeSwitch className={`${linkClass} ${compactClass}`} />
          {NAV_LINKS.map(({ label, to }) => (
            <HashLink key={label} to={to} className={linkClass}>
              {label}
            </HashLink>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={`inline-flex items-center max-[23rem]:hidden ${linkClass} ${compactClass}`}
          >
            <GitHubIcon className="size-[1.15em] sm:hidden" />
            <span aria-hidden="true" className="max-sm:hidden">
              github
            </span>
          </a>
        </div>
      </nav>
      <Pill />
    </>
  );
}
