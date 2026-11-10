"use client";

import { useEffect, type RefObject } from "react";
import { usePathname } from "next/navigation";

const REST_SCALE = 1;
const REST_OFFSET_PX = 24;
const MAX_SCALE = 2;
const VIEWPORT_MARGIN_PX = 32;
const TRANSITION = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/**
 * Drives the floating pill. It is centered and large over #start, rests at the
 * bottom of the viewport, and climbs back to center as #end scrolls into view.
 */
export function usePillAnimation(pillRef: RefObject<HTMLDivElement | null>) {
  const pathname = usePathname();

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    let frame = 0;

    const place = (y: number, scale: number, animated: boolean) => {
      // Skip the transition on first placement so the pill doesn't fly in.
      const visible = pill.style.opacity === "1";
      pill.style.transition = animated && visible ? TRANSITION : "none";
      pill.style.transform = `translate(-50%, ${y}px) scale(${scale})`;
      pill.style.opacity = "1";
    };

    const update = () => {
      frame = 0;
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = pill;

      const fit = (innerWidth - VIEWPORT_MARGIN_PX) / offsetWidth;
      const fullScale = Math.min(MAX_SCALE, fit);
      const restScale = Math.min(REST_SCALE, fit);
      const centerY = -(innerHeight - offsetHeight * fullScale) / 2;

      // Looked up on every update: the layout outlives page navigations, and
      // Next keeps hidden routes in the DOM, where these measure as zero.
      const start = document.getElementById("start");
      const end = document.getElementById("end");

      if (start && start.getBoundingClientRect().bottom > innerHeight * 0.4) {
        place(centerY, fullScale, true);
        return;
      }

      const endTop = end ? end.getBoundingClientRect().top : innerHeight;
      const progress = Math.min(1, Math.max(0, (innerHeight - endTop) / innerHeight));

      if (progress > 0) {
        place(
          lerp(-REST_OFFSET_PX, centerY, progress),
          lerp(restScale, fullScale, progress),
          false,
        );
      } else {
        place(-REST_OFFSET_PX, restScale, true);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // The pill's width changes with its label and slots, which changes how
    // large it can get.
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(pill);
    update();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver.disconnect();
    };
  }, [pillRef, pathname]);
}
