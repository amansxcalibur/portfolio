"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { Liquid } from "liquid-gooey";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

export default function GooeyDrag() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [t, setT] = useState(0); // 0 = far, 1 = absorbed
  const [merged, setMerged] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const circleRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const drag = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    cx: number;
    cy: number; // circle center at pointer down
    px: number;
    py: number; // pill center
    reachOut: number;
    reachIn: number;
  } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setMerged(false); // Cancel merged state if user grabs it manually

    const c = circleRef.current!.getBoundingClientRect();
    const p = pillRef.current!.getBoundingClientRect();

    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
      cx: c.left + c.width / 2,
      cy: c.top + c.height / 2,
      px: p.left + p.width / 2,
      py: p.top + p.height / 2,
      reachOut: p.width / 2 + 70, // where absorption starts
      reachIn: p.width * 0.15, // fully absorbed
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    setPos({ x: d.originX + dx, y: d.originY + dy });

    const dist = Math.hypot(d.cx + dx - d.px, d.cy + dy - d.py);
    setT(smooth(d.reachOut, d.reachIn, dist)); // 1 when close
  };

  const endDrag = () => {
    setIsDragging(false);
    drag.current = null;
  };

  const toggleMerge = () => {
    if (merged) {
      // Unmerge: send back to original position
      setPos({ x: 0, y: 0 });
      setT(0);
      setMerged(false);
    } else {
      // Merge: calculate offset to jump to the pill
      const c = circleRef.current?.getBoundingClientRect();
      const p = pillRef.current?.getBoundingClientRect();
      if (c && p) {
        const cx = c.left + c.width / 2;
        const cy = c.top + c.height / 2;
        const px = p.left + p.width / 2;
        const py = p.top + p.height / 2;

        setPos((prev) => ({
          x: prev.x + (px - cx),
          y: prev.y + (py - cy),
        }));
        setT(1);
        setMerged(true);
      }
    }
  };

  const scale = 1 - 0.85 * t; // liquid shrinks into the pill
  const imgOpacity = 1 - smooth(0.35, 0.9, t); // image fades slightly earlier
  const blobOpacity = 1 - smooth(0.5, 1, t); // the whole blob goes transparent at the end

  return (
    <Liquid
      blur={10}
      contrast={18}
      fill="#fff"
      shadow="0 10px 24px rgba(0,0,0,.15)"
      className="flex min-h-screen w-full items-center justify-center gap-4 bg-gradient-to-br from-neutral-100 to-neutral-200"
    >
      <Liquid.Item
        x={pos.x}
        y={pos.y}
        scale={scale}
        transition={
          isDragging ? { duration: 0 } : { stiffness: 300, damping: 25 }
        }
        // Changed z-20 to z-0 so it goes behind the pill
        className="shrink-0 cursor-grab touch-none select-none active:cursor-grabbing relative z-0"
      >
        <div
          ref={circleRef}
          className="h-16 w-16 rounded-full"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{
            opacity: blobOpacity,
            transition: isDragging ? "none" : "opacity 0.1s ease-in-out",
          }}
        >
          <Image
            src="/shapes/puffy-diamond.png"
            alt="shape"
            width={64}
            height={64}
            className="h-full w-full rounded-full object-cover pointer-events-none"
            style={{
              opacity: imgOpacity,
              transition: isDragging ? "none" : "opacity 0.4s ease-in-out",
            }}
          />
        </div>
      </Liquid.Item>

      {/* Changed z-10 to z-20 so it sits in front of the circle */}
      <Liquid.Item observe className="shrink-0 select-none relative z-20">
        <button
          ref={pillRef}
          onClick={toggleMerge}
          className="rounded-full px-7 py-3.5 font-semibold text-neutral-900 cursor-pointer hover:bg-black/5 active:scale-95 transition-all"
        >
          hello
        </button>
      </Liquid.Item>
    </Liquid>
  );
}
