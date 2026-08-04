import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Guilherme Joazeiro - Portfolio",
  description: "Backend developer portfolio",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={jetbrainsMono.className}>
        <NextIntlClientProvider messages={messages}>
          <AnimatedBackground />
          <div className="relative z-10 min-h-screen text-gray-300">
            <div className="max-w-3xl mx-auto px-5 md:px-8 py-10">
              <Navbar />
              {children}
              <Footer />
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
