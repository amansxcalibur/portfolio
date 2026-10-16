'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
   animate,
   motion,
   useMotionValue,
   useMotionValueEvent,
   useScroll,
   type AnimationPlaybackControls,
} from 'motion/react';
import { scrollToHash } from '@/../_utils/helpers';
import Pill from './pill';

type NavLink = { label: string; link?: string; targetHash?: string };

const NAV_LINKS: NavLink[] = [
   // { label: 'about', link: '/#about' },
   { label: 'events', link: '/#events' },
   { label: 'venue', link: '/venue' },
   { label: 'contact', link: '/#contact-us' },
];

const RISE_LEVEL = 0.1;
const DOCK_EASE = [0.05, 0.95, 0.48, 0.95] as const;
const linkClass =
   'flex items-center justify-center rounded-full bg-gray-500/15 px-[1.75vw] py-[0.6vw] backdrop-blur-xl max-md:px-[4vw] max-md:py-[2vw]';

export default function NavBar() {
   const pathname = usePathname();
   const [fill, setFill] = useState(false);
   const [hidden, setHidden] = useState(false);
   // The pill lives in a host div that React never manages. We portal the Pill
   // into it and move the host between slots, so React state survives the move.
   const [host, setHost] = useState<HTMLDivElement | null>(null);

   const headerRef = useRef<HTMLElement>(null);
   const dockRef = useRef<HTMLDivElement>(null);
   const riseRef = useRef<HTMLDivElement>(null);
   const flipRef = useRef<AnimationPlaybackControls | null>(null);
   const fillRef = useRef(fill);

   const riseY = useMotionValue(0);
   const riseScale = useMotionValue(1);
   const { scrollY } = useScroll();

   useEffect(() => {
      fillRef.current = fill;
   }, [fill]);

   // host lifecycle
   useEffect(() => {
      const el = document.createElement('div');
      el.style.transformOrigin = '0 0'; // keeps FLIP deltas to top-left only
      dockRef.current?.appendChild(el);
      setHost(el);
      return () => el.remove();
   }, []);

   // hide on scroll down past one viewport, show on scroll up
   // rise: pill climbs to mid-screen and scales up as #end enters view
   const updateRise = useCallback(() => {
      const end = document.getElementById('end');
      const box = riseRef.current;
      if (!end || !box || fillRef.current) {
         riseY.set(0);
         riseScale.set(1);
         return;
      }
      const H = window.innerHeight;
      const W = window.innerWidth;
      const top = end.getBoundingClientRect().top;
      const p =
         top <= 0
            ? 0
            : top >= RISE_LEVEL * H
              ? top < H
                 ? (H - top) / ((1 - RISE_LEVEL) * H)
                 : 0
              : 1;
      const w = box.offsetWidth;
      const h = box.offsetHeight;
      let scale = p + 1;
      if (w * 2 > W) scale = (p * (W - w)) / w + 1;
      riseY.set(-p * (0.5 * H - 0.015 * W - 0.25 * h));
      riseScale.set(scale);
   }, [riseY, riseScale]);

   useMotionValueEvent(scrollY, 'change', (y) => {
      const prev = scrollY.getPrevious() ?? 0;
      setHidden(y > prev && y > window.innerHeight);
      updateRise();
   });

   useEffect(() => {
      updateRise();
      window.addEventListener('resize', updateRise);
      return () => window.removeEventListener('resize', updateRise);
   }, [updateRise, host, fill, pathname]);

   // hero visibility decides whether the pill docks in the hero or at the bottom
   useEffect(() => {
      const hero = document.getElementById('hero');
      if (!hero) {
         setFill(false);
         return;
      }
      const io = new IntersectionObserver(
         ([entry]) => setFill(entry.intersectionRatio > 0.5),
         { threshold: 0.5 }
      );
      io.observe(hero);
      return () => io.disconnect();
   }, [pathname]);

   // FLIP: move the host to its slot, then animate from where it visually was.
   // Everything inside is em-based, so a font-size difference between slots is
   // a uniform scale and top-left deltas are enough.
   useEffect(() => {
      const dock = dockRef.current;
      if (!host || !dock) return;
      const dest = (fill && document.getElementById('pill-target')) || dock;
      if (host.parentElement === dest) return;

      const canAnimate =
         host.isConnected &&
         !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const first = host.getBoundingClientRect();
      const firstFont = parseFloat(getComputedStyle(host).fontSize);

      flipRef.current?.cancel();
      host.style.transform = '';
      dest.appendChild(host);

      if (!canAnimate) return;

      const last = host.getBoundingClientRect();
      const lastFont = parseFloat(getComputedStyle(host).fontSize);

      const controls = animate(
         host,
         {
            x: [first.left - last.left, 0],
            y: [first.top - last.top, 0],
            scale: [firstFont / lastFont, 1],
         },
         { duration: 0.4, ease: DOCK_EASE }
      );
      flipRef.current = controls;
      controls.then(() => {
         if (flipRef.current === controls) host.style.transform = '';
      });
   }, [host, fill, pathname]);

   // expose header height as a CSS var
   useEffect(() => {
      const el = headerRef.current;
      if (!el) return;
      const set = () =>
         document.documentElement.style.setProperty(
            '--nav-h',
            `${el.offsetHeight}px`
         );
      set();
      const ro = new ResizeObserver(set);
      ro.observe(el);
      return () => ro.disconnect();
   }, []);

   return (
      <>
         <nav
            ref={headerRef}
            className={`fixed top-0 z-50 flex w-full transform text-[1.3vw] duration-150 max-md:text-[4vw] ${hidden ? '-translate-y-full' : ''}`}
         >
            <div className="flex flex-1 justify-start pt-[0.75vw] pl-[0.75vw] max-md:py-[3vw] max-md:pl-[3vw]">
               <Link
                  href="/#hero"
                  className="flex items-center justify-center gap-x-[0.2vw] rounded-full backdrop-blur-xl max-md:px-[1.5vw]"
               >
                  <Image
                     src="/fosster-logo.png"
                     width={1}
                     height={1}
                     alt="fosster logo"
                     className="size-[4vw] invert max-md:size-[7vw]"
                     unoptimized
                  />
               </Link>
            </div>
            <div className="flex flex-1 items-center justify-center py-[0.75vw] max-md:py-[3vw] max-md:pr-[3vw]">
               {NAV_LINKS.map((elem) =>
                  elem.link === undefined ? (
                     <button
                        key={elem.label}
                        onClick={() => {
                           if (elem.targetHash) scrollToHash(elem.targetHash);
                        }}
                        className={linkClass}
                     >
                        {elem.label}
                     </button>
                  ) : (
                     <Link
                        key={elem.label}
                        href={elem.link}
                        className={linkClass}
                     >
                        {elem.label}
                     </Link>
                  )
               )}
            </div>
         </nav>

         <div
            ref={dockRef}
            className="pointer-events-none fixed bottom-0 z-50 flex w-full justify-center pb-[1.5vw] text-[1.3vw] max-md:pb-[6vw] max-md:text-[3.5vw]"
         />

         {host &&
            createPortal(
               <motion.div
                  ref={riseRef}
                  style={{ y: riseY, scale: riseScale }}
               >
                  <Pill />
               </motion.div>,
               host
            )}
      </>
   );
}