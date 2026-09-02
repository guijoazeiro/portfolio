"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const experienceKeys = ["First", "Second", "Third"] as const;
type ExperienceKey = (typeof experienceKeys)[number];

const Experience = () => {
  const t = useTranslations("Experience");
  const [openExperience, setOpenExperience] = useState<ExperienceKey | null>(
    null,
  );

  function toggleExperience(experience: ExperienceKey) {
    setOpenExperience((current) =>
      current === experience ? null : experience,
    );
  }

  return (
    <section className="mb-16 md:mb-24 reveal" id="experience">
      <div className="experience-heading">
        <span className="experience-heading__bar" aria-hidden="true" />
        <h2 className="section-title">{t("h1")}</h2>
      </div>

      <ul className="experience-list">
        {experienceKeys.map((experience) => {
          const isOpen = openExperience === experience;
          const experienceId = experience.toLowerCase();
          const triggerId = `experience-trigger-${experienceId}`;
          const panelId = `experience-panel-${experienceId}`;
          const bullets = t.raw(`${experience}.bullets`) as string[];

          return (
            <li
              className={`experience-list__item ${
                isOpen ? "experience-list__item--open" : ""
              }`}
              key={experience}
            >
              <button
                id={triggerId}
                type="button"
                className={`experience-row ${
                  isOpen ? "experience-row--open" : ""
                }`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleExperience(experience)}
              >
                <span className="experience-row__main">
                  <span className="experience-row__company">
                    {t(`${experience}.company`)}
                  </span>
                  <span className="experience-row__role">
                    {t(`${experience}.role`)}
                  </span>
                </span>
                <span className="experience-row__period">
                  {t(`${experience}.startDate`)}
                  <span aria-hidden="true"> — </span>
                  {t(`${experience}.endDate`)}
                </span>
                <FiChevronDown
                  className="experience-row__chevron"
                  aria-hidden="true"
                  focusable="false"
                />
              </button>

              <div
                id={panelId}
                className={`experience-panel ${
                  isOpen ? "experience-panel--open" : ""
                }`}
                role="region"
                aria-hidden={!isOpen}
                aria-labelledby={triggerId}
              >
                <div className="experience-panel__inner">
                  <ul className="experience-panel__list">
                    {bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Experience;
