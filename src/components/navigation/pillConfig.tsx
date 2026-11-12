"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { FLEX_NAME_MAX_EM, FlexName } from "@/components/flexName";
import { ArrowIcon, CloseIcon, SquiggleIcon } from "@/components/icons";
import { HashLink } from "./hashLink";
import { ShapeMorph } from "@/components/shapes/shapeMorph";
import { GITHUB_URL } from "@/content/links";
import {
  bunkmate,
  expressiveShapes,
  zenithShell,
  type Project,
} from "@/content/projects";

const slotClass =
  "flex size-full items-center justify-center rounded-full shadow-[0_0_0_1px_rgb(255_255_255/0.2)] transition-[filter] hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";
const iconClass = "size-[0.8em]";
const extraColors = "bg-inverse text-on-inverse";

/** hides the pill until the next section. sits right next to it, so a near miss costs nothing */
function Dismiss() {
  const { dismiss } = useSection();
  return (
    <button
      type="button"
      aria-label="Hide this menu until the next section"
      onClick={dismiss}
      className={`${slotClass} ${extraColors} cursor-pointer`}
    >
      <CloseIcon className={iconClass} />
    </button>
  );
}

const pageControls = { extraLeft: <Dismiss /> };

function externalSlot(href: string, label: string, colors: string) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`${slotClass} ${colors}`}
    >
      <ArrowIcon className={iconClass} />
    </a>
  );
}

function projectSection(project: Project, colors: string): SectionPill {
  const repo = project.links.find((link) => link.label === "GitHub")?.href;
  return {
    center: project.pillLabel,
    right: externalSlot(repo ?? GITHUB_URL, `${project.name} on GitHub`, colors),
    ...pageControls,
  };
}

function emojiSlot(emoji: string) {
  return (
    <div className="flex size-full items-center justify-center rounded-full bg-inverse text-[0.65em] shadow-[0_0_0_1px_rgb(255_255_255/0.2)]">
      {emoji}
    </div>
  );
}

const endLinkClass =
  "rounded-full underline-offset-[0.15em] transition-opacity hover:opacity-70 focus-visible:underline";

type SectionPill = {
  center: ReactNode;
  /** always visible beside the pill */
  left?: ReactNode;
  right?: ReactNode;
  /** revealed on hover, focus or tap */
  extraLeft?: ReactNode;
  extraRight?: ReactNode;
  /** the label animates its own width, the pill follows without a spring */
  fluid?: boolean;
  /** widest the whole pill gets in em, so its scale can be fit to the viewport once */
  fitEm?: number;
};

// label padding + shape slot + gap
const START_CHROME_EM = 1.4 + 1.75 + 0.5;

export const SECTION_CONFIG: Record<string, SectionPill> = {
  start: {
    center: <FlexName />,
    fluid: true,
    fitEm: FLEX_NAME_MAX_EM + START_CHROME_EM,
    left: (
      <div className="flex size-full items-center justify-center rounded-full bg-pop-2 text-on-pop-2">
        <ShapeMorph tempo="loader" className="size-[78%]" />
      </div>
    ),
    extraRight: (
      <HashLink to="about" aria-label="Scroll to about" className={`${slotClass} ${extraColors}`}>
        <ArrowIcon className={`${iconClass} rotate-135`} />
      </HashLink>
    ),
  },
  about: {
    center: "~About",
    right: emojiSlot("❤️"),
    ...pageControls,
  },
  work: {
    center: "~Index",
    ...pageControls,
  },
  art: {
    center: "~Lots left",
    right: (
      <div className="flex size-full items-center justify-center rounded-full bg-pop text-on-pop">
        <SquiggleIcon className="size-[1em]" />
      </div>
    ),
    ...pageControls,
  },
  dev: {
    center: "~Dev",
    right: externalSlot(GITHUB_URL, "All projects on GitHub", "bg-pop text-on-pop"),
    ...pageControls,
  },
  lost: {
    center: "~Lost",
    right: emojiSlot("🧭"),
    ...pageControls,
  },
  [`project-${expressiveShapes.slug}`]: projectSection(
    expressiveShapes,
    "bg-[#a6f0cb] text-[#00392a]",
  ),
  [`project-${zenithShell.slug}`]: projectSection(
    zenithShell,
    "bg-[#ffdad5] text-[#561e19]",
  ),
  [`project-${bunkmate.slug}`]: projectSection(bunkmate, "bg-[#22d3ee] text-black"),
  end: {
    center: (
      <nav aria-label="Explore" className="flex items-center gap-[0.6em]">
        <Link href="/art" className={endLinkClass}>
          art
        </Link>
        <ShapeMorph className="size-[1.2em]" startAt={1} />
        <Link href="/dev" className={endLinkClass}>
          dev
        </Link>
      </nav>
    ),
  },
};

const SectionContext = createContext<{
  /** empty until a section reports in */
  activeSection: string;
  /** the pill was closed for this section, resets on the next one */
  dismissed: boolean;
  setActiveSection: (section: string) => void;
  dismiss: () => void;
}>({
  activeSection: "",
  dismissed: false,
  setActiveSection: () => {},
  dismiss: () => {},
});

export function SectionProvider({ children }: { children: ReactNode }) {
  const [{ activeSection, dismissed }, setState] = useState({
    activeSection: "",
    dismissed: false,
  });

  const setActiveSection = useCallback((section: string) => {
    setState((current) =>
      current.activeSection === section
        ? current
        : { activeSection: section, dismissed: false },
    );
  }, []);
  const dismiss = useCallback(() => {
    setState((current) => ({ ...current, dismissed: true }));
  }, []);

  const value = useMemo(
    () => ({ activeSection, dismissed, setActiveSection, dismiss }),
    [activeSection, dismissed, setActiveSection, dismiss],
  );
  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>;
}

export const useSection = () => useContext(SectionContext);
