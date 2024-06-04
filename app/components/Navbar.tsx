"use client";

import { links } from "../../constants/constants";
import { BsTextParagraph } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-14 px-10 flex items-center justify-between backdrop-blur-2xl">
        <div className="text-3xl">&lt;/&gt;</div>
        <div className="md:flex items-center justify-center gap-10 hidden">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.id}
              className="hover:underline underline-offset-2 transition-all hover:text-[#1d9bf0]"
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className="block md:hidden cursor-pointer" onClick={handleClick}>
          {isOpen ? <IoClose size={25} /> : <BsTextParagraph size={25} />}
        </div>
      </div>
      {isOpen && (
        <div className="flex fixed top-14 left-0 flex-col justify-around items-center backdrop-blur-2xl w-full h-[calc(100vh-56px)]">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.id}
              className="hover:underline underline-offset-2 transition-all hover:text-[] text-2xl"
            >
              {link.text}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;