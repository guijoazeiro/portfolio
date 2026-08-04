import { useTranslations } from "next-intl";

const Projects = () => {
  const t = useTranslations("Projects");
  const keys = ["First", "Second", "Third", "Fourth"] as const;

  return (
    <section className="mb-16" id="projects">
      <h2 className="section-title">{t("h1")}</h2>
      <p className="section-sub">{t("sub")}</p>
      <div className="space-y-8">
        {keys.map((project) => {
          const technologies = t.raw(`${project}.technologies`) as string[];
          return (
            <article key={t(`${project}.id`)}>
              <a
                className="link text-sm font-semibold"
                href={t(`${project}.githubLink`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("ProjectLinkAriaLabel")}
              >
                {t(`${project}.title`).trim()}
              </a>
              <p className="text-sm text-[var(--muted-strong)] mt-1 leading-relaxed prose">
                {t(`${project}.description`)}
              </p>
              <p className="tech-list mt-2">{technologies.join(" • ")}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
