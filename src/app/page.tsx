"use client";
import { useSectionTracker } from "@/../_contexts/useSectionTracker"; // Adjust path as needed

// 1. The Section Component
export function FeaturesSection() {
  // Matches the "features" key in SECTION_CONFIG
  const sectionRef = useSectionTracker<HTMLElement>("features");

  return (
    <section 
      ref={sectionRef} 
      // Added some padding/flex to center the text and make it look like a distinct section
      className="min-h-screen bg-neutral-800 rounded-3xl p-12 flex flex-col justify-center mt-12"
    >
      <h2 className="text-5xl font-bold text-white mb-4">Features Content</h2>
      <p className="text-neutral-400 text-xl">
        Scroll down to see the pill update! Since this section uses the "features" tracker, 
        the left circle will now say "hi" and the right will say "tiendo".
      </p>
    </section>
  );
}

// 2. The Main Page
export default function GooeyMergeOverlay() {
  return (
    // Note: ensure your <SectionProvider> wraps this page somewhere (like in layout.tsx)!
    <div className="min-h-[200vh] w-full bg-blue-100 text-neutral-800">
      
      {/* Spacer to act as the 'Hero' section so you have to scroll to reach Features */}
      <div className="h-[80vh] flex items-center justify-center border-b border-blue-200">
        <p>Scroll down to reach the Features section 👇</p>
      </div>

      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-neutral-900">
          Fluid Interfaces
        </h1>
        <p className="mb-6 text-lg leading-relaxed text-neutral-600">
          This is an example page with standard content. The interactive gooey
          element lives on an overlay layer above this text. You can still
          scroll the page and read the content, while the fixed overlay sits
          comfortably on top.
        </p>
        
        {/* Features Section - Triggers the "hi" and "tiendo" update */}
        <FeaturesSection />
        
      </main>
    </div>
  );
}