import { useTranslations } from "next-intl";
import React from "react";

const About = () => {
  const t = useTranslations("About");
  return (
    <div className="container mx-auto mb-5 p-5 md:p-0" id="about">
      <h1 className="underline underline-offset-4 mb-5 text-2xl">{t("h1")}</h1>
      <p className="text-gray-400">{t("p1")}</p>
      <p className="text-gray-400">{t("p2")}</p>
      <p className="text-gray-400">{t("p3")}</p>
      <p className="text-gray-400">{t("p4")}</p>
    </div>
  );
};

export default About;
