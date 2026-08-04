import { useTranslations } from "next-intl";
import { skills } from "../../constants/constants";

const Skills = () => {
  const t = useTranslations("Skills");
  return (
    <section className="mb-16" id="skills">
      <h2 className="section-title">{t("h1")}</h2>
      <p className="text-sm text-[var(--muted-strong)] leading-relaxed prose">
        {skills.join(" • ")}
      </p>
    </section>
  );
};

export default Skills;
