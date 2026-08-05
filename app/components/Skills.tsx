import { useTranslations } from "next-intl";
import { stackGroups } from "../../constants/constants";

const Skills = () => {
  const t = useTranslations("Skills");
  return (
    <section className="mb-24" id="skills">
      <h2 className="section-title">{t("h1")}</h2>
      <div className="space-y-4 mt-6">
        {stackGroups.map((group) => (
          <div
            key={group.label}
            className="flex flex-col sm:flex-row sm:gap-6"
          >
            <div className="text-xs uppercase tracking-wider text-[var(--muted)] w-24 flex-shrink-0 mb-1 sm:mb-0 sm:pt-0.5">
              {group.label}
            </div>
            <div className="text-sm text-[var(--muted-strong)]">
              {group.items.join(" • ")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
