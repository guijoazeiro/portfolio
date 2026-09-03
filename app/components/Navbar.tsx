"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/navigation";
import { useEffect, useRef, useState } from "react";

type Locale = "pt" | "en";
type SectionKey =
  | "home"
  | "stack"
  | "experience"
  | "projects"
  | "articles"
  | "contact";

const sectionKeys: SectionKey[] = [
  "home",
  "stack",
  "experience",
  "projects",
  "articles",
  "contact",
];

const sectionIds: Record<SectionKey, string> = {
  home: "home",
  stack: "stack",
  experience: "experience",
  projects: "projects",
  articles: "articles",
  contact: "contact",
};

export default function Navbar() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Navbar");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousScrollYRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  const isMenuOpenRef = useRef(false);
  const revealLockUntilRef = useRef(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("home");

  useEffect(() => {
    const directionThreshold = 14;
    const alwaysVisibleUntil = 96;
    const initialScrollY = window.scrollY;

    previousScrollYRef.current = initialScrollY;
    setIsScrolled(initialScrollY > 16);

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return;

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;

        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - previousScrollYRef.current;
        previousScrollYRef.current = currentScrollY;
        setIsScrolled(currentScrollY > 16);

        if (
          isMenuOpenRef.current ||
          currentScrollY <= alwaysVisibleUntil ||
          Date.now() < revealLockUntilRef.current
        ) {
          setIsNavbarHidden(false);
          return;
        }

        if (Math.abs(scrollDelta) < directionThreshold) return;

        setIsNavbarHidden(scrollDelta > 0);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const sections = new Map<Element, SectionKey>();
    const home = document.querySelector("main > header");

    if (home) sections.set(home, "home");

    sectionKeys.slice(1).forEach((key) => {
      const section = document.getElementById(sectionIds[key]);
      if (section) sections.set(section, key);
    });

    const visibleSections = new Map<Element, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target, entry);
          } else {
            visibleSections.delete(entry.target);
          }
        });

        const focusLine = window.innerHeight * 0.2;
        const current = Array.from(visibleSections.entries()).sort(
          ([, first], [, second]) =>
            Math.abs(first.boundingClientRect.top - focusLine) -
            Math.abs(second.boundingClientRect.top - focusLine),
        )[0];

        if (current) {
          setActiveSection(sections.get(current[0]) ?? "home");
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: [0, 0.1] },
    );

    sections.forEach((_, section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
    if (isMenuOpen) setIsNavbarHidden(false);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  function closeMenu() {
    isMenuOpenRef.current = false;
    setIsMenuOpen(false);
  }

  function revealNavbarForInteraction() {
    revealLockUntilRef.current = Date.now() + 800;
    setIsNavbarHidden(false);
  }

  function handleMenuToggle() {
    const nextIsMenuOpen = !isMenuOpen;
    isMenuOpenRef.current = nextIsMenuOpen;
    setIsNavbarHidden(false);
    setIsMenuOpen(nextIsMenuOpen);
  }

  function handleNavbarFocus() {
    revealNavbarForInteraction();
  }

  function handleNavItemClick() {
    closeMenu();
    revealNavbarForInteraction();
  }

  function changeLocale(nextLocale: Locale) {
    closeMenu();
    revealNavbarForInteraction();
    if (nextLocale === locale) return;
    router.push(pathname, { locale: nextLocale });
  }

  const navItems: Array<{
    key: SectionKey;
    href: string;
    label: string;
    external?: boolean;
  }> = [
    {
      key: "home",
      href: t("home.href"),
      label: t("home.text"),
    },
    {
      key: "stack",
      href: t("skills.href"),
      label: t("skills.text"),
    },
    {
      key: "experience",
      href: t("experience.href"),
      label: t("experience.text"),
    },
    {
      key: "projects",
      href: t("projects.href"),
      label: t("projects.text"),
    },
    {
      key: "articles",
      href: t("articles.href"),
      label: t("articles.text"),
    },
    {
      key: "contact",
      href: t("contact.href"),
      label: t("contact.text"),
    },
  ];

  return (
    <nav
      className={[
        "site-navbar",
        isScrolled && "site-navbar--scrolled",
        isNavbarHidden && "site-navbar--hidden",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={t("ariaLabel")}
      onFocusCapture={handleNavbarFocus}
    >
      <div className="site-navbar__inner">
        <button
          ref={menuButtonRef}
          type="button"
          className="site-navbar__menu-button"
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={isMenuOpen}
          aria-controls="site-navbar-links"
          onClick={handleMenuToggle}
        >
          <span className="site-navbar__menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <div
          id="site-navbar-links"
          className={`site-navbar__content ${isMenuOpen ? "site-navbar__content--open" : ""}`}
        >
          <div className="site-navbar__links">
            {navItems.map(({ key, href, label, external }) => {
              const isActive = !external && activeSection === key;
              const commonProps = {
                className: `site-navbar__link ${
                  isActive ? "site-navbar__link--active" : ""
                }`,
                "aria-current": isActive
                  ? key === "home"
                    ? ("page" as const)
                    : ("location" as const)
                  : undefined,
                onClick: handleNavItemClick,
              };

              if (external) {
                return (
                  <a
                    key={label}
                    href={href}
                    {...commonProps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                );
              }

              return (
                <Link
                  key={label}
                  href={href}
                  {...commonProps}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="site-navbar__locale" aria-label={t("languageLabel")}>
            {(["pt", "en"] as Locale[]).map((language, index) => (
              <span key={language} className="site-navbar__locale-option">
                {index > 0 && (
                  <span className="site-navbar__locale-divider" aria-hidden="true">
                    /
                  </span>
                )}
                <button
                  type="button"
                  aria-label={t(`language.${language}`)}
                  aria-pressed={locale === language}
                  className={`site-navbar__locale-button ${
                    locale === language
                      ? "site-navbar__locale-button--active"
                      : ""
                  }`}
                  onClick={() => changeLocale(language)}
                >
                  {language.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
