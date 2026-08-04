import { useTranslations } from "next-intl";

const Articles = () => {
  const t = useTranslations("Articles");
  const keys = ["First", "Second", "Third"] as const;

  return (
    <section className="mb-10" id="articles">
      <h2 className="section-title">{t("h1")}</h2>
      <p className="section-sub">Hope you up-voted these on hackernews.</p>
      <ul className="space-y-3 text-sm">
        {keys.map((article) => (
          <li key={t(`${article}.id`)}>
            <a
              className="link block"
              href={t(`${article}.linkedinLink`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("ArticleLinkAriaLabel")}
            >
              {t(`${article}.title`)}
            </a>
            <p className="text-gray-400 text-xs mt-1">
              {t(`${article}.description`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Articles;
