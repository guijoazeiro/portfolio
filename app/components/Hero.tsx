import { Typewriter } from "nextjs-simple-typewriter";

const Hero = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full md:w-1/2 text-center p-5 md:p-0">
        <h1 className="mb-5 md:text-5xl text-3xl font-bold">
          Olá, sou{" "}
          <span className="text-[#93DEFF]">
            <Typewriter
              words={[" Guilherme Joazeiro", " Desenvolvedor Backend"]}
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
