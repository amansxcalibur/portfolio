"use client";

import { useEffect, useRef } from "react";

type LoopVideoProps = {
  src: string;
  label: string;
  className?: string;
};

// no autoplay attribute on purpose cuz apparently it makes the browser download the whole file up front
export function LoopVideo({ src, label, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      // start a bit early so it's already moving when seen
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
