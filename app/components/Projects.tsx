import { projects } from "../../constants/constants";
import { FiGithub } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";

const Projects = () => {
  return (
    <div className="container mx-auto px-5 pb-10 md:px-0" id="projects">
      <h1 className="underline underline-offset-4 mb-5 text-2xl">Projetos</h1>

      <div className="flex items-center justify-between flex-wrap">
        {projects.map((project) => (
          <div
            className="bg-zinc-800 bg-opacity-20 hover:border-gray-600 transition-all duration-500 border-gray-800 border rounded-md p-5 w-full md:w-[49%] flex flex-col justify-between items-center mb-5 gap-10"
            key={project.id}
          >
            <div className="w-full flex items-center justify-end gap-5">
              <Link href={project.githubLink} target="_blank">
                <FiGithub size={20} />
              </Link>
            </div>
            <h3>{project.title.toUpperCase()}</h3>
            <div className="flex gap-3 flex-wrap items-center justify-center">
              {project.technologies.map((tech) => (
                <span className="text-gray-400 text-sm">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
