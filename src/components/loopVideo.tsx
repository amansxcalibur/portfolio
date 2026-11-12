"use client";

import { useEffect, useRef } from "react";

type LoopVideoProps = {
  src: string;
  label: string;
  className?: string;
};

/**
 * Muted looping video that plays only while on screen and respects reduced
 * motion. There is no autoplay attribute: it would make the browser download
 * the whole file up front, even far below the fold. Until then only the
 * metadata and first frame load.
 */
export function LoopVideo({ src, label, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Autoplay can be refused (e.g. battery saver). The first frame still shows.
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      // Start a little early so the clip is moving by the time it is seen.
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
