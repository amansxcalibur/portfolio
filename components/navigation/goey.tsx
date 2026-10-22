"use client";

import { useRef, useState, useEffect, type PointerEvent } from "react";
import Image from "next/image";
import { Liquid } from "liquid-gooey";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

export default function Pill() {
  // --- Scroll Logic State & Refs ---
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Dragging Logic State & Refs ---
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [t, setT] = useState(0); // 0 = far, 1 = absorbed
  const [merged, setMerged] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const circleRef = useRef<HTMLDivElement>(null);
  const targetPillRef = useRef<HTMLButtonElement>(null);
  const drag = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    cx: number;
    cy: number;
    px: number;
    py: number;
    reachOut: number;
    reachIn: number;
  } | null>(null);

  // --- Scroll Animation Effect ---
  useEffect(() => {
    const topEl = document.getElementById("start");
    const bottomEl = document.getElementById("end");
    const container = containerRef.current;

    if (!container) return;

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
            Math.min(1, (winHeight - bottomRect.top) / winHeight)
          );
        }
      }

      if (atTop) {
        // instant animated snap via CSS transition
        container.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        container.style.transform = "translate(-50%, calc(-50vh + 50%)) scale(2)";
      } else if (bottomProgress > 0) {
        // lock to scroll
        container.style.transition = "none";
        const scale = 1 + bottomProgress;

        // Interpolate smoothly from -2rem up to the exact center
        container.style.transform = `translate(-50%, calc(-2rem + (-50vh + 50% + 2rem) * ${bottomProgress})) scale(${scale})`;
      } else {
        // default resting state: bottom-0
        container.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        container.style.transform = "translate(-50%, -2rem) scale(1)";
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

    updatePosition(); // init

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  // --- Drag & Drop / Merge Handlers ---
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setMerged(false);

    const c = circleRef.current!.getBoundingClientRect();
    const p = targetPillRef.current!.getBoundingClientRect();

    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
      cx: c.left + c.width / 2,
      cy: c.top + c.height / 2,
      px: p.left + p.width / 2,
      py: p.top + p.height / 2,
      reachOut: p.width / 2 + 70, 
      reachIn: p.width * 0.15, 
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;

    // We adjust for the scale based on the container to keep drag 1:1 if zoomed in
    const containerScale =
      containerRef.current?.getBoundingClientRect().width! /
      containerRef.current?.offsetWidth!;

    const dx = (e.clientX - d.startX) / (containerScale || 1);
    const dy = (e.clientY - d.startY) / (containerScale || 1);

    setPos({ x: d.originX + dx, y: d.originY + dy });

    const dist = Math.hypot(d.cx + dx * containerScale - d.px, d.cy + dy * containerScale - d.py);
    setT(smooth(d.reachOut, d.reachIn, dist)); // 1 when close
  };

  const endDrag = () => {
    setIsDragging(false);
    drag.current = null;
  };

  const toggleMerge = () => {
    if (merged) {
      setPos({ x: 0, y: 0 });
      setT(0);
      setMerged(false);
    } else {
      const c = circleRef.current?.getBoundingClientRect();
      const p = targetPillRef.current?.getBoundingClientRect();
      const containerScale =
        containerRef.current?.getBoundingClientRect().width! /
        containerRef.current?.offsetWidth!;

      if (c && p) {
        const cx = c.left + c.width / 2;
        const cy = c.top + c.height / 2;
        const px = p.left + p.width / 2;
        const py = p.top + p.height / 2;

        setPos((prev) => ({
          x: prev.x + (px - cx) / containerScale,
          y: prev.y + (py - cy) / containerScale,
        }));
        setT(1);
        setMerged(true);
      }
    }
  };

  const scale = 1 - 0.85 * t; 
  const imgOpacity = 1 - smooth(0.35, 0.9, t);
  const blobOpacity = 1 - smooth(0.5, 1, t);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-1/2 origin-center z-50 will-change-transform"
    >
      <Liquid
        blur={8}
        contrast={18}
        fill="#000"
        className="flex gap-8 text-[65px] whitespace-nowrap p-6"
      >
        {/* Draggable GIF Circle */}
        <Liquid.Item
          x={pos.x}
          y={pos.y}
          scale={scale}
          transition={isDragging ? { duration: 0 } : { stiffness: 300, damping: 25 }}
          className="shrink-0 cursor-grab touch-none select-none active:cursor-grabbing relative z-0"
        >
          <div
            ref={circleRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="w-[114px] h-[114px] bg-white rounded-full"
            style={{
              opacity: blobOpacity,
              transition: isDragging ? "none" : "opacity 0.1s ease-in-out",
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-full bg-amber-300 pointer-events-none"
              style={{
                opacity: imgOpacity,
                transition: isDragging ? "none" : "opacity 0.4s ease-in-out",
              }}
            >
              <Image
                src="/shapes/loader.gif"
                alt="Animated GIF showcase"
                fill
                priority
                unoptimized
                className="object-cover scale-125 pointer-events-none"
              />
            </div>
          </div>
        </Liquid.Item>

        {/* Target Text Pill */}
        <Liquid.Item observe className="shrink-0 relative z-10">
          <button
            ref={targetPillRef}
            onClick={toggleMerge}
            className="bg-black text-white rounded-full tracking-wider flex items-center px-[45px] py-[8px] cursor-pointer hover:bg-black/90 active:scale-95 transition-all"
          >
            ~Hola Pe
          </button>
        </Liquid.Item>
      </Liquid>
    </div>
  );
}