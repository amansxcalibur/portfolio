"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useSectionTracker } from "@/hooks/useSectionTracker";

type TrackedSectionProps = ComponentPropsWithoutRef<"section"> & {
  /** SECTION_CONFIG key the pill shows while this is active */
  section: string;
};

/** a <section> that updates the pill, so server components can stay server components */
export function TrackedSection({ section, ...props }: TrackedSectionProps) {
  const ref = useSectionTracker<HTMLElement>(section);
  return <section ref={ref} {...props} />;
}
