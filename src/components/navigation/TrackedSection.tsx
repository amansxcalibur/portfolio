"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useSectionTracker } from "@/hooks/useSectionTracker";

type TrackedSectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Key in SECTION_CONFIG that the pill shows while this section is active. */
  section: string;
};

/** A <section> that updates the pill. Lets server components stay server components. */
export function TrackedSection({ section, ...props }: TrackedSectionProps) {
  const ref = useSectionTracker<HTMLElement>(section);
  return <section ref={ref} {...props} />;
}
