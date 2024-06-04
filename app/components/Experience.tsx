import { workExperience } from "../../constants/constants";

const Experience = () => {
  return (
    <div className="container mx-auto p-5 md:p-0" id="experience">
      <h1 className="underline underline-offset-4 mb-5 text-2xl">Experience</h1>
      <div>
        {workExperience.map((experience) => (
          <div
            className="flex  flex-wrap gap-2 mb-3 flex-col md:flex-row"
            key={experience.id}
          >
            <div className="w-[170px] text-gray-400">
              {experience.startDate} - {experience.endDate}
            </div>
            <div className="flex-1">
              <h3 className="mb-3">
                {experience.company}  {experience.position}
              </h3>
            </div>
            <div>
              <p className="mb-3 text-gray-400">{experience.description}</p>
              <div className="flex items-center gap-2 flex-wrap mb-5">
                {experience.technologies.map((skill) => (
                  <div
                    key={skill}
                    className="border rounded-sm text-[#93DEFF] bg-[#93DEFF] bg-opacity-10 text-sm p-1 w-fit"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;