"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Pill() {
  const pillRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const wrapperRightRef = useRef<HTMLDivElement>(null);
  const innerRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topEl = document.getElementById("start");
    const bottomEl = document.getElementById("end");
    const pill = pillRef.current;
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;

    const rightwrapper = wrapperRightRef.current;
    const rightinner = innerRightRef.current;

    if (!pill || !wrapper || !inner || !rightwrapper || !rightinner) return;

    let ticking = false;

    const updatePosition = () => {
      let atTop = false;
      let bottomProgress = 0; // 0 = at bottom (hidden), 1 = at center (visible)

      const winHeight = window.innerHeight;

      // check top
      if (topEl) {
        const topRect = topEl.getBoundingClientRect();
        if (topRect.bottom > winHeight * 0.4) {
          atTop = true;
        }
      }

      // check bottom
      if (bottomEl && !atTop) {
        const bottomRect = bottomEl.getBoundingClientRect();
        if (bottomRect.top < winHeight) {
          bottomProgress = Math.max(
            0,
            Math.min(1, (winHeight - bottomRect.top) / winHeight)
          );
        }
      }

      if (atTop) {
        // --- 1. FULLY CENTERED / VISIBLE ---
        pill.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        pill.style.transform = "translate(-50%, calc(-50vh + 50%)) scale(2)";
        
        // Restore the 32px gap
        wrapper.style.transition = "margin-right 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        wrapper.style.marginRight = "32px";

        // Restore circle to full size
        inner.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        inner.style.transform = "translateX(0px) scale(1)";

      } else if (bottomProgress > 0) {
        // --- 2. SCROLLING ---
        pill.style.transition = "none";
        wrapper.style.transition = "none";
        inner.style.transition = "none";

        // Scale pill up
        const scale = 1 + bottomProgress;
        pill.style.transform = `translate(-50%, calc(-2rem + (-50vh + 50% + 2rem) * ${bottomProgress})) scale(${scale})`;
        
        // Margin goes from -114px (fully overlapped) up to 32px (gap visible)
        wrapper.style.marginRight = `${-114 + 146 * bottomProgress}px`;

        // Tuck inside to prevent poking out: Push 60px right and scale down to 40% when hidden
        const xOffset = (1 - bottomProgress) * 60; 
        const circleScale = 0.4 + 0.6 * bottomProgress; 
        inner.style.transform = `translateX(${xOffset}px) scale(${circleScale})`;

      } else {
        // --- 3. RESTING AT BOTTOM / HIDDEN ---
        pill.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        pill.style.transform = "translate(-50%, -2rem) scale(1)";
        
        // Collapse wrapper footprint so the Pill naturally centers itself
        wrapper.style.transition = "margin-right 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        wrapper.style.marginRight = "-114px";

        // Safely tucked behind the text
        inner.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        inner.style.transform = "translateX(60px) scale(0.4)";
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
  }, []);

  return (
    <div
      ref={pillRef}
      className="fixed bottom-0 left-1/2 origin-center z-50 will-change-transform"
    >
      {/* Ensure `gap-8` is REMOVED from here, as the JS margins handle the gap now! */}
      <div className="flex text-[65px] whitespace-nowrap p-6">
        
        {/* Layout Wrapper (handles dynamic width space) */}
        <div 
          ref={wrapperRef}
          className="shrink-0 relative z-0"
          style={{ marginRight: "-114px" }} // Default to hidden
        >
          {/* Inner Circle (handles scale and sliding to prevent poking out) */}
          <div 
            ref={innerRef}
            className="w-[114px] bg-white rounded-full origin-center"
            style={{ transform: "translateX(60px) scale(0.4)" }} // Default to hidden
          >
            <div className="relative h-full aspect-square overflow-hidden rounded-full bg-amber-300">
              <Image
                src="/shapes/loader.gif"
                alt="Animated GIF showcase"
                fill
                priority
                unoptimized
                className="object-cover scale-125"
              />
            </div>
          </div>
        </div>

        {/* Pill */}
        <div className="shrink-0 relative z-10">
          <div className="bg-black text-white rounded-full tracking-wider flex items-center px-[45px] py-[8px]">
            ~Hola Pe
          </div>
        </div>

        {/* Layout Wrapper (handles dynamic width space) */}
        <div 
          ref={wrapperRightRef}
          className="shrink-0 relative z-0"
          style={{ marginRight: "-114px" }} // Default to hidden
        >
          {/* Inner Circle (handles scale and sliding to prevent poking out) */}
          <div 
            ref={innerRightRef}
            className="w-[114px] bg-white rounded-full origin-center"
            style={{ transform: "translateX(60px) scale(0.4)" }} // Default to hidden
          >
            <div className="relative h-full aspect-square overflow-hidden rounded-full bg-amber-300">
              <Image
                src="/shapes/loader.gif"
                alt="Animated GIF showcase"
                fill
                priority
                unoptimized
                className="object-cover scale-125"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}