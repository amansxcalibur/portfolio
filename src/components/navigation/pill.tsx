"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePillAnimation } from "@/hooks/usePillAnimation";
import { MergeSlot } from "./mergeSlot";
import { useSection, SECTION_CONFIG } from "./pillConfig";

const SPRING = { type: "spring", stiffness: 380, damping: 34, mass: 0.8 } as const;
const LABEL_CLASS = "block w-max animate-pill-label px-[0.7em] py-[0.125em]";

type PillCenterProps = {
  id: string;
  children: ReactNode;
  /** Present when the section has extras to reveal, for touch and keyboard. */
  expanded?: boolean;
  onToggle?: () => void;
};

function PillCenter({ id, children, expanded, onToggle }: PillCenterProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  // In em, so a viewport-driven font size change never retriggers the spring.
  const [width, setWidth] = useState<{ em: number; snap: boolean } | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const em = el.offsetWidth / parseFloat(getComputedStyle(el).fontSize);
      // Snap on first measurement so the pill doesn't grow in from nothing.
      setWidth((previous) => ({ em, snap: previous === null }));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={false}
      animate={width ? { width: `${width.em}em` } : undefined}
      transition={width?.snap || reducedMotion ? { duration: 0 } : SPRING}
      className="relative z-10 shrink-0 overflow-hidden rounded-full bg-inverse leading-[1.5] tracking-wide text-on-inverse shadow-[0_0_0_1px_rgb(255_255_255/0.2)]"
    >
      <div ref={contentRef} className="w-max">
        {onToggle ? (
          <button
            key={id}
            type="button"
            aria-expanded={expanded}
            onClick={onToggle}
            className={`${LABEL_CLASS} cursor-pointer focus-visible:underline focus-visible:outline-none`}
          >
            {children}
          </button>
        ) : (
          <div key={id} className={LABEL_CLASS}>
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Pill() {
  const pillRef = useRef<HTMLDivElement>(null);
  const { activeSection, dismissed } = useSection();
  const config = SECTION_CONFIG[activeSection] ?? SECTION_CONFIG.start;
  // Stored per section, so moving to another section collapses the pill again.
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const expanded = expandedSection === activeSection;
  const hasExtras = Boolean(config.extraLeft || config.extraRight);
  // Waiting for a section avoids flashing the home label on other pages.
  const hidden = dismissed || !activeSection;

  usePillAnimation(pillRef);

  return (
    <div
      ref={pillRef}
      // Hidden until usePillAnimation has placed it, then positioned by inline style.
      className="pointer-events-none fixed bottom-0 left-1/2 z-50 origin-bottom font-round text-[clamp(2rem,4.4vw,4rem)] whitespace-nowrap opacity-0"
    >
      <div
        inert={hidden}
        data-pill-row
        data-expanded={expanded}
        className={`flex items-center transition-[translate,opacity] duration-300 [--pill-expanded:0] hover:[--pill-expanded:1] has-[:focus-visible]:[--pill-expanded:1] data-[expanded=true]:[--pill-expanded:1] ${
          hidden
            ? "translate-y-[calc(100%+2rem)] opacity-0"
            : "pointer-events-auto"
        }`}
      >
        <MergeSlot side="left" level="secondary">
          {config.extraLeft}
        </MergeSlot>
        <MergeSlot side="left" level="primary">
          {config.left}
        </MergeSlot>
        <PillCenter
          id={activeSection}
          expanded={hasExtras ? expanded : undefined}
          onToggle={
            hasExtras
              ? () => setExpandedSection(expanded ? null : activeSection)
              : undefined
          }
        >
          {config.center}
        </PillCenter>
        <MergeSlot side="right" level="primary">
          {config.right}
        </MergeSlot>
        <MergeSlot side="right" level="secondary">
          {config.extraRight}
        </MergeSlot>
      </div>
    </div>
  );
}
