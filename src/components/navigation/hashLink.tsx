"use client";

import type { ComponentPropsWithoutRef } from "react";

type HashLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  /** The id of the element to scroll to, without the "#". */
  to: string;
};

/**
 * A link to a section of the current page that scrolls every time it is
 * clicked. A plain hash link does nothing when the URL already ends in that
 * hash, so clicking it, scrolling away and clicking again would go nowhere.
 */
export function HashLink({ to, onClick, ...props }: HashLinkProps) {
  return (
    <a
      {...props}
      href={`#${to}`}
      onClick={(event) => {
        onClick?.(event);
        const target = document.getElementById(to);
        // Leave modified clicks (new tab, and so on) and missing targets to the browser.
        if (event.defaultPrevented || !target || event.metaKey || event.ctrlKey || event.shiftKey) {
          return;
        }
        event.preventDefault();
        if (window.location.hash !== `#${to}`) window.history.pushState(null, "", `#${to}`);
        target.scrollIntoView();
      }}
    />
  );
}
