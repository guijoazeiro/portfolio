import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

const Projects = () => {
  const t = useTranslations("Projects");
  const keys = ["First", "Second", "Third", "Fourth"] as const;

  return (
    <div className="container mx-auto px-5 pb-10 md:px-0" id="projects">
      <h1 className="underline underline-offset-4 mb-5 text-2xl">{t("h1")}</h1>

      <div className="flex items-center justify-between flex-wrap">
        {keys.map((project) => {
          const technologies = t.raw(`${project}.technologies`) as string[];

          return (
            <div
              className="bg-zinc-800 bg-opacity-20 hover:border-gray-600 transition-all duration-500 border-gray-800 border rounded-md p-5 w-full md:w-[49%] flex flex-col justify-between items-center mb-5 gap-10"
              key={t(`${project}.id`)}
            >
              <div className="w-full flex items-center justify-end gap-5">
                <Link
                  href={t(`${project}.githubLink`)}
                  target="_blank"
                  aria-label={t("ProjectLinkAriaLabel")}
                >
                  <FiGithub className="hover:text-[#93DEFF]" size={20} />
                </Link>
              </div>
              <h3>{t(`${project}.title`).toUpperCase()}</h3>
              <p className="text-sm text-gray-300">
                {t(`${project}.description`)}
              </p>

              <div className="flex gap-3 flex-wrap items-center justify-center">
                {technologies.map((tech, index) => (
                  <span key={index} className="text-gray-400 text-[12px]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
