"use client";

import { useEffect, type RefObject } from "react";
import { usePathname } from "next/navigation";

const REST_SCALE = 1;
const REST_OFFSET_PX = 24;
const MAX_SCALE = 2;
const VIEWPORT_MARGIN_PX = 32;
// the pill stays centered until the bottom of #start rises above this fraction of the viewport
const START_RELEASE = 0.8;
const TRANSITION = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/**
 * drives the floating pill: big and centered over #start, resting at the bottom,
 * then back to center as #end scrolls in
 */
export function usePillAnimation(pillRef: RefObject<HTMLDivElement | null>) {
  const pathname = usePathname();

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    let frame = 0;

    // innerHeight changes as the mobile url bar slides in and out, which made the pill
    // jump. measure 100svh instead: it stays put, and it's what the hero is sized to
    const probe = document.createElement("div");
    probe.style.cssText =
      "position:fixed; top:0; width:0; height:100vh; height:100svh; visibility:hidden;pointer-events:none";
    document.body.append(probe);

    const place = (y: number, scale: number, animated: boolean) => {
      // skip the transition on first placement so it doesn't fly in
      const visible = pill.style.opacity === "1";
      pill.style.transition = animated && visible ? TRANSITION : "none";
      pill.style.transform = `translate(-50%, ${y}px) scale(${scale})`;
      pill.style.opacity = "1";
    };

    const update = () => {
      frame = 0;
      const { innerWidth } = window;
      const viewHeight = probe.offsetHeight;
      const { offsetWidth, offsetHeight } = pill;

      // a label that animates its width declares its widest, so the scale holds still
      const fitEm = Number(pill.dataset.fitEm) || 0;
      const widest = Math.max(
        offsetWidth,
        fitEm * parseFloat(getComputedStyle(pill).fontSize),
      );
      const fit = (innerWidth - VIEWPORT_MARGIN_PX) / widest;
      const fullScale = Math.min(MAX_SCALE, fit);
      const restScale = Math.min(REST_SCALE, fit);
      const centerY = -(viewHeight - offsetHeight * fullScale) / 2;

      const start = document.getElementById("start");
      const end = document.getElementById("end");

      if (
        start &&
        start.getBoundingClientRect().bottom > viewHeight * START_RELEASE
      ) {
        place(centerY, fullScale, true);
        return;
      }

      // #end can be shorter than the viewport, so the climb uses its own height
      const endRect = end?.getBoundingClientRect();
      const endTop = endRect ? endRect.top : viewHeight;
      const climb = Math.min(viewHeight, endRect?.height || viewHeight);
      const progress = Math.min(1, Math.max(0, (viewHeight - endTop) / climb));

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
    // the pill's width changes with its label and slots, which changes how big it can get
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(pill);
    update();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver.disconnect();
      probe.remove();
    };
  }, [pillRef, pathname]);
}
