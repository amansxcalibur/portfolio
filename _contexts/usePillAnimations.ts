"use client";
import { useEffect, RefObject } from "react";

export function usePillAnimation(
  pillRef: RefObject<HTMLDivElement>,
  leftWrapperRef: RefObject<HTMLDivElement>,
  leftInnerRef: RefObject<HTMLDivElement>,
  rightWrapperRef: RefObject<HTMLDivElement>,
  rightInnerRef: RefObject<HTMLDivElement>
) {
  useEffect(() => {
    const topEl = document.getElementById("start");
    const bottomEl = document.getElementById("end");
    const pill = pillRef.current;
    const lWrapper = leftWrapperRef.current;
    const lInner = leftInnerRef.current;
    const rWrapper = rightWrapperRef.current;
    const rInner = rightInnerRef.current;

    if (!pill || !lWrapper || !lInner || !rWrapper || !rInner) return;

    let ticking = false;
    const TRANSITION = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

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
        pill.style.transition = TRANSITION;
        pill.style.transform = "translate(-50%, calc(-50vh + 50%)) scale(2)";
        
        // Left side reveal
        lWrapper.style.transition = lInner.style.transition = TRANSITION;
        lWrapper.style.marginRight = "32px";
        lInner.style.transform = "translateX(0px) scale(1)";

        // Right side reveal
        rWrapper.style.transition = rInner.style.transition = TRANSITION;
        rWrapper.style.marginLeft = "32px";
        rInner.style.transform = "translateX(0px) scale(1)";

      } else if (bottomProgress > 0) {
        pill.style.transition = lWrapper.style.transition = lInner.style.transition = rWrapper.style.transition = rInner.style.transition = "none";
        
        pill.style.transform = `translate(-50%, calc(-2rem + (-50vh + 50% + 2rem) * ${bottomProgress})) scale(${1 + bottomProgress})`;
        
        const space = -114 + 146 * bottomProgress;
        const scale = 0.4 + 0.6 * bottomProgress;
        const xOffset = (1 - bottomProgress) * 60;

        lWrapper.style.marginRight = `${space}px`;
        lInner.style.transform = `translateX(${xOffset}px) scale(${scale})`;

        // Symmetrical opposite for the right side
        rWrapper.style.marginLeft = `${space}px`;
        rInner.style.transform = `translateX(${-xOffset}px) scale(${scale})`;

      } else {
        pill.style.transition = TRANSITION;
        pill.style.transform = "translate(-50%, -2rem) scale(1)";
        
        lWrapper.style.transition = lInner.style.transition = TRANSITION;
        lWrapper.style.marginRight = "-114px";
        lInner.style.transform = "translateX(60px) scale(0.4)";

        rWrapper.style.transition = rInner.style.transition = TRANSITION;
        rWrapper.style.marginLeft = "-114px";
        rInner.style.transform = "translateX(-60px) scale(0.4)";
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
  }, [pillRef, leftWrapperRef, leftInnerRef, rightWrapperRef, rightInnerRef]);
}