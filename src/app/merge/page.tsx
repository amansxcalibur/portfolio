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
  const circleRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    startX: number; startY: number;
    originX: number; originY: number;
    cx: number; cy: number;       // circle center at pointer down
    px: number; py: number;       // pill center
    reachOut: number; reachIn: number;
  } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const c = circleRef.current!.getBoundingClientRect();
    const p = pillRef.current!.getBoundingClientRect();
    drag.current = {
      startX: e.clientX, startY: e.clientY,
      originX: pos.x, originY: pos.y,
      cx: c.left + c.width / 2, cy: c.top + c.height / 2,
      px: p.left + p.width / 2, py: p.top + p.height / 2,
      reachOut: p.width / 2 + 70, // where absorption starts
      reachIn: p.width * 0.15,    // fully absorbed
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
    drag.current = null;
  };

  const scale = 1 - 0.85 * t;                 // liquid shrinks into the pill
  const imgOpacity = 1 - smooth(0.35, 0.9, t); // image fades slightly later

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
        transition={{ duration: 0 }}
        className="shrink-0 cursor-grab touch-none select-none active:cursor-grabbing"
      >
        <div
          ref={circleRef}
          className="h-16 w-16 rounded-full"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <Image
            src="/shapes/puffy-diamond.png"
            alt="shape"
            width={64}
            height={64}
            className="h-full w-full rounded-full object-cover pointer-events-none"
            style={{ opacity: imgOpacity }}
          />
        </div>
      </Liquid.Item>

      <Liquid.Item observe className="shrink-0 select-none">
        <div
          ref={pillRef}
          className="rounded-full px-7 py-3.5 font-semibold text-neutral-900"
        >
          hello
        </div>
      </Liquid.Item>
    </Liquid>
  );
}