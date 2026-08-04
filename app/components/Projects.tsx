import { useTranslations } from "next-intl";

const Projects = () => {
  const t = useTranslations("Projects");
  const keys = ["First", "Second", "Third", "Fourth"] as const;

  return (
    <section className="mb-10" id="projects">
      <h2 className="section-title">{t("h1")}</h2>
      <p className="section-sub">A few things I&apos;ve been building.</p>
      <ul className="space-y-2 text-sm">
        {keys.map((project) => (
          <li key={t(`${project}.id`)}>
            <a
              className="link"
              href={t(`${project}.githubLink`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("ProjectLinkAriaLabel")}
            >
              {t(`${project}.title`).trim()}
            </a>
            <span className="text-gray-500"> — </span>
            <span className="text-gray-400">
              {t(`${project}.description`)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
