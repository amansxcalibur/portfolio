"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Context handles which section is currently on screen
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

// --- CONTENT ONLY (No layout math needed here!) ---

export function LeftHoverTool() {
  const { activeSection } = useSection();

  if (activeSection === "no-tools") return null;

  return (
    <button className="w-full h-full rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[24px]">
      {activeSection === "hero" ? "L1" : "buy"}
    </button>
  );
}

export function RightHoverTool() {
  const { activeSection } = useSection();

  if (activeSection === "pricing") return null;

  return (
    <button className="w-full h-full rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[24px]">
      R1
    </button>
  );
}