"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/** How far the pointer's influence reaches, in multiples of the text's font size. */
const REACH_EM = 4.5;

/** Splits copy into words that respond to the pointer. Use inside <FlexWords>. */
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

/**
 * A paragraph that answers the pointer: words near it gain grade and
 * roundness, falling off with distance. Those axes leave glyph widths alone,
 * so the text never reflows.
 */
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
        // Eased, so the lit area has a soft edge rather than a cone.
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
