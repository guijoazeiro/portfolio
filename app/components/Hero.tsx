"use client";

import { useLocale, useTranslations } from "next-intl";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { usePathname, useRouter } from "@/navigation";

type Locale = "pt" | "en";
type TerminalCommand =
  | "help"
  | "about"
  | "status"
  | "experience"
  | "projects"
  | "skills"
  | "github"
  | "contact"
  | "resume"
  | "clear";

type ParsedCommand =
  | { type: TerminalCommand; helpLanguage?: Locale }
  | { type: "lang"; locale: Locale }
  | { type: "invalid" };

type TerminalLine = {
  id: number;
  kind: "command" | "output" | "error" | "link" | "status";
  text: string;
  href?: string;
  download?: boolean;
};

const MAX_COMMAND_HISTORY = 24;
const MAX_TERMINAL_LINES = 80;

const commandAliases: Record<string, TerminalCommand> = {
  about: "about",
  sobre: "about",
  "./status.sh": "status",
  experience: "experience",
  experiencia: "experience",
  projects: "projects",
  projetos: "projects",
  skills: "skills",
  habilidades: "skills",
  github: "github",
  contact: "contact",
  contato: "contact",
  resume: "resume",
  curriculo: "resume",
  clear: "clear",
  limpar: "clear",
};

