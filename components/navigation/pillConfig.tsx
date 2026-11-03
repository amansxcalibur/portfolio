"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

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

const Goodbye = (
  <div className="relative w-full h-full rounded-full overflow-hidden gap-[60px] flex">
    <Link href="/art">art</Link>
    {/* <p className="text-stone-700">|</p> */}
    <div className="relative m-[2px] w-[90px] h-[90px] rounded-full bg-amber-300 overflow-hidden grayscale contrast-200 invert">
      <Image
        src="/shapes/loader.gif"
        alt="GIF"
        fill
        priority
        unoptimized
        className="object-cover scale-125"
      />
    </div>
    <Link href="/dev">dev</Link>
  </div>
);

// Added `center?: ReactNode` to the type
export const SECTION_CONFIG: Record<
  string,
  { left?: ReactNode; right?: ReactNode; center?: ReactNode }
> = {
  // --- WHEN AT THE TOP ---
  start: {
    left: LoaderLeft,
    right: null,
    center: "~Hola Pe", // Dynamic center
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
    center: "~Features", // Dynamic center
  },
  about: {
    left: null,
    right: (
      <div className="w-full h-full rounded-full bg-black text-white font-bold flex items-center justify-center text-[42px]">
        ❤️
      </div>
    ),
    center: "~About", // Dynamic center
  },

  // -- art --
  art: {
    left: (
      <div className="w-full h-full rounded-full bg-black text-white font-bold flex items-center justify-center text-[24px]">
        {'<'}-
      </div>
    ),
    right: null,
    center: "~Lots left", // Dynamic center
  },

  // --- WHEN AT THE BOTTOM ---
  end: {
    left: null,
    right: null,
    center: Goodbye, // Dynamic center
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
