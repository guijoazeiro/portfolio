import { unstable_setRequestLocale } from "next-intl/server";
import About from "../components/About";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Articles from "../components/Articles";

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
      <About />
      <Experience />
      <Projects />
      <Articles />
      <Contact />
    </main>
  );
}
