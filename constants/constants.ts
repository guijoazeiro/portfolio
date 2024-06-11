export const links = [
  { id: 1, href: "/", text: "Home" },
  { id: 2, href: "#about", text: "Sobre" },
  { id: 3, href: "#skills", text: "Habilidades" },
  { id: 4, href: "#experience", text: "Experiência" },
  { id: 5, href: "#projects", text: "Projetos" },
];

export const workExperience = [
  {
    id: 1,
    company: "Adin - Oracle CX",
    position: "Desenvolvedor Backend",
    startDate: "Aug 2022",
    endDate: "Dec 2023",
    description:
      "Desenvolvi integrações entre aplicações Node.js e serviços Oracle utilizando Express e NestJS, otimizando o fluxo de dados e a comunicação entre sistemas. Implementei APIs RESTful seguras e eficientes, seguindo as melhores práticas de desenvolvimento. Utilizei Docker para implantação e gerenciamento das aplicações, além de MongoDB e PostgreSQL para armazenamento de dados. Criei testes unitários com Jest e testes end-to-end para assegurar a qualidade das funcionalidades. Automatizei o envio de e-mails personalizados com Python e Pandas, eliminando processos manuais e aumentando a eficiência das campanhas de marketing. No Salesforce, desenvolvi funcionalidades para e-commerce com Node.js, HTML e CSS, melhorando a experiência do cliente e corrigindo bugs para garantir a estabilidade dos projetos.",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "Postgres",
      "Python",
      "Pandas",
      "Salesforce",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: " Comunicação entre Microsserviços. ",
    description: 'Projeto de comunicação entre microsserviços Java e Nodejs',
    technologies: [
      "Spring Boot",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "RabbitMQ",
      "Docker",
      "JWT",
    ],
    githubLink: "https://github.com/guijoazeiro/comunicacao-microsservicos",
  },
  {
    id: 2,
    title: "Papelaria API",
    description: 'API de e-commerce feito Nestjs, Postgres e AWS S3',
    technologies: [
      "Typescript",
      "Node.js",
      "Postgres",
      "AWS S3",
      "Docker",
      "JWT",
      "Swagger",
    ],
    githubLink: "https://github.com/guijoazeiro/papelaria-api",
  },
  {
    id: 3,
    title: "SpotTube",
    description: 'API de conversor de playlist do youtube para playlist do spotify',
    technologies: ["Typescript", "Node.js", "Postgres", "JWT", "Swagger"],
    githubLink: "https://github.com/guijoazeiro/spottube",
  },
  {
    
    id: 4,
    title: "Portfolio Website",
    description: 'Portofóçio desenvolvido com Next.JS e TailwindCSS',
    technologies: ["Next.js", "Tailwind"],
    githubLink: "https://github.com/guijoazeiro/portfolio",
  },
];

export const skills = [
  "NodeJS ",
  "Typescript ",
  "Express ",
  "Nestjs ",
  "Java",
  "Spring Boot ",
  "PostgreSQL",
  "MongoDB ",
  "Docker ",
  "RabbitMQ ",
  "Redis ",
  "Microservices ",
  "Python ",
  "Padrões de Design ",
  "Princípios SOLID ",
  "Linux ",
  "Git ",
  "Visual Studio ",
  "REST",
  "TDD ",
  "Testes Automatizados",
  "CI/CD ",
  "Autenticação OAuth ",
  "JWT ",
  "Segurança de APIs ",
  "PM2",
];
