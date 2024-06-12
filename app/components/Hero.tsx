import { useTranslations } from "next-intl";
import { Typewriter } from "nextjs-simple-typewriter";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full md:w-1/2 text-center p-5 md:p-0">
        <h1 className="mb-5 md:text-5xl text-3xl font-bold">
          {t('h1')}
          <span className="text-[#93DEFF]">
            <Typewriter
              words={[" Guilherme Joazeiro", t('words')]}
              cursor={true}
              loop={0}
            />
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
