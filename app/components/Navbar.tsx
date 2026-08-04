"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(nextLocale: "pt" | "en") {
    if (nextLocale === locale) return;
    router.push(pathname, { locale: nextLocale });
  }

  return (
    <div className="mb-6 flex justify-end">
      <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
        <button
          onClick={() => changeLocale("pt")}
          className={`transition-colors hover:text-[#6d8cff] ${
            locale === "pt" ? "text-[#6d8cff]" : ""
          }`}
        >
          PT
        </button>

        <span className="text-zinc-700">/</span>

        <button
          onClick={() => changeLocale("en")}
          className={`transition-colors hover:text-[#6d8cff] ${
            locale === "en" ? "text-[#6d8cff]" : ""
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}