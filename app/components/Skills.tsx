import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  SiAmazonaws,
  SiDocker,
  SiExpress,
  SiFastify,
  SiGo,
  SiGithubactions,
  SiLinux,
  SiMongodb,
  SiMicrosoftsqlserver,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { stackTechnologies } from "../../constants/constants";

type StackTechnology = {
  name: (typeof stackTechnologies)[number];
  icon?: IconType;
  color: string;
};

const stackIcons: Record<StackTechnology["name"], Omit<StackTechnology, "name">> = {
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Python: { icon: SiPython, color: "#3776AB" },
  Go: { icon: SiGo, color: "#00ADD8" },
  Java: { icon: SiOpenjdk, color: "#ED8B00" },
  "Node.js": { icon: SiNodedotjs, color: "#83CD29" },
  Express: { icon: SiExpress, color: "#E4E4E7" },
  NestJS: { icon: SiNestjs, color: "#E0234E" },
  Fastify: { icon: SiFastify, color: "#E4E4E7" },
  "Spring Boot": { icon: SiSpringboot, color: "#6DB33F" },
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#F4F4F5" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Redis: { icon: SiRedis, color: "#DC382D" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  "SQL Server": { icon: SiMicrosoftsqlserver, color: "#CC2927" },
  AWS: { icon: SiAmazonaws, color: "#FF9900" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  "GitHub Actions": { icon: SiGithubactions, color: "#2088FF" },
  Linux: { icon: SiLinux, color: "#E4E4E7" },
  NGINX: { icon: SiNginx, color: "#009639" },
  OpenAI: { icon: SiOpenai, color: "#E4E4E7" },
  "n8n": { color: "#EA4B71" },
};

const stackItems: StackTechnology[] = stackTechnologies.map((name) => ({
  name,
  ...stackIcons[name],
}));

const Skills = () => {
  const t = useTranslations("Skills");

  function renderStackList(isDuplicate = false) {
    return (
      <ul
        className="stack-marquee__list"
        aria-hidden={isDuplicate ? "true" : undefined}
      >
        {stackItems.map(({ name, icon: Icon, color }) => (
          <li className="stack-marquee__item" key={name}>
            {Icon ? (
              <Icon
                className="stack-marquee__icon"
                style={{ color }}
                aria-hidden="true"
                focusable="false"
              />
            ) : (
              <span className="stack-marquee__text-icon">
                {name}
              </span>
            )}
            {Icon && <span className="stack-marquee__name">{name}</span>}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="stack-marquee-section mb-16 md:mb-24" id="stack">
      <h2 className="sr-only">{t("h1")}</h2>
      <div className="stack-marquee" aria-label={t("h1")}>
        <div className="stack-marquee__viewport">
          <div className="stack-marquee__track">
            {renderStackList()}
            {renderStackList(true)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
