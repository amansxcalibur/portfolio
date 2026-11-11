"use client";

import { useEffect, useRef } from "react";
import { animate, type AnimationPlaybackControls } from "motion/react";

/** One letter's place in the typeface's design space. */
type Pose = {
  wght: number;
  wdth: number;
  slnt: number;
  ROND: number;
  /** Set in the pill's second ink. */
  accent?: boolean;
};

const pose = (wght: number, wdth: number, slnt = 0, ROND = 0, accent = false): Pose => ({
  wght,
  wdth,
  slnt,
  ROND,
  accent,
});
const all = (p: Pose): Pose[] => [p, p, p, p];

const REST = pose(500, 100, 0, 100);
const HAIR = pose(160, 38);
const SLAB = pose(1000, 130, 0, 0, true);

/** Each frame styles the letters A, m, a, n. The loop holds on one, then springs to the next. */
const FRAMES: Pose[][] = [
  all(REST),
  // A heavy capital leading a hairline word.
  [pose(1000, 151, 0, 0, true), HAIR, HAIR, HAIR],
  // Tall and tight, like a poster.
  all(pose(820, 25, 0, 100)),
  // Wide and barely there.
  all(pose(140, 151, 0, 0, true)),
  // Alternating hairline and slab.
  [HAIR, SLAB, HAIR, SLAB],
  // Leaning into it.
  all(pose(900, 112, -10, 100)),
  // Weight climbing as the width falls away.
  [pose(100, 151), pose(400, 112), pose(700, 76, 0, 0, true), pose(1000, 44, 0, 0, true)],
  // Soft, compact, slanted.
  all(pose(620, 72, -10, 100, true)),
];

/** The widest the word gets across FRAMES, in em. The pill reserves room for it on small screens. */
export const FLEX_NAME_MAX_EM = 3.9;

const LETTERS = ["A", "m", "a", "n"];
const HOLD_MS = 1150;
const STAGGER_S = 0.05;
const SPRING = { type: "spring", stiffness: 210, damping: 15, mass: 0.9 } as const;

const settings = ({ wght, wdth, slnt, ROND }: Pose) =>
  `"wght" ${wght.toFixed(1)}, "wdth" ${wdth.toFixed(1)}, "slnt" ${slnt.toFixed(2)}, "ROND" ${ROND.toFixed(1)}`;

const mix = (from: Pose, to: Pose, t: number): Pose => ({
  wght: from.wght + (to.wght - from.wght) * t,
  wdth: from.wdth + (to.wdth - from.wdth) * t,
  slnt: from.slnt + (to.slnt - from.slnt) * t,
  ROND: from.ROND + (to.ROND - from.ROND) * t,
});

/**
 * "Aman", flexing through Google Sans Flex's weight, width, slant and roundness
 * one letter at a time. Static under reduced motion.
 */
export function FlexName() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;
    let running: AnimationPlaybackControls[] = [];
    // Where each letter actually is, so an interrupted spring continues from there.
    const current = FRAMES[0].map((p) => ({ ...p }));

    const step = () => {
      if (document.hidden) {
        timer = setTimeout(step, 400);
        return;
      }
      frame = (frame + 1) % FRAMES.length;
      running = FRAMES[frame].map((to, i) => {
        const el = lettersRef.current[i];
        const from = { ...current[i] };
        if (el) el.dataset.accent = String(Boolean(to.accent));
        return animate(0, 1, {
          ...SPRING,
          delay: i * STAGGER_S,
          onUpdate: (t) => {
            current[i] = mix(from, to, t);
            if (el) el.style.fontVariationSettings = settings(current[i]);
          },
        });
      });
      timer = setTimeout(step, HOLD_MS + 450);
    };

    timer = setTimeout(step, HOLD_MS);
    return () => {
      clearTimeout(timer);
      running.forEach((controls) => controls.stop());
    };
  }, []);

  return (
    <span aria-label="Aman" role="img" className="inline-flex items-baseline">
      {LETTERS.map((letter, i) => (
        <span
          key={i}
          ref={(el) => {
            lettersRef.current[i] = el;
          }}
          aria-hidden="true"
          style={{ fontVariationSettings: settings(FRAMES[0][i]) }}
          className="inline-block transition-colors duration-500 data-[accent=true]:text-on-inverse-accent"
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
