"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function VisitCounter() {
  const t = useTranslations("Footer");
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadVisitTotal() {
      try {
        const response = await fetch("/api/visits", { cache: "no-store" });
        if (!response.ok) return;

        const payload: { total?: unknown } = await response.json();
        if (
          !cancelled &&
          typeof payload.total === "number" &&
          Number.isFinite(payload.total) &&
          payload.total > 0
        ) {
          setTotal(payload.total);
        }
      } catch {
        // The footer stays available when the counter service is unavailable.
      }
    }

    void loadVisitTotal();
    return () => {
      cancelled = true;
    };
  }, []);

  if (total === null) return null;

  return (
    <span className="site-footer__visits-group">
      <span className="site-footer__visits-separator" aria-hidden="true">
        ·
      </span>
      <span className="site-footer__visits" aria-live="polite">
        {t("visits", { total })}
      </span>
    </span>
  );
}
