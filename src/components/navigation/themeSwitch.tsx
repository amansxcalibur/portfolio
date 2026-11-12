"use client";

import { THEME_STORAGE_KEY, THEMES } from "@/content/themes";

/** cycles the color theme. swatch and name come from css vars, so no state and no hydration mismatch */
export function ThemeSwitch({ className }: { className?: string }) {
  const next = () => {
    const root = document.documentElement;
    const current = THEMES.findIndex((theme) => theme === root.dataset.theme);
    // no attribute means the default (first) theme
    const theme = THEMES[(Math.max(current, 0) + 1) % THEMES.length];

    const apply = () => {
      root.dataset.theme = theme;
    };
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // crossfade where supported, otherwise just switch
    if (!calm && "startViewTransition" in document) document.startViewTransition(apply);
    else apply();

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // private mode or blocked storage, still applies for this visit
    }
  };

  return (
    <button
      type="button"
      onClick={next}
      aria-label="Change color theme"
      className={`inline-flex cursor-pointer items-center gap-[0.5em] ${className ?? ""}`}
    >
      <span aria-hidden="true" className="flex space-x-[-0.3em]">
        <span className="size-[0.85em] rounded-full bg-pop ring-1 ring-current/20" />
        <span className="size-[0.85em] rounded-full bg-pop-2 ring-1 ring-current/20" />
        <span className="size-[0.85em] rounded-full bg-pop-3 ring-1 ring-current/20" />
      </span>
      <span aria-hidden="true" className="lowercase after:content-(--theme-name) max-sm:hidden" />
    </button>
  );
}
