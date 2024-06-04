import React from "react";

const About = () => {
  return (
    <div className="container mx-auto mb-5 p-5 md:p-0" id="about">
      <h1 className="underline underline-offset-4 mb-5 text-2xl">Sobre mim</h1>
      <p className="text-gray-400">
    Sou desenvolvedor de software Node.js, Java e Python com mais de 1 ano de experiência na área de desenvolvimento web. 
    Sou um profissional comprometido, estudioso, sempre empenhado em aprender e evoluir, pronto para enfrentar qualquer obstáculo e contribuir com soluções eficazes para o sucesso da equipe.
</p>
<p className="text-gray-400">
    Atualmente estou focado no backend e trabalho com as seguintes tecnologias:
</p>
<ul className="text-gray-400">
    <li>Node.js (Javascript/Typescript)</li>
    <li>Framework Express/Nestjs/Fastify</li>
    <li>Java Spring</li>
    <li>Python (Pandas, Django)</li>
    <li>SQL, bancos de dados relacionais (Postgres, MySql e SQLServer) e não relacionais (Redis, MongoDB)</li>
    <li>Testes unitários e de integração com Node.js e Java</li>
    <li>Noções de microsserviços, design patterns, DDD e Clean Code (SOLID), Docker</li>
    <li>Noções de versionamento de código com GIT, Github, GitLab</li>
    <li>Noções básicas de React.js, Angular, HTML, CSS e JS</li>
</ul>
<p className="text-gray-400">
    Tenho habilidades de leitura e conversação em inglês em um nível intermediário.
</p>
    </div>
  );
};

export default About;
