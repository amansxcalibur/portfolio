"use client";

import { useEffect, useRef } from "react";

type LoopVideoProps = {
  src: string;
  label: string;
  className?: string;
};

/** Muted looping video that respects reduced motion and stops when its route is hidden. */
export function LoopVideo({ src, label, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    // Autoplay can be refused (e.g. battery saver). The first frame still shows.
    video.play().catch(() => {});
    return () => video.pause();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
