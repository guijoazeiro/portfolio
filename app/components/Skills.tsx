import { useTranslations } from "next-intl";
import { skills } from "../../constants/constants";

const Skills = () => {
  const t = useTranslations("Skills");
  return (
    <section className="mb-10" id="skills">
      <h2 className="section-title">{t("h1")}</h2>
      <p className="text-sm text-gray-400">
        {skills.map((s) => s.trim()).join(" · ")}
      </p>
    </section>
  );
};

export default Skills;
