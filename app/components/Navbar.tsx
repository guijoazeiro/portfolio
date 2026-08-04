"use client";

import Image from "next/image";
import BrazilFlag from "../assets/brazil-flag.png";
import UsFlag from "../assets/us-flag.png";
import { usePathname, useRouter } from "@/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center justify-end gap-3 mb-6">
      <Image
        src={BrazilFlag}
        className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100"
        alt="Portugues"
        onClick={() => router.push(pathname, { locale: "pt" })}
      />
      <Image
        src={UsFlag}
        className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100"
        alt="English"
        onClick={() => router.push(pathname, { locale: "en" })}
      />
    </div>
  );
};

export default Navbar;
