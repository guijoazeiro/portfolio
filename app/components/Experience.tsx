import { useTranslations } from "next-intl";

const Experience = () => {
  const t = useTranslations("Experience");
  const keys = ["First", "Second", "Third"] as const;
  return (
    <section className="mb-16" id="experience">
      <h2 className="section-title">{t("h1")}</h2>
      <div className="space-y-10 mt-6">
        {keys.map((exp) => (
          <article key={t(`${exp}.id`)}>
            <p className="text-xs text-[var(--muted)] mb-1 uppercase tracking-wider">
              {t(`${exp}.startDate`)} — {t(`${exp}.endDate`)}
            </p>
            <h3 className="text-sm text-[var(--heading)] font-bold">
              {t(`${exp}.company`)}
            </h3>
            <p className="text-sm text-[var(--link)] mb-3">
              {t(`${exp}.role`)}
            </p>
            <p className="text-sm text-[var(--muted-strong)] leading-relaxed prose">
              {t(`${exp}.description`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
