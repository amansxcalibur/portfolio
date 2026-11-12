"use client";

import type { ComponentPropsWithoutRef } from "react";

type HashLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  /** element id to scroll to, without the "#" */
  to: string;
};

/** hash link that scrolls on every click. a plain one does nothing if the url already has that hash */
export function HashLink({ to, onClick, ...props }: HashLinkProps) {
  return (
    <a
      {...props}
      href={`#${to}`}
      onClick={(event) => {
        onClick?.(event);
        const target = document.getElementById(to);
        // leave modified clicks (new tab etc) and missing targets to the browser
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
