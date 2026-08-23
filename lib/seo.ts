const fallbackSiteUrl = "https://portfolio-phi-swart-29.vercel.app";

const configuredSiteUrl = process.env.SITE_URL ?? fallbackSiteUrl;

export const siteUrl = configuredSiteUrl.replace(/\/$/, "");

export const seoByLocale = {
  pt: {
    title: "Guilherme Joazeiro | Desenvolvedor Backend",
    description:
      "Portfólio de Guilherme Joazeiro, desenvolvedor backend em São Paulo com experiência em APIs REST, microsserviços, Node.js, TypeScript, Go, Python e AWS.",
    locale: "pt_BR",
    language: "pt-BR",
  },
  en: {
    title: "Guilherme Joazeiro | Backend Engineer",
    description:
      "Guilherme Joazeiro's portfolio — a Backend Engineer based in São Paulo experienced in REST APIs, microservices, Node.js, TypeScript, Go, Python and AWS.",
    locale: "en_US",
    language: "en",
  },
} as const;

export type SiteLocale = keyof typeof seoByLocale;

export const isSiteLocale = (locale: string): locale is SiteLocale =>
  locale in seoByLocale;

export const absoluteUrl = (path = "") =>
  new URL(path, `${siteUrl}/`).toString();

export function getStructuredData(locale: SiteLocale) {
  const seo = seoByLocale[locale];
  const localizedUrl = absoluteUrl(`/${locale}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl()}#website`,
        url: absoluteUrl(),
        name: "Guilherme Joazeiro — Portfolio",
        description: seo.description,
        inLanguage: ["pt-BR", "en"],
      },
      {
        "@type": "ProfilePage",
        "@id": `${localizedUrl}#profile-page`,
        url: localizedUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: seo.language,
        isPartOf: { "@id": `${absoluteUrl()}#website` },
        mainEntity: { "@id": `${absoluteUrl()}#person` },
      },
      {
        "@type": "Person",
        "@id": `${absoluteUrl()}#person`,
        name: "Guilherme Joazeiro",
        url: localizedUrl,
        jobTitle: "Backend Engineer",
        description: seo.description,
        homeLocation: {
          "@type": "Place",
          name: "São Paulo, Brazil",
        },
        sameAs: [
          "https://github.com/guijoazeiro",
          "https://www.linkedin.com/in/guilherme-joazeiro",
        ],
        knowsAbout: [
          "Backend development",
          "REST APIs",
          "Microservices",
          "Node.js",
          "TypeScript",
          "Go",
          "Python",
          "Java",
          "Amazon Web Services",
        ],
      },
    ],
  };
}
