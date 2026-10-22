"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Image from "next/image";

// Extract the loader into a variable so we can easily reuse it for both "start" and "end"
const LoaderLeft = (
  <div className="relative w-full h-full rounded-full bg-amber-300 overflow-hidden">
    <Image 
      src="/shapes/loader.gif" 
      alt="GIF" 
      fill 
      priority 
      unoptimized 
      className="object-cover scale-125" 
    />
  </div>
);

export const SECTION_CONFIG: Record<string, { left?: ReactNode; right?: ReactNode }> = {
  // --- WHEN AT THE TOP ---
  start: {
    left: LoaderLeft,
    right: null, // Nothing on the right
  },
  
  // --- WHEN IN FEATURES ---
  features: {
    left: (
      <div className="w-full h-full rounded-full bg-green-500 text-white font-bold flex items-center justify-center text-[24px]">
        hi
      </div>
    ),
    right: (
      <div className="w-full h-full rounded-full bg-purple-500 text-white font-bold flex items-center justify-center text-[24px]">
        tiendo
      </div>
    ),
  },

  // --- WHEN AT THE BOTTOM ---
  end: {
    left: LoaderLeft,
    right: null, // Nothing on the right
  },
};

// 2. Context to track the current active section
const SectionContext = createContext({
  activeSection: "start", // Set default to "start"
  setActiveSection: (section: string) => {},
});

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState("start");
  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => useContext(SectionContext);