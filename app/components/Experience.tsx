"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const experienceKeys = ["First", "Second", "Third"] as const;
type ExperienceKey = (typeof experienceKeys)[number];

const experienceLogos: Record<
  ExperienceKey,
  { src: string; width: number; height: number }
> = {
  First: {
    src: "/experience/greens-corp-wordmark-transparent.webp",
    width: 938,
    height: 244,
  },
  Second: {
    src: "/experience/ttms-technologies-wordmark.webp",
    width: 160,
    height: 45,
  },
  Third: {
    src: "/experience/adin-marketing-digital-wordmark.webp",
    width: 120,
    height: 18,
  },
};

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
          const logo = experienceLogos[experience];

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
                <span className="experience-row__logo-wrap" aria-hidden="true">
                  <Image
                    className="experience-row__logo"
                    src={logo.src}
                    alt=""
                    aria-hidden="true"
                    width={logo.width}
                    height={logo.height}
                  />
                </span>
                <span className="experience-row__main">
                  <span className="experience-row__company">
                    <span>{t(`${experience}.company`)}</span>
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
