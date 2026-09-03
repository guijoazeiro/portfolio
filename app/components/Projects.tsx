import { useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";

const Projects = () => {
  const t = useTranslations("Projects");
  const keys = ["First", "Second", "Third", "Fourth"] as const;

  return (
    <section className="mb-16 md:mb-24 reveal" id="projects">
      <div className="experience-heading">
        <span className="experience-heading__bar" aria-hidden="true" />
        <h2 className="section-title">{t("h1")}</h2>
      </div>

      <ul className="projects-list">
        {keys.map((project) => {
          const href = t(`${project}.githubLink`);
          const origin = new URL(href).hostname
            .replace(/^www\./, "")
            .toUpperCase();

          return (
            <li key={t(`${project}.id`)}>
              <a
                className="projects-list__link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("ProjectLinkAriaLabel", {
                  project: t(`${project}.title`).trim(),
                })}
              >
                <span className="projects-list__content">
                  <span className="projects-list__title-row">
                    <span className="projects-list__name">
                      {t(`${project}.title`).trim()}
                    </span>
                    <span className="projects-list__origin">{origin}</span>
                  </span>
                  <span className="projects-list__description">
                    {t(`${project}.description`)}
                  </span>
                </span>
                <FiArrowUpRight
                  className="projects-list__arrow"
                  aria-hidden="true"
                  focusable="false"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Projects;
