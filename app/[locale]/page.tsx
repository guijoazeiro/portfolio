import { unstable_setRequestLocale } from "next-intl/server";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Articles from "../components/Articles";
import GithubContributions from "../components/GithubContributions";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <GithubContributions locale={locale} />
      <Articles />
      <Contact />
    </main>
  );
}
