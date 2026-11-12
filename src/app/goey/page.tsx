"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { Liquid } from "liquid-gooey";

export default function GooeyDrag() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const d = drag.current;
    setPos({
      x: d.originX + e.clientX - d.startX,
      y: d.originY + e.clientY - d.startY,
    });
  };

  const endDrag = () => {
    setIsDragging(false);
    drag.current = null;
  };

  return (
    <Liquid
      blur={8}
      contrast={18}
      fill="#fff"
      shadow="0 10px 24px rgba(0,0,0,.15)"
      className="flex min-h-screen w-full items-center justify-center gap-4 bg-gradient-to-br from-neutral-100 to-neutral-200"
    >
      <Liquid.Item
        observe
        dissolve={{
          warp: 40, // more turbulence
          mix: 1, // max marbling strength
          gravity: 100, // how deep the melt goes
          active: isDragging,
        }}
        className="shrink-0 cursor-grab touch-none select-none active:cursor-grabbing"
      >
        <div
          className="h-16 w-16 rounded-full"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
          }}
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
          />
        </div>
      </Liquid.Item>

      <Liquid.Item observe className="shrink-0 select-none">
        <div className="rounded-full px-7 py-3.5 font-semibold text-neutral-900 z-2 text-[250px] bg-white">
          hello
        </div>
      </Liquid.Item>
    </Liquid>
  );
}
