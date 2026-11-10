"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GITHUB_URL } from "@/content/links";
import Pill from "./pill";

const NAV_LINKS = [
  { label: "art", href: "/art" },
  { label: "dev", href: "/dev" },
  { label: "contact", href: "#end" },
];

const linkClass =
  "pointer-events-auto rounded-full bg-glass px-[1.1em] py-[0.5em] backdrop-blur-xl transition-colors hover:bg-inverse hover:text-on-inverse focus-visible:bg-inverse focus-visible:text-on-inverse focus-visible:outline-none aria-[current=page]:bg-inverse aria-[current=page]:text-on-inverse aria-[current=page]:shadow-[0_0_0_1px_rgb(255_255_255/0.2)]";

export default function NavOverlay() {
  const pathname = usePathname();

  return (
    <>
      <nav
        aria-label="Main"
        className="pointer-events-none fixed top-0 z-50 flex w-full items-center justify-between gap-2 p-[clamp(0.75rem,1vw,1.25rem)] text-[clamp(0.875rem,1.15vw,1.25rem)]"
      >
        <Link href="/" className={linkClass}>
          aman<span className="max-sm:hidden"> valiyakath</span>
        </Link>
        <div className="flex gap-1">
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
