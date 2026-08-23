import { useTranslations } from "next-intl";
import { stackGroups } from "../../constants/constants";

const Skills = () => {
  const t = useTranslations("Skills");
  return (
    <section className="mb-16 md:mb-24 reveal" id="skills">
      <h2 className="section-title">{t("h1")}</h2>
      <div className="flex flex-col gap-y-5 mt-6">
        {stackGroups.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-6 gap-y-1"
          >
            <div className="stack-label pt-[3px]">{group.label}</div>
            <div className="stack-items flex flex-wrap gap-x-3 gap-y-1">
              {group.items.map((item, i) => (
                <span key={item} className="whitespace-nowrap">
                  {i > 0 && <span className="sep">·</span>}
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
