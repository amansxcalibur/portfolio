"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Pill() {
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topEl = document.getElementById("start");
    const bottomEl = document.getElementById("end");
    const pill = pillRef.current;

    if (!pill) return;

    let ticking = false;

    const updatePosition = () => {
      let atTop = false;
      let bottomProgress = 0; // 0 <-> 1

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

        // if bottom element is entering the screen
        if (bottomRect.top < winHeight) {
          // 0 = just touching, 1 = fully on screen
          bottomProgress = Math.max(
            0,
            Math.min(1, (winHeight - bottomRect.top) / winHeight),
          );
        }
      }

      if (atTop) {
        // instant animated snap via CSS transition
        pill.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        pill.style.transform = "translate(-50%, calc(-50vh + 50%)) scale(2)";
      } else if (bottomProgress > 0) {
        // lock to scroll
        pill.style.transition = "none";
        const scale = 1 + bottomProgress;

        // Interpolate smoothly from -2rem up to the exact center
        pill.style.transform = `translate(-50%, calc(-2rem + (-50vh + 50% + 2rem) * ${bottomProgress})) scale(${scale})`;
      } else {
        // default resting state: bottom-0
        pill.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        pill.style.transform = "translate(-50%, -2rem) scale(1)"; 
        // pushed up by 2rem(bottom-8)
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
    window.addEventListener("resize", updatePosition); // fixes positioning on window size changes

    // init
    updatePosition();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <div
      ref={pillRef}
      className={`
        fixed bottom-0 left-1/2  origin-center z-50
        flex gap-8 text-[65px] whitespace-nowrap overflow-hidden
        will-change-transform
      `}
    >
      <div className="w-[114px] bg-white rounded-full">
        <div className="relative h-full aspect-square shrink-0 overflow-hidden rounded-full bg-amber-300 ">
          <Image
            // src="/shapes/loader.gif"
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1eDFpd3E4N2NmdXJkM2VjYTNqOGwzN3F0aDRoNWF6c29rOTM1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lq0h93752f6J9tijrh/giphy.gif"
            alt="Animated GIF showcase"
            fill
            priority
            unoptimized={true}
            className="object-cover scale-125"
          />
        </div>
      </div>

      <div className="bg-black text-white rounded-full tracking-wider flex items-center px-[45px] py-[8px]">
        ~Hola Pe
      </div>
    </div>
  );
}
