"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// --- STATE MANAGEMENT ---
// 1. Context to track the current active page section
const SectionContext = createContext({
  activeSection: "hero",
  setActiveSection: (section: string) => {},
});

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState("hero");
  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => useContext(SectionContext);

// --- HOVER COMPONENTS ---
// 2. Separated components for the Hover Content. 
// They transition from 0 width/opacity to full width/opacity when the parent is hovered.

export function LeftHoverSlot() {
  const { activeSection } = useSection();

  return (
    <div className="flex items-center w-0 overflow-hidden opacity-0 scale-90 transition-all duration-400 ease-out group-hover:w-[160px] group-hover:opacity-100 group-hover:scale-100 group-hover:mr-4">
      {/* Conditional Rendering based on Section */}
      {activeSection === "hero" && (
        <button className="bg-white/10 backdrop-blur-md text-white rounded-full px-6 py-4 text-[32px] w-full border border-white/20">
          Share
        </button>
      )}
      {activeSection === "pricing" && (
        <button className="bg-amber-300 text-black rounded-full px-6 py-4 text-[32px] w-full font-medium">
          Buy Now
        </button>
      )}
    </div>
  );
}

export function RightHoverSlot() {
  const { activeSection } = useSection();

  return (
    <div className="flex items-center w-0 overflow-hidden opacity-0 scale-90 transition-all duration-400 ease-out group-hover:w-[160px] group-hover:opacity-100 group-hover:scale-100 group-hover:ml-4">
      {activeSection === "hero" && (
        <button className="bg-white/10 backdrop-blur-md text-white rounded-full px-6 py-4 text-[32px] w-full border border-white/20">
          Docs
        </button>
      )}
    </div>
  );
}