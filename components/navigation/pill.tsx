"use client";

import { useRef } from "react";
import { usePillAnimation } from "@/../_contexts/usePillAnimations";
import { MergeSlot } from "./mergeSlot";
import { useSection, SECTION_CONFIG } from "./pillConfig";

export default function Pill() {
  const pillRef = useRef<HTMLDivElement>(null);
  const { activeSection } = useSection();
  
  // Get the active items based on section, default to "start" instead of "hero"
  const currentConfig = SECTION_CONFIG[activeSection] || SECTION_CONFIG["start"];

  // Hook handles scaling the parent on scroll
  usePillAnimation(pillRef);

  return (
    <div
      ref={pillRef}
      // 'group' triggers the left and right MergeSlots to slide out when hovered
      className="fixed bottom-0 left-1/2 origin-center z-50 will-change-transform group cursor-pointer"
    >
      <div className="flex items-center text-[65px] whitespace-nowrap p-6">
        
        {/* --- DYNAMIC LEFT SLOT --- */}
        <MergeSlot side="left">
          {currentConfig.left}
        </MergeSlot>

        {/* --- MAIN PILL --- */}
        <div className="shrink-0 relative z-10 transition-all duration-300">
          <div className="bg-black text-white rounded-full tracking-wider flex items-center px-[45px] py-[8px]">
            {/* Render the dynamic center text, fallback to ~Hola Pe just in case */}
            {currentConfig.center || "~Hola Pe"}
          </div>
        </div>

        {/* --- DYNAMIC RIGHT SLOT --- */}
        <MergeSlot side="right">
          {currentConfig.right}
        </MergeSlot>

      </div>
    </div>
  );
}