"use client";
import { useSectionTracker } from "../../../_contexts/useSectionTracker";

export default function Art() {
  const sectionRef = useSectionTracker<HTMLElement>("art");

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex justify-center bg-blue-600 py-[80px]"
    >
      <div className="max-w-[1680px]  flex flex-col items-center gap-[24px]">
        <div className="flex">
          <p className="text-[40px]">Krita my beloved</p>
          <video
            src="/krita/intro.mp4"
            autoPlay
            playsInline
            muted
            loop
            className="w-full h-auto block pointer-events-none rounded-3xl"
          />
        </div>
        <div className="flex gap-[24px]">
          <img
            src="/krita/endorsi.png"
            className="min-w-[720px] h-auto block rounded-3xl"
            loading="lazy"
          />
          <div className="flex flex-col gap-[24px]">
            <video
              src="/krita/sight_output.mp4"
              autoPlay
              playsInline
              muted
              loop
              className="w-full h-auto block pointer-events-none rounded-3xl"
            />
            <video
              src="/krita/confrontation.mp4"
              autoPlay
              playsInline
              muted
              loop
              className="w-full h-auto block pointer-events-none rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
