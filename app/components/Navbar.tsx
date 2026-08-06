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

  const btn = (l: "pt" | "en") =>
    `transition-colors hover:text-[var(--link-hover)] ${
      locale === l
        ? "text-[var(--link)]"
        : "text-[var(--muted-strong)]"
    }`;

  return (
    <div className="mb-8 flex justify-end">
      <div className="flex items-center gap-2 text-sm font-medium">
        <button
          type="button"
          aria-label="Português"
          aria-pressed={locale === "pt"}
          onClick={() => changeLocale("pt")}
          className={btn("pt")}
        >
          PT
        </button>
        <span className="text-[var(--muted)]">/</span>
        <button
          type="button"
          aria-label="English"
          aria-pressed={locale === "en"}
          onClick={() => changeLocale("en")}
          className={btn("en")}
        >
          EN
        </button>
      </div>
    </div>
  );
}
