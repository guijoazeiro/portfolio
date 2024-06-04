import { frontendSkills } from "../../constants/constants";

const Skills = () => {
  return (
    <div className="container mx-auto px-5 md:px-0 mb-10" id="skills">
      <h1 className="underline underline-offset-4 mb-5 text-2xl">Skills</h1>
      <div className="flex gap-2 flex-wrap">
        {frontendSkills.map((skill) => (
          <div
            key={skill}
            className="border rounded-sm bg-zinc-800 p-1 w-fit border-gray-800 text-sm"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;