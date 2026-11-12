export type ProjectLink = { label: string; href: string };
export type ProjectCredit = { label: string; href?: string };

export type Project = {
  slug: string;
  name: string;
  pillLabel: string;
  tagline: string;
  description: string;
  repo: string; // for the live star count
  facts: string[];
  links: ProjectLink[];
  credits?: ProjectCredit[];
};

export const expressiveShapes: Project = {
  slug: "expressive-shapes",
  name: "expressive-shapes",
  pillLabel: "~Shapes",
  tagline: "Expressive shape morphing and animation for everyone.",
  description:
    "A pure-Python library for creating, rounding and morphing polygons with cubic Bézier curves, inspired by Android's Material Design shape system. It outputs plain curves, so you can render them with Cairo, SVG, Canvas or anything else that draws paths.",
  repo: "amansxcalibur/expressive-shapes",
  facts: ["Python", "Zero dependencies", "30+ preset shapes"],
  links: [
    {
      label: "GitHub",
      href: "https://github.com/amansxcalibur/expressive-shapes",
    },
    { label: "PyPI", href: "https://pypi.org/project/expressive-shapes/" },
  ],
};

export const zenithShell: Project = {
  slug: "zenith-shell",
  name: "Zenith Shell",
  pillLabel: "~Zenith",
  tagline: "A shell for i3wm and sway, crafted with fabric.",
  description:
    "Turns a bare tiling window manager into one cohesive, expressive desktop. Every surface shares a single design language, and the whole shell recolours itself from your wallpaper with Material You. It runs on i3wm, sway and swayFX, on Arch and Ubuntu/Debian, and is nearing its first stable release.",
  repo: "amansxcalibur/zenith-shell",
  facts: ["PyGObject", "GTK", "Matugen", "Wayland", "X11"],
  links: [
    { label: "GitHub", href: "https://github.com/amansxcalibur/zenith-shell" },
  ],
};

export const bunkmate: Project = {
  slug: "bunkmate",
  name: "Bunkmate",
  pillLabel: "~Bunkmate",
  tagline: "Here to serve all your bunking needs ;)",
  description:
    "An attendance tracker for students. Enter your timetable and required percentage, and it works out how many classes you can safely bunk.",
  repo: "Bunk-Mate/Website",
  facts: ["1k+ monthly users", "10k+ app downloads", "Next.js", "Tailwind CSS"],
  links: [
    { label: "bunkmate.in", href: "https://www.bunkmate.in" },
    { label: "GitHub", href: "https://github.com/Bunk-Mate/Website" },
  ],
};
