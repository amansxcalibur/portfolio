"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";
import { animate, type Playback } from "@/lib/animate";
import { MORPH_PAIRS } from "./morphData";

/** each morph also turns the shape this many degrees */
export const MORPH_TURN = 90;

export const TEMPOS = {
  /** holds each shape, then springs to the next */
  gentle: { holdMs: 1600, spinMs: 0, stiffness: 90, damping: 11 },
  /** the material loading indicator: always spinning, always morphing */
  loader: { holdMs: 350, spinMs: 4666, stiffness: 200, damping: 17 },
};

export type Tempo = keyof typeof TEMPOS;

/** one morph frame: the pair being blended, progress, and rotation so far */
export type MorphFrame = {
  from: readonly number[];
  to: readonly number[];
  t: number;
  /** degrees */
  angle: number;
};

type PointMap = (x: number, y: number) => readonly [number, number];

/** blends two shapes (100×100 units) into path data, optionally mapping each point */
export function morphPath({ from, to, t }: MorphFrame, map?: PointMap) {
  let d = "";
  for (let i = 0; i < from.length; i += 2) {
    let x = from[i] + (to[i] - from[i]) * t;
    let y = from[i + 1] + (to[i + 1] - from[i + 1]) * t;
    if (map) [x, y] = map(x, y);
    const command = i === 0 ? "M" : i === 2 ? "C" : " ";
    d += `${command}${Math.round(x * 100) / 100} ${Math.round(y * 100) / 100}`;
  }
  return `${d}Z`;
}

export function initialFrame(startAt: number): MorphFrame {
  const [from, to] = MORPH_PAIRS[startAt % MORPH_PAIRS.length];
  return { from, to, t: 0, angle: 0 };
}

/**
 * steps through the shapes from scripts/generate-shapes.py, calling draw every frame.
 * pauses off screen, does nothing under reduced motion
 */
export function useMorphLoop(
  target: RefObject<Element | null>,
  { startAt = 0, tempo = "gentle", holdMs }: { startAt?: number; tempo?: Tempo; holdMs?: number },
  draw: (frame: MorphFrame) => void,
) {
  const first = startAt % MORPH_PAIRS.length;
  const { stiffness, damping, holdMs: tempoHoldMs } = TEMPOS[tempo];
  const hold = holdMs ?? tempoHoldMs;
  const onFrame = useEffectEvent(draw);

  useEffect(() => {
    const el = target.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let index = first;
    let angle = 0;
    let visible = true;
    let timer: ReturnType<typeof setTimeout>;
    let controls: Playback | undefined;

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(el);

    const morph = () => {
      if (!visible) {
        timer = setTimeout(morph, 250);
        return;
      }
      const [from, to] = MORPH_PAIRS[index];
      controls = animate(0, 1, {
        type: "spring",
        stiffness,
        damping,
        onUpdate: (t) => onFrame({ from, to, t, angle: angle + t * MORPH_TURN }),
        onComplete: () => {
          index = (index + 1) % MORPH_PAIRS.length;
          angle = (angle + MORPH_TURN) % 360;
          timer = setTimeout(morph, hold);
        },
      });
    };

    timer = setTimeout(morph, hold);
    return () => {
      clearTimeout(timer);
      controls?.stop();
      observer.disconnect();
    };
  }, [target, first, hold, stiffness, damping]);
}
