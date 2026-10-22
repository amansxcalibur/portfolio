"use client";
import { useEffect, useRef } from "react";
import { useSection } from "@/../components/navigation/pillConfig"; // Adjust path if needed

export function useSectionTracker<T extends HTMLElement = HTMLDivElement>(sectionId: string) {
  const ref = useRef<T>(null);
  const { setActiveSection } = useSection();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section comes into view, update the context
        if (entry.isIntersecting) {
          setActiveSection(sectionId);
        }
      },
      { 
        // Triggers when the section crosses the middle of the viewport (50% from top, 50% from bottom)
        rootMargin: "-50% 0px -50% 0px" 
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionId, setActiveSection]);

  return ref;
}