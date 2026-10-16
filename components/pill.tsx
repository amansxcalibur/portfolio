"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useIsPresent,
} from "motion/react";
import { usePill, type PillItem } from "@/../_contexts/pill";

const SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 34,
  mass: 0.8,
} as const;
const BLUR_OUT = { opacity: 0, filter: "blur(10px)", scale: 0.94 };
const BLUR_IN = { opacity: 1, filter: "blur(0px)", scale: 1 };

// Everything is em-based, so the pill scales with the font-size of whatever
// slot it is docked in (bottom dock, hero target) with no per-slot overrides.
const itemClass =
  "relative z-10 block rounded-full px-[1.4em] py-[0.65em] text-white outline-none " +
  "focus-visible:ring-2 focus-visible:ring-white/60";

type ItemsProps = {
  items: PillItem[];
  value: string | null;
  persist: boolean;
  onSelect: ((item: PillItem) => void) | null;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  onWidth: (em: number) => void;
};

function Items({
  items,
  value,
  persist,
  onSelect,
  hovered,
  setHovered,
  onWidth,
}: ItemsProps) {
  const ref = useRef<HTMLUListElement>(null);
  const present = useIsPresent();
  const lit = hovered ?? (persist ? value : null);

  // Only the live set reports width. The exiting set is popped out of layout
  // and must not fight the incoming one. Width is reported in em so a
  // font-size change (moving between slots) never retriggers the spring.
  useEffect(() => {
    const el = ref.current;
    if (!present || !el) return;
    const report = () =>
      onWidth(el.offsetWidth / parseFloat(getComputedStyle(el).fontSize));
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, [present, onWidth]);

  return (
    <ul ref={ref} className="flex w-max p-[0.25em]">
      {items.map((item) => {
        const shared = {
          onMouseEnter: () => setHovered(item.id),
          onFocus: () => setHovered(item.id),
          onBlur: () => setHovered(null),
          className: itemClass,
          "aria-current": value === item.id ? ("true" as const) : undefined,
        };
        return (
          <li key={item.id} className="relative">
            {lit === item.id && (
              <motion.span
                layoutId="pill-highlight"
                transition={SPRING}
                className="absolute inset-0 rounded-full bg-blue-900/50"
              />
            )}
            {item.href ? (
              <Link href={item.href} {...shared}>
                {item.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => onSelect?.(item)}
                {...shared}
              >
                {item.label}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Pill() {
  const { pill } = usePill();
  const { key, items, value, persist, onSelect } = pill;
  const [hovered, setHovered] = useState<string | null>(null);
  const [width, setWidth] = useState<{ em: number; snap: boolean } | null>(
    null,
  );

  // snap on the first measurement so the pill doesn't grow in from nothing
  const onWidth = useCallback(
    (em: number) => setWidth((prev) => ({ em, snap: prev === null })),
    [],
  );

  // a new set should not inherit the old hover
  useEffect(() => setHovered(null), [key]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex items-center gap-4">
        {/* GIF Container with proper dimensions and 'relative' */}
        <div className="relative w-full h-64 max-w-md overflow-hidden rounded-2xl">
          <Image
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1eDFpd3E4N2NmdXJkM2VjYTNqOGwzN3F0aDRoNWF6c29rOTM1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lq0h93752f6J9tijrh/giphy.gif"
            alt="Animated GIF showcase"
            fill
            priority
            unoptimized={true}
            className="object-cover"
          />
        </div>

        {/* Navigation bar */}
        <motion.div
          role="navigation"
          aria-label="Section navigation"
          initial={false}
          animate={width ? { width: `${width.em}em` } : undefined}
          transition={width?.snap ? { duration: 0 } : SPRING}
          onMouseLeave={() => setHovered(null)}
          className="pointer-events-auto relative inline-block overflow-hidden rounded-full bg-gray-400/15 backdrop-blur-xl"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={key}
              initial={BLUR_OUT}
              animate={BLUR_IN}
              exit={BLUR_OUT}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-max"
            >
              <Items
                items={items}
                value={value}
                persist={persist}
                onSelect={onSelect}
                hovered={hovered}
                setHovered={setHovered}
                onWidth={onWidth}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
