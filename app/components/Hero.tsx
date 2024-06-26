import { useTranslations } from "next-intl";
import { Typewriter } from "nextjs-simple-typewriter";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full md:w-1/2 text-center p-5 md:p-0">
        <h1 className="mb-5 md:text-5xl text-3xl font-bold">
          {t("h1")}
          <span className="text-[#93DEFF]">
            <Typewriter
              words={[" Guilherme Joazeiro", t("words")]}
              cursor={true}
              loop={0}
            />
          </span>
        </h1>
        <div className="flex justify-center space-x-4 relative">
          <a
            href="/curriculoGuilhermeJoazeiro.pdf"
            download
            className="px-4 py-2 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white rounded-3xl mt-16 inline-flex items-center cursor-pointer transition-all duration-100 ease-in transform hover:scale-105"
          >
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
            Baixar CV
          </a>
          <a
            href="#contact"
            className="px-4 py-2 bg-zinc-800 border-gray-800 rounded-3xl text-white inline-block mt-16 cursor-pointer transition-all duration-100 ease-in transform hover:scale-105"
          >
            Contato
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