function normalizeCommand(value: string) {
  return value
    .trim()
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function parseCommand(value: string): ParsedCommand {
  const tokens = normalizeCommand(value).split(/\s+/).filter(Boolean);
  const [command, argument] = tokens;

  if ((command === "lang" || command === "idioma") && tokens.length === 2) {
    if (argument === "pt" || argument === "en") {
      return { type: "lang", locale: argument };
    }
    return { type: "invalid" };
  }

  if (tokens.length === 1 && (command === "help" || command === "ajuda")) {
    return { type: "help", helpLanguage: command === "ajuda" ? "pt" : "en" };
  }

  if (tokens.length === 1 && command in commandAliases) {
    return { type: commandAliases[command] };
  }

  return { type: "invalid" };
}

const Hero = () => {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const tHero = useTranslations("Hero");
  const tExperience = useTranslations("Experience");
  const tProjects = useTranslations("Projects");
  const tTerminal = useTranslations("Terminal");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextLineId = useRef(1);
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<TerminalLine[]>(() => createInitialLines());

  const githubUrl = "https://github.com/guijoazeiro";
  const linkedinUrl = "https://www.linkedin.com/in/guilherme-joazeiro";
  const resumeHref = `/${tHero("cvlink")}`;

  useEffect(() => {
    setLines(createInitialLines());
    setCommand("");
    setCommandHistory([]);
    setHistoryIndex(-1);
  }, [locale]);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;

    const frame = window.requestAnimationFrame(() => {
      log.scrollTo({
        top: log.scrollHeight,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [lines]);

  function createLine(
    kind: TerminalLine["kind"],
    text: string,
    options: Pick<TerminalLine, "href" | "download"> = {},
  ): TerminalLine {
    return { id: nextLineId.current++, kind, text, ...options };
  }

  function createInitialLines(): TerminalLine[] {
    return [
      createLine("command", tTerminal("initialAboutCommand")),
      createLine("output", tTerminal("aboutResponse")),
      createLine("command", tTerminal("statusCommand")),
      createLine("status", tTerminal("statusMessage")),
    ];
  }

  function scrollToSection(id: "experience" | "projects" | "skills" | "contact") {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  function openExternal(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function executeCommand(rawCommand: string) {
    const parsed = parseCommand(rawCommand);

    if (parsed.type === "clear") {
      setLines(createInitialLines());
      return;
    }

    let response: TerminalLine[];

    switch (parsed.type) {
      case "help":
        response = [
          createLine(
            "output",
            tTerminal(parsed.helpLanguage === "pt" ? "helpPortuguese" : "helpEnglish"),
          ),
        ];
        break;
      case "about":
        response = [createLine("output", tTerminal("aboutResponse"))];
        break;
      case "status":
        response = [createLine("status", tTerminal("statusMessage"))];
        break;
      case "experience":
        scrollToSection("experience");
        response = [
          createLine("output", tTerminal("experience")),
          createLine("output", tExperience("First.company")),
          createLine("output", tExperience("Second.company")),
          createLine("output", tExperience("Third.company")),
        ];
        break;
      case "projects":
        scrollToSection("projects");
        response = [
          createLine("output", tTerminal("projects")),
          createLine("output", tProjects("First.title")),
          createLine("output", tProjects("Second.title")),
          createLine("output", tProjects("Third.title")),
          createLine("output", tProjects("Fourth.title")),
        ];
        break;
      case "skills":
        scrollToSection("skills");
        response = [
          createLine("output", tTerminal("skills")),
          createLine("output", tHero("stack")),
        ];
        break;
      case "github":
        openExternal(githubUrl);
        response = [
          createLine("output", tTerminal("github")),
          createLine("link", tTerminal("githubLink"), { href: githubUrl }),
        ];
        break;
      case "contact":
        scrollToSection("contact");
        response = [createLine("output", tTerminal("contact"))];
        break;
      case "resume":
        openExternal(resumeHref);
        response = [
          createLine("output", tTerminal("resume")),
          createLine("link", tTerminal("resumeLink"), {
            href: resumeHref,
            download: true,
          }),
        ];
        break;
      case "lang":
        if (parsed.locale === locale) {
          response = [
            createLine(
              "output",
              tTerminal("languageAlready", {
                language: tTerminal(`language.${parsed.locale}`),
              }),
            ),
          ];
        } else {
          router.push(pathname, { locale: parsed.locale });
          response = [
            createLine(
              "output",
              tTerminal("languageChanged", {
                language: tTerminal(`language.${parsed.locale}`),
              }),
            ),
          ];
        }
        break;
      case "invalid":
        response = [createLine("error", tTerminal("invalidCommand"))];
        break;
    }

    setLines((currentLines) => [
      ...currentLines,
      createLine("command", rawCommand),
      ...response,
    ].slice(-MAX_TERMINAL_LINES));
  }

  function submitCommand() {
    const rawCommand = command.trim();
    if (!rawCommand) return;

    setCommandHistory((currentHistory) =>
      [...currentHistory, rawCommand].slice(-MAX_COMMAND_HISTORY),
    );
    setHistoryIndex(-1);
    setCommand("");
    executeCommand(rawCommand);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitCommand();
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitCommand();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyIndex < 0
          ? commandHistory.length - 1
          : Math.max(historyIndex - 1, 0);
      setHistoryIndex(nextIndex);
      setCommand(commandHistory[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < 0) return;
      if (historyIndex >= commandHistory.length - 1) {
        setHistoryIndex(-1);
        setCommand("");
        return;
      }
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setCommand(commandHistory[nextIndex]);
    }
  }

  function focusTerminalInput(event: React.MouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement;
    if (target.closest("a, input, button")) return;
    inputRef.current?.focus();
  }

  return (
    <header className="hero mb-16 md:mb-24">
      <div className="hero-layout">
        <div className="hero-cards">
          <section className="hero-card hero-identity" aria-labelledby="hero-name">
            <h1 id="hero-name" className="hero-name">
              {tHero("name")}
            </h1>
            <p className="hero-role">{tHero("role")}</p>
          </section>

          <section className="hero-card hero-intro" aria-labelledby="hero-intro-title">
            <h2 id="hero-intro-title" className="sr-only">
              {tTerminal("introductionLabel")}
            </h2>
            <p className="hero-description">{tHero("description")}</p>
            <div className="hero-links">
              <a
                className="link inline-flex items-center gap-2"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tHero("githubLabel")}
              >
                <FaGithub aria-hidden /> {tHero("github")}
              </a>
              <a
                className="link inline-flex items-center gap-2"
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tHero("linkedinLabel")}
              >
                <FaLinkedin aria-hidden /> {tHero("linkedin")}
              </a>
              <a
                className="link inline-flex items-center gap-2"
                href={resumeHref}
                download
                aria-label={tHero("cvLabel")}
              >
                <FiFileText aria-hidden /> {tHero("cv")}
              </a>
              <a className="link" href="#contact">
                {tHero("contact")}
              </a>
            </div>
          </section>
        </div>

        <section
          className="hero-terminal"
          aria-labelledby="hero-terminal-title"
          onClick={focusTerminalInput}
        >
          <div className="hero-terminal__bar">
            <div className="hero-terminal__controls" aria-hidden="true">
              <span
                className="hero-terminal__dot hero-terminal__dot--red"
                aria-hidden="true"
              />
              <span
                className="hero-terminal__dot hero-terminal__dot--yellow"
                aria-hidden="true"
              />
              <span
                className="hero-terminal__dot hero-terminal__dot--green"
                aria-hidden="true"
              />
            </div>
            <h2 id="hero-terminal-title">{tTerminal("title")}</h2>
          </div>
          <div
            ref={logRef}
            className="hero-terminal__log"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label={tTerminal("logLabel")}
          >
            {lines.map((line) => (
              <div key={line.id} className={`terminal-line terminal-line--${line.kind}`}>
                {line.kind === "command" && (
                  <span className="terminal-prompt" aria-hidden="true">
                    {tTerminal("prompt")}
                  </span>
                )}
                {line.kind === "link" && line.href ? (
                  <a
                    className="terminal-link"
                    href={line.href}
                    target={line.download ? undefined : "_blank"}
                    rel={line.download ? undefined : "noopener noreferrer"}
                    download={line.download}
                  >
                    {line.text}
                  </a>
                ) : (
                  line.text
                )}
              </div>
            ))}
            <form className="hero-terminal__form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="hero-terminal-input">
                {tTerminal("inputLabel")}
              </label>
              <span className="terminal-prompt" aria-hidden="true">
                {tTerminal("prompt")}
              </span>
              <input
                ref={inputRef}
                id="hero-terminal-input"
                className="hero-terminal__input"
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                onKeyDown={handleInputKeyDown}
                autoComplete="off"
                spellCheck={false}
                aria-describedby="hero-terminal-title"
              />
            </form>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Hero;
