import { useTranslations } from "next-intl";
import VisitCounter from "./VisitCounter";

const GITHUB_URL = "https://github.com/guijoazeiro";
const LINKEDIN_URL = "https://www.linkedin.com/in/guilherme-joazeiro";
const EMAIL_URL = "mailto:guilhermejoazeiro@gmail.com";

const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer mt-24">
      <div className="site-footer__container">
        <div className="site-footer__inner">
          <div className="site-footer__left">
            <nav className="site-footer__nav" aria-label={t("linksLabel")}>
              <a
                className="site-footer__link"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("github")}
              </a>
              <span className="site-footer__separator" aria-hidden="true">
                ·
              </span>
              <a
                className="site-footer__link"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("linkedin")}
              </a>
              <span className="site-footer__separator" aria-hidden="true">
                ·
              </span>
              <a className="site-footer__link" href={EMAIL_URL}>
                {t("email")}
              </a>
            </nav>

            <VisitCounter />
          </div>

          <p className="site-footer__copyright">
            © {currentYear} Guilherme Joazeiro
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
