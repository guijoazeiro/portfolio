import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const content = `# Guilherme Joazeiro — Backend Engineer

> Bilingual professional portfolio of Guilherme Joazeiro, a Backend Engineer based in São Paulo, Brazil, focused on APIs, microservices and scalable systems.

This site presents professional experience, technical skills, selected projects, articles and contact information. Content is available in Portuguese and English.

## Main pages

- [Português](${siteUrl}/pt): Portuguese version of the portfolio.
- [English](${siteUrl}/en): English version of the portfolio.

## Professional profiles

- [GitHub](https://github.com/guijoazeiro): Source code and projects.
- [LinkedIn](https://www.linkedin.com/in/guilherme-joazeiro): Professional profile and articles.

## Areas of expertise

- Backend development and software architecture
- REST APIs and microservices
- Node.js, TypeScript, Go, Python and Java
- PostgreSQL, MongoDB, Redis and RabbitMQ
- AWS, Docker, CI/CD, Linux and NGINX

## Usage

Public portfolio content may be read, summarized and cited with attribution to Guilherme Joazeiro. Contact-form endpoints and personal data contained in downloadable documents should not be collected or reproduced.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
