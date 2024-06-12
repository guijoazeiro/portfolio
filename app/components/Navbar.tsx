"use client";

import { links } from "../../constants/constants";
import { BsTextParagraph } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import BrazilFlag from "../assets/brazil-flag.png";
import UsFlag from "../assets/us-flag.png";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const keys = ["home", "about", "skills", "experience", "projects"] as const;

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-14 px-10 flex items-center justify-between backdrop-blur-2xl">
        <div className="flex space-x-10">
          <div className="text-3xl">&lt;/&gt;</div>
          <div className="left-8 flex space-x-5 mt-1">
            <Image src={BrazilFlag} className="w-7 h-7 cursor-pointer" alt="Brazil Flag" />
            <Image src={UsFlag} className="w-7 h-7 cursor-pointer" alt="US Flag" />
          </div>
        </div>
        <div className="md:flex items-center justify-center gap-10 hidden">
          {keys.map((link) => (
            <Link
              href={t(`${link}.href`)}
              // key={t(`${link}.id`)}
              className="hover:underline underline-offset-2 transition-all hover:text-[#93DEFF]"
            >
              {t(`${link}.text`)}
            </Link>
          ))}
        </div>
        <div className="block md:hidden cursor-pointer" onClick={handleClick}>
          {isOpen ? <IoClose size={25} /> : <BsTextParagraph size={25} />}
        </div>
      </div>
      {isOpen && (
        <div className="flex fixed top-14 left-0 flex-col justify-around items-center backdrop-blur-2xl w-full h-[calc(100vh-56px)]">
          {keys.map((link) => (
            <Link
              href={t(`${link}.href`)}
              // key={t(`${link}.id`)}
              className="hover:underline underline-offset-2 transition-all hover:text-[] text-2xl"
            >
              {t(`${link}.text`)}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
