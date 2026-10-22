"use client";
import { useEffect, RefObject } from "react";

export function usePillAnimation(pillRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const topEl = document.getElementById("start");
    const bottomEl = document.getElementById("end");
    const pill = pillRef.current;

    if (!pill) return;

    let ticking = false;

    const updatePosition = () => {
      let atTop = false;
      let bottomProgress = 0;
      const winHeight = window.innerHeight;

      if (topEl && topEl.getBoundingClientRect().bottom > winHeight * 0.4) atTop = true;
      if (bottomEl && !atTop) {
        const bottomRect = bottomEl.getBoundingClientRect();
        if (bottomRect.top < winHeight) {
          bottomProgress = Math.max(0, Math.min(1, (winHeight - bottomRect.top) / winHeight));
        }
      }

      if (atTop) {
        // SCROLLED TO TOP: 2x Scale and Fully Untucked
        pill.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        pill.style.transform = "translate(-50%, calc(-50vh + 50%)) scale(2)";
        pill.style.setProperty("--untuck", "1");
        pill.style.setProperty("--slot-trans", "margin 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)");
      } else if (bottomProgress > 0) {
        // SCROLLING BOTTOM: Scale and Untuck based on scroll progress
        pill.style.transition = "none";
        pill.style.transform = `translate(-50%, calc(-2rem + (-50vh + 50% + 2rem) * ${bottomProgress})) scale(${1 + bottomProgress})`;
        pill.style.setProperty("--untuck", bottomProgress.toString());
        pill.style.setProperty("--slot-trans", "none"); // Disable transitions so it tracks scroll exactly
      } else {
        // MIDDLE STATE: 1x Scale and Fully Tucked
        pill.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        pill.style.transform = "translate(-50%, -2rem) scale(1)";
        pill.style.setProperty("--untuck", "0");
        pill.style.setProperty("--slot-trans", "margin 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)");
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updatePosition);
    };
  }, [pillRef]);
}