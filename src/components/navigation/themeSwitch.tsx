"use client";

import { THEME_STORAGE_KEY, THEMES } from "@/content/themes";

/**
 * Steps to the next color theme. The swatch and the name are drawn from the
 * theme's own CSS variables, so the button holds no state and never mismatches
 * the server render.
 */
export function ThemeSwitch({ className }: { className?: string }) {
  const next = () => {
    const root = document.documentElement;
    const current = THEMES.findIndex((theme) => theme === root.dataset.theme);
    // No attribute means the default, which is the first theme.
    const theme = THEMES[(Math.max(current, 0) + 1) % THEMES.length];

    const apply = () => {
      root.dataset.theme = theme;
    };
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Crossfade the whole page where the browser can; otherwise just switch.
    if (!calm && "startViewTransition" in document) document.startViewTransition(apply);
    else apply();

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Private mode or blocked storage: the theme still applies for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={next}
      aria-label="Change color theme"
      className={`inline-flex cursor-pointer items-center gap-[0.5em] ${className ?? ""}`}
    >
      <span aria-hidden="true" className="flex -space-x-[0.3em]">
        <span className="size-[0.85em] rounded-full bg-pop ring-1 ring-current/20" />
        <span className="size-[0.85em] rounded-full bg-pop-2 ring-1 ring-current/20" />
        <span className="size-[0.85em] rounded-full bg-pop-3 ring-1 ring-current/20" />
      </span>
      <span aria-hidden="true" className="lowercase after:content-(--theme-name) max-sm:hidden" />
    </button>
  );
}
