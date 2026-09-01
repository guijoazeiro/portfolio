import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import {
  absoluteUrl,
  getStructuredData,
  isSiteLocale,
  seoByLocale,
  siteUrl,
} from "@/lib/seo";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

export function generateStaticParams() {
  return Object.keys(seoByLocale).map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: LayoutProps): Promise<Metadata> {
  if (!isSiteLocale(locale)) notFound();

  const seo = seoByLocale[locale];
  const alternateLocale = locale === "pt" ? "en_US" : "pt_BR";

  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    authors: [{ name: "Guilherme Joazeiro", url: absoluteUrl(`/${locale}`) }],
    creator: "Guilherme Joazeiro",
    publisher: "Guilherme Joazeiro",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "pt-BR": "/pt",
        en: "/en",
        "x-default": "/pt",
      },
    },
    openGraph: {
      type: "profile",
      url: `/${locale}`,
      title: seo.title,
      description: seo.description,
      siteName: "Guilherme Joazeiro — Portfolio",
      locale: seo.locale,
      alternateLocale,
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "Guilherme Joazeiro — Backend Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [`/${locale}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    category: "technology",
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: LayoutProps) {
  if (!isSiteLocale(locale)) notFound();

  unstable_setRequestLocale(locale);

  const messages = await getMessages();
  const structuredData = getStructuredData(locale);

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={jetbrainsMono.className}>
        <NextIntlClientProvider messages={messages}>
          <AnimatedBackground />
          <Navbar />
          <div className="relative z-10 min-h-screen text-gray-300 fade-in">
            <div className="max-w-[760px] mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-8 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16">
              {children}
              <Footer />
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
