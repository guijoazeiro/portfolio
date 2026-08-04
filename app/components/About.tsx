import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("About");
  return (
    <section className="mb-16" id="about">
      <h2 className="section-title">{t("h1")}</h2>
      <div className="prose text-sm text-[var(--fg)]">
        <p>{t("p1")}</p>
      </div>
    </section>
  );
};

export default About;
