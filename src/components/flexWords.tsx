"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/** how far the pointer reaches, in multiples of the font size */
const REACH_EM = 4.5;

/** splits copy into words that react to the pointer. use inside <FlexWords> */
export function words(text: string) {
  return text.split(" ").map((word, i) => (
    <span key={i}>
      {i > 0 && " "}
      <span data-flex-word className="flex-word">
        {word}
      </span>
    </span>
  ));
}

/** paragraph where words near the pointer gain grade and roundness. those axes don't change widths, so no reflow */
export function FlexWords(props: ComponentPropsWithoutRef<"p">) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const update = () => {
      frame = 0;
      const reach = REACH_EM * parseFloat(getComputedStyle(el).fontSize);
      for (const word of el.querySelectorAll<HTMLElement>("[data-flex-word]")) {
        let near = 0;
        if (pointer) {
          const box = word.getBoundingClientRect();
          const dx = pointer.x - (box.left + box.width / 2);
          const dy = pointer.y - (box.top + box.height / 2);
          near = Math.max(0, 1 - Math.hypot(dx, dy) / reach);
        }
        // eased so the lit area has a soft edge
        word.style.setProperty("--near", (near * near * (3 - 2 * near)).toFixed(3));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <p ref={ref} {...props} />;
}
