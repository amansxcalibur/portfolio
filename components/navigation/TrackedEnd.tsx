"use client";
import { useSectionTracker } from "@/../_contexts/useSectionTracker";

export function TrackedEnd() {
  const sectionRef = useSectionTracker<HTMLDivElement>("end");

  return (
    <div
      ref={sectionRef}
      id="end"
      className="flex min-h-[90vh] items-end px-[1.5vw] py-[1vw] text-[1.5vw] text-[#555555] max-md:flex-col max-md:items-center max-md:justify-end max-md:p-[10vw] max-md:text-[5vw] md:gap-x-[3vw]"
    >
      <div className="md:flex-1">
        <p>&copy; 2026</p>
      </div>
      <div className="flex gap-x-[3vw]">
        <p className="flex-1">Instagram</p>
        <p className="flex-1">Twitter</p>
        <p className="flex-1">Linkedin</p>
      </div>
      <p className="whitespace-nowrap">Be expressive</p>
    </div>
  );
}