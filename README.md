# Portfólio

Este é o código-fonte do meu portfólio, desenvolvido utilizando Next.js, TypeScript e TailwindCSS.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)

## Funcionalidades

- Exibição de informações pessoais
- Apresentação de projetos
- Responsividade


## Instalação

Clone o repositório:

```bash
git clone https://github.com/guijoazeiro/portfolio
```

## Como rodar o projeto

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra http://localhost:3000 no seu navegador para ver o resultado.

## URL de produção

O SEO usa `https://portfolio-phi-swart-29.vercel.app` por padrão. Caso o site seja
publicado em outro domínio, configure a variável `SITE_URL` no ambiente de deploy:

```bash
SITE_URL=https://seu-dominio.com
```

Para validar o site por meta tag no Google Search Console, configure também apenas
o token fornecido pelo Google (sem a tag HTML completa):

```bash
GOOGLE_SITE_VERIFICATION=seu-token-de-verificacao
```
