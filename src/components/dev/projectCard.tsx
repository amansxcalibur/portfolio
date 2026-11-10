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
      className="py-[clamp(0.25rem,0.5vw,0.5rem)]"
    >
      <article
        className={`relative overflow-hidden rounded-[clamp(2rem,5vw,5rem)] p-[clamp(1.25rem,4vw,5rem)] ${theme.card}`}
      >
        <div
          className={`relative grid gap-[clamp(2rem,4vw,5rem)] ${
            layout === "split" ? "items-center lg:grid-cols-2" : ""
          }`}
        >
          <div className={layout === "stacked" ? "max-w-4xl" : ""}>
            <h2
              id={`${project.slug}-title`}
              className="text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] font-semibold tracking-tight"
            >
              {project.name}
            </h2>
            <p className="mt-[0.6em] text-[clamp(1.25rem,2.1vw,2.25rem)] leading-tight font-medium tracking-tight">
              {project.tagline}
            </p>
            <p className="mt-[1em] max-w-[60ch] text-[clamp(1rem,1.25vw,1.25rem)] leading-relaxed opacity-85">
              {project.description}
            </p>

            {project.credits && (
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[clamp(0.95rem,1.1vw,1.125rem)] opacity-85">
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

            <ul className="mt-6 flex flex-wrap gap-2 text-[clamp(0.875rem,1vw,1rem)]">
              {stars !== null && stars >= MIN_STARS_SHOWN && (
                <li className={`rounded-full px-[1em] py-[0.35em] ${theme.chip}`}>
                  ★ {stars} on GitHub
                </li>
              )}
              {project.facts.map((fact) => (
                <li key={fact} className={`rounded-full px-[1em] py-[0.35em] ${theme.chip}`}>
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full px-[1.3em] py-[0.7em] text-[clamp(1rem,1.25vw,1.25rem)] font-medium transition-[border-radius,transform] duration-300 hover:rounded-2xl active:scale-95 ${theme.button}`}
                >
                  {label}
                  <ArrowIcon />
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
