import { useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";

const Projects = () => {
  const t = useTranslations("Projects");
  const keys = ["First", "Second", "Third", "Fourth"] as const;

  return (
    <section className="mb-24 reveal" id="projects">
      <h2 className="section-title">{t("h1")}</h2>
      <p className="section-sub">{t("sub")}</p>
      <div className="space-y-10">
        {keys.map((project) => {
          const technologies = t.raw(`${project}.technologies`) as string[];
          return (
            <article key={t(`${project}.id`)}>
              <h3 className="text-base font-semibold tracking-tight text-[var(--heading)]">
                {t(`${project}.title`).trim()}
              </h3>
              <p className="text-sm text-[var(--muted-strong)] mt-2 leading-relaxed prose">
                {t(`${project}.description`)}
              </p>
              <p className="tech-list mt-3">{technologies.join(" • ")}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <a
                  className="link"
                  href={t(`${project}.githubLink`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("ProjectLinkAriaLabel")}
                >
                  GitHub <FiArrowUpRight aria-hidden />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
