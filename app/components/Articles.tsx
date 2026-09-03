import { useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";

const Articles = () => {
  const t = useTranslations("Articles");
  const keys = ["Third", "Second", "First"] as const;

  return (
    <section className="mb-16 md:mb-24 reveal" id="articles">
      <div className="experience-heading">
        <span className="experience-heading__bar" aria-hidden="true" />
        <h2 className="section-title">{t("h1")}</h2>
      </div>

      <ul className="articles-list">
        {keys.map((article) => {
          const title = t(`${article}.title`).trim();

          return (
            <li className="articles-list__item" key={t(`${article}.id`)}>
              <article>
                <a
                  className="articles-list__link"
                  href={t(`${article}.linkedinLink`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("ArticleLinkAriaLabel", { article: title })}
                >
                  <span className="articles-list__content">
                    <span className="articles-list__title-row">
                      <span className="articles-list__title">{title}</span>
                      <span className="articles-list__origin">
                        LINKEDIN.COM
                      </span>
                    </span>
                    <span className="articles-list__meta">
                      {t(`${article}.date`)}
                      <span aria-hidden="true"> • </span>
                      {t(`${article}.readingTime`)}
                    </span>
                    <span className="articles-list__description">
                      {t(`${article}.description`)}
                    </span>
                  </span>
                  <FiArrowUpRight
                    className="articles-list__arrow"
                    aria-hidden="true"
                    focusable="false"
                  />
                </a>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Articles;
