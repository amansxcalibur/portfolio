"use client";
import { useSectionTracker } from "@/../_contexts/useSectionTracker"; // adjust path if needed

export function TrackedStart() {
  const sectionRef = useSectionTracker<HTMLElement>("start");

  return (
    <section
      ref={sectionRef}
      id="start"
      className="h-[100vh] bg-blue-100 flex items-center justify-center"
    >
      <h1>Top Hero Section</h1>
    </section>
  );
}