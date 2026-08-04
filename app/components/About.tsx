import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("About");
  return (
    <section className="mb-10" id="about">
      <h2 className="section-title">{t("h1")}</h2>
      <div className="space-y-3 text-sm leading-relaxed">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p className="text-gray-400">{t("p3")}</p>
        <p>{t("p4")}</p>
      </div>
    </section>
  );
};

export default About;
