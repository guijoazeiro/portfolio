import { useTranslations } from "next-intl";
import About from "../components/About";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Articles from "../components/Articles";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Articles />
      <Contact />
    </main>
  );
}
