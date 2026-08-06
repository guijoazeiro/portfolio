import { useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";

const Articles = () => {
  const t = useTranslations("Articles");
  const keys = ["First", "Second", "Third"] as const;

  return (
    <section className="mb-16 md:mb-24 reveal" id="articles">
      <h2 className="section-title">{t("h1")}</h2>
      <p className="section-sub">{t("sub")}</p>
      <div className="space-y-10">
        {keys.map((article) => (
          <article key={t(`${article}.id`)}>
            <a
              className="link text-base font-semibold tracking-tight"
              href={t(`${article}.linkedinLink`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("ArticleLinkAriaLabel")}
            >
              <FiArrowUpRight aria-hidden className="mr-1.5" />
              {t(`${article}.title`)}
            </a>
            <p className="text-xs text-[var(--muted)] mt-2 tracking-wider">
              {t(`${article}.date`)} • {t(`${article}.readingTime`)}
            </p>
            <p className="text-sm text-[var(--muted-strong)] mt-3 leading-relaxed prose">
              {t(`${article}.description`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Articles;
