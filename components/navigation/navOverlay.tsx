"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Pill from "./pill";

type NavLink = { label: string; link?: string; targetHash?: string };

const NAV_LINKS: NavLink[] = [
  // { label: 'about', link: '/#about' },
  { label: "github", link: "https://github.com/amansxcalibur/" },
  // { label: "venue", link: "/venue" },
  { label: "contact", link: "/#contact-us" },
];
const linkClass =
  "flex items-center justify-center rounded-full bg-gray-500/15 px-[1.75vw] py-[0.6vw] backdrop-blur-xl max-md:px-[4vw] max-md:py-[2vw]";

export default function NavOverlay() {
  const [hidden, setHidden] = useState(false);
  return (
    <>
      <nav
        className={`fixed top-0 z-50 flex w-full transform text-[1.3vw] duration-150 max-md:text-[4vw] ${
          hidden ? "-translate-y-full" : ""
        }`}
      >
        <div className="flex flex-1 justify-start pt-[0.75vw] pl-[0.75vw] max-md:py-[3vw] max-md:pl-[3vw]">
          <Link
            href="/#hero"
            className="flex size-[4vw] items-center justify-center gap-x-[0.2vw] rounded-full backdrop-blur-xl max-md:px-[1.5vw]"
          >
            a
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center gap-0.5 py-[0.75vw] max-md:py-[3vw] max-md:pr-[3vw]">
          {NAV_LINKS.map((elem) =>
            elem.link === undefined ? (
              <button key={elem.label} className={linkClass}>
                {elem.label}
              </button>
            ) : (
              <Link key={elem.label} href={elem.link} className={linkClass}>
                {elem.label}
              </Link>
            ),
          )}
        </div>
      </nav>
      <div className="pointer-events-none fixed bottom-0 z-50 flex w-full justify-center pb-[1.5vw] text-[1.3vw] max-md:pb-[6vw] max-md:text-[3.5vw]" />

      {/* <div className={`${isAtTop ? 'pill-instant-center' : ''}`}> */}
      <Pill />
      {/* </div> */}
    </>
  );
}
