import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { stackGroups } from "../../constants/constants";

const Skills = () => {
  const t = useTranslations("Skills");
  return (
    <section className="mb-24 reveal" id="skills">
      <h2 className="section-title">{t("h1")}</h2>
      <div className="flex flex-col gap-y-5 mt-6">
        {stackGroups.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-6 gap-y-1"
          >
            <div className="stack-label pt-[3px]">{group.label}</div>
            <div className="stack-items">
              {group.items.map((item, i) => (
                <Fragment key={item}>
                  {i > 0 && <span className="sep">·</span>}
                  {item}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
