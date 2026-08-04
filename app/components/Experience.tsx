import { useTranslations } from "next-intl";

const Experience = () => {
  const t = useTranslations("Experience");
  const keys = ["First", "Second", "Third"] as const;
  return (
    <section className="mb-10" id="experience">
      <h2 className="section-title">{t("h1")}</h2>
      <div className="space-y-5">
        {keys.map((exp) => (
          <div key={t(`${exp}.id`)} className="text-sm">
            <div className="flex flex-wrap gap-x-3 items-baseline">
              <span className="text-gray-400 text-xs">
                {t(`${exp}.startDate`)} - {t(`${exp}.endDate`)}
              </span>
              <span className="text-[var(--link)] font-bold">
                {t(`${exp}.company`)}
              </span>
              <span className="text-gray-500">·</span>
              <span>{t(`${exp}.role`)}</span>
            </div>
            <p className="text-gray-400 mt-2 leading-relaxed">
              {t(`${exp}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
