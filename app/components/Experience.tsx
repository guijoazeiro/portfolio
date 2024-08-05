import { useTranslations } from "next-intl";
import { workExperience } from "../../constants/constants";

const Experience = () => {
  const t = useTranslations("Experience");
  const tr = useTranslations("Experience.First");
  const keys = ["First", "Second"] as const;
  return (
    <div className="container mx-auto p-5 md:p-0" id="experience">
      <h1 className="underline underline-offset-4 mb-5 text-2xl">{t("h1")}</h1>
      <div>
        {keys.map((experience) => (
          <div
            className="flex flex-wrap gap-2 mb-3 flex-col md:flex-row"
            key={t(`${experience}.id`)}
          >
            <div className="w-[170px] text-gray-400">
              {t(`${experience}.startDate`)} - {t(`${experience}.endDate`)}
            </div>
            <div className="flex-1">
              <h3 className="mb-3">
                {t(`${experience}.company`)} - {t(`${experience}.role`)}
              </h3>
            </div>
            <div className="flex-3">
              <p className="mb-3 text-gray-400">{t(`${experience}.description`)}</p>
              <div className="flex items-center gap-2 flex-wrap mb-5">
                {/* {experience.technologies.map((skill) => (
                  <div
                    key={skill}
                    className="border rounded-sm text-white bg-[#93DEFF] bg-opacity-10 text-sm p-1 w-fit hover:bg-opacity-35"
                  >
                    {skill}
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
