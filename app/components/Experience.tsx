import { useTranslations } from "next-intl";

const Experience = () => {
  const t = useTranslations("Experience");
  const keys = ["First", "Second", "Third"] as const;

  return (
    <section className="mb-24 reveal" id="experience">
      <h2 className="section-title">{t("h1")}</h2>
      <div className="space-y-12 mt-8">
        {keys.map((exp) => {
          const bullets = t.raw(`${exp}.bullets`) as string[];
          return (
            <article key={t(`${exp}.id`)} className="experience-item">
              <p className="text-xs text-[var(--muted)] mb-2 tracking-wider">
                {t(`${exp}.startDate`)} — {t(`${exp}.endDate`)}
              </p>
              <h3 className="text-base font-bold tracking-tight text-[var(--heading)]">
                <span className="company">{t(`${exp}.company`)}</span>
              </h3>
              <p className="text-sm text-[var(--link)] mb-4">
                {t(`${exp}.role`)}
              </p>
              <ul className="bullets">
                {bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
