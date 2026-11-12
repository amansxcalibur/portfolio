"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, type AnimationPlaybackControls } from "motion/react";
import { usePillAnimation } from "@/hooks/usePillAnimation";
import { MergeSlot } from "./mergeSlot";
import { useSection, SECTION_CONFIG } from "./pillConfig";

const RESIZE = { duration: 0.07, ease: [0.25, 0.1, 0.25, 1] } as const;
const LABEL_CLASS = "block w-max animate-pill-label px-[0.7em] py-[0.125em]";

type PillCenterProps = {
  id: string;
  children: ReactNode;
  /** the label keeps changing width, so the pill hugs it every frame */
  fluid?: boolean;
  /** set when the section has extras to reveal, for touch and keyboard */
  expanded?: boolean;
  onToggle?: () => void;
};

function PillCenter({ id, children, fluid, expanded, onToggle }: PillCenterProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // width is driven outside react since a fluid label resizes every frame
  useEffect(() => {
    const box = boxRef.current;
    const el = contentRef.current;
    if (!box || !el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // in em, so viewport font size changes don't retrigger a resize
    const measure = () => el.offsetWidth / parseFloat(getComputedStyle(el).fontSize);
    const set = (em: number) => {
      box.style.width = `${em}em`;
    };

    let label: string | undefined;
    let resize: AnimationPlaybackControls | undefined;

    const observer = new ResizeObserver(() => {
      const next = el.dataset.label;
      const sameLabel = next === label;
      const hug = sameLabel && el.dataset.fluid === "true";
      // snap on first measure so the pill doesn't grow in from nothing
      const first = label === undefined;
      label = next;

      if (first || reducedMotion || (hug && !resize)) {
        set(measure());
        return;
      }
      // let the resize to the new label land first, it catches up below
      if (hug) return;

      resize?.stop();
      const from = box.offsetWidth / parseFloat(getComputedStyle(el).fontSize);
      const controls = animate(from, measure(), { ...RESIZE, onUpdate: set });
      resize = controls;
      controls.finished.then(() => {
        if (resize !== controls) return;
        resize = undefined;
        set(measure());
      });
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      resize?.stop();
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className="relative z-10 shrink-0 overflow-hidden rounded-full bg-inverse leading-normal tracking-wide text-on-inverse shadow-[0_0_0_1px_rgb(255_255_255/0.2)]"
    >
      <div ref={contentRef} data-label={id} data-fluid={fluid} className="w-max">
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
    </div>
  );
}

export default function Pill() {
  const pillRef = useRef<HTMLDivElement>(null);
  const { activeSection, dismissed } = useSection();
  const config = SECTION_CONFIG[activeSection] ?? SECTION_CONFIG.start;
  // per section, so moving on collapses the pill again
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const expanded = expandedSection === activeSection;
  const hasExtras = Boolean(config.extraLeft || config.extraRight);
  // wait for a section so other pages don't flash the home label
  const hidden = dismissed || !activeSection;

  usePillAnimation(pillRef);

  return (
    <div
      ref={pillRef}
      data-fit-em={config.fitEm}
      // hidden until usePillAnimation places it
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
        <MergeSlot side="left" level="secondary" widthEm={config.extraLeftWidthEm}>
          {config.extraLeft}
        </MergeSlot>
        <MergeSlot side="left" level="primary">
          {config.left}
        </MergeSlot>
        <PillCenter
          id={activeSection}
          fluid={config.fluid}
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
