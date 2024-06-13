import { useTranslations } from "next-intl";
import React from "react";

const Contact = () => {
  const t = useTranslations("Contact");
  return (
    <div className="container mx-auto mb-5 p-5 md:p-0" id="contact">
      <h1 className="underline underline-offset-4 mb-5 text-2xl">{t("h1")}</h1>
      <div className="flex items-center justify-between flex-wrap">
        <div className=" p-5 w-full md:w-[49%] flex flex-col justify-between items-center mb-5 gap-10">
          <h4>{t("h2")}</h4>
          <p className="text-[16px] text-gray-300">{t("h3")}</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
