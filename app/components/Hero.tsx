import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <header className="mb-10">
      <h1 className="text-3xl md:text-4xl text-[var(--link)] font-bold mb-3">
        guilherme joazeiro
      </h1>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm mb-1">
        <a
          className="link inline-flex items-center gap-2"
          href="https://github.com/guijoazeiro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub /> GitHub
        </a>
        <a
          className="link inline-flex items-center gap-2"
          href="https://www.linkedin.com/in/guilherme-joazeiro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin /> LinkedIn
        </a>
        <a
          className="link inline-flex items-center gap-2"
          href={`/${t("cvlink")}`}
          download
        >
          <FiFileText /> CV
        </a>
      </div>
      <div className="text-sm mt-1">
        <a className="link" href="#contact">
          {t("contact")}
        </a>
      </div>
    </header>
  );
};

export default Hero;
