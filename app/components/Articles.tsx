import { useTranslations } from "next-intl";

const Articles = () => {
  const t = useTranslations("Articles");
  const keys = ["First", "Second", "Third"] as const;

  return (
    <section className="mb-16" id="articles">
      <h2 className="section-title">{t("h1")}</h2>
      <p className="section-sub">{t("sub")}</p>
      <div className="space-y-8">
        {keys.map((article) => (
          <article key={t(`${article}.id`)}>
            <a
              className="link text-sm font-semibold"
              href={t(`${article}.linkedinLink`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("ArticleLinkAriaLabel")}
            >
              {t(`${article}.title`)}
            </a>
            <p className="text-xs text-[var(--muted)] mt-1 tracking-wider">
              {t(`${article}.date`)} • {t(`${article}.readingTime`)}
            </p>
            <p className="text-sm text-[var(--muted-strong)] mt-2 leading-relaxed prose">
              {t(`${article}.description`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Articles;
