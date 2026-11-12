"use client";

import { useEffect, useRef } from "react";
import { useSection } from "@/components/navigation/pillConfig";

/** marks the ref's element as the active section while it crosses mid-viewport */
export function useSectionTracker<T extends HTMLElement = HTMLDivElement>(
  sectionId: string,
) {
  const ref = useRef<T>(null);
  const { setActiveSection } = useSection();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveSection(sectionId);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionId, setActiveSection]);

  return ref;
}
