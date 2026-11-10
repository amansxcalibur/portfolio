import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/icons";
import { TrackedSection } from "@/components/navigation/TrackedSection";
import type { Project } from "@/content/projects";
import { getRepoStars } from "@/lib/github";

// A star or two reads as less than none at all.
const MIN_STARS_SHOWN = 5;

export type ProjectTheme = {
  card: string;
  button: string;
  chip: string;
};

type ProjectCardProps = {
  project: Project;
  theme: ProjectTheme;
  /** "split" puts media beside the text on wide screens, "stacked" below it. */
  layout: "split" | "stacked";
  children: ReactNode;
  /** Extra content under the links, such as an install command. */
  footnote?: ReactNode;
};

export async function ProjectCard({
  project,
  theme,
  layout,
  children,
  footnote,
}: ProjectCardProps) {
  const stars = await getRepoStars(project.repo);

  return (
    <TrackedSection
      section={`project-${project.slug}`}
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      className="py-1.5"
    >
      <article
        className={`relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] p-[clamp(1.25rem,3.5vw,3rem)] ${theme.card}`}
      >
        <div
          className={`relative grid gap-[clamp(1.5rem,3vw,3rem)] ${
            layout === "split" ? "items-center lg:grid-cols-2" : ""
          }`}
        >
          <div className={layout === "stacked" ? "max-w-2xl" : ""}>
            <h2
              id={`${project.slug}-title`}
              className="font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-none"
            >
              {project.name}
            </h2>
            <p className="mt-3 text-[clamp(1.05rem,1.4vw,1.3rem)] leading-snug font-medium">
              {project.tagline}
            </p>
            <p className="mt-3 max-w-[60ch] text-[0.95rem] leading-relaxed opacity-85">
              {project.description}
            </p>

            {project.credits && (
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-85">
                {project.credits.map(({ label, href }) => (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4"
                      >
                        {label}
                      </a>
                    ) : (
                      label
                    )}
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-5 flex flex-wrap gap-1.5 font-mono text-xs">
              {stars !== null && stars >= MIN_STARS_SHOWN && (
                <li className={`rounded px-2 py-1 ${theme.chip}`}>
                  ★ {stars} on GitHub
                </li>
              )}
              {project.facts.map((fact) => (
                <li key={fact} className={`rounded px-2 py-1 ${theme.chip}`}>
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-[border-radius,transform] duration-300 hover:rounded-md active:scale-95 ${theme.button}`}
                >
                  {label}
                  <ArrowIcon className="size-3.5" />
                </a>
              ))}
            </div>
            {footnote}
          </div>

          <div className="min-w-0">{children}</div>
        </div>
      </article>
    </TrackedSection>
  );
}
