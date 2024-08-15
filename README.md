*https://rater-nine.vercel.app/*

# Desenvolvimento:

Para facilitar o desenvolvimento, optei por utilizar uma configuração de DevContainer que já utilizo em outros projetos pessoais.

Outro desafio encontrado, foi o fato da escolha por utilizar o framework NextJS. Eu já tinha o conhecimento de que a library StyledComponents não tinha compatibilidade com RSC, e que eu precisaria transformar toda a aplicação em client-side, porém creio que ainda valeu a pena em relação a toda a comodidade oferecida pelo framework em questão de centralização e facilidade de operar de maneira full-stack.

- _NEXTJS_

O desenvolvimento do backend se mostrou simples, devido a minha escolha de utilizar o framework NextJS, cujo já estou familiarizado. O NextJS possui um sistema simples de file routing, que facilita muito a criação de APIs, além da robustez para desenvolvimento do cliente.

Optei por seguir uma arquitetura mais próxima do NestJS, que faz uso de controllers e services. Desta forma, criei 2 decorators customizados para tomar conta tanto da validação de tipos como da autenticação dos usuários.

Outra grande vantagem é também a padronização de erros e respostas entre o servidor e o cliente. Já que tudo roda no mesmo projeto, é muito mais simples de definir tipos e classes entre as aplicações.

- _PRISMA_

Para o banco de dados, optei por utilizar o PrismaORM, devido a sua versatilidade e simplicidade na hora de gerar migrations e manusear o banco de dados. Também, ele oferece a possibilidade de gerar queries manualmente, o que ajudou na hora de desenvolver a busca full text.

Também foi de grande ajuda o sistema de seeding, que pude utilizar para realizar o desenvolvimento enquanto criei algumas funções para alimentar o banco de dados através do TMDB

- _OPENAPI_

Disponibilizei também uma página simples para verificação das rotas de API e os corpos de requisição necessários. Como documentação, ainda precisaria de um pouco mais de atenção.

https://rater-nine.vercel.app/api-doc

# Objetivos

## Frontend

1. **Fazer um client em React.**:

   ✅ Cliente desenvolvido em NextJS

2. **O client deverá consumir a API que você criou.**:

   ✅ O cliente consome a api através da biblioteca de fetching SWR.

3. **O client deverá seguir o seguinte design no Figma: Desafio técnico FullStack.**:

   ✅ Cheguei muito próximo da versão do Figma, apesar do pouco tempo hábil.

4. **Utilize o Zustand para state management.**:

   ✅ Desenvolvi a autenticação e o estado global da aplicação utilizando Zustand

5. **Utilize styled-components para estilizar os componentes.**:

   ✅ Componentes estilizados com a biblioteca styled-components

## Backend

1. **Fazer uma API HTTP com Typescript.**:

   ✅ API HTTP Desenvolvida em NextJS

2. **Implementar um sistema de CRUD de usuários.**:

   ✅ CRUD de usuários e diversas outros serviços para as outras entidades do projeto

3. **Banco de dados: escolha um relacional, podendo usar um ORM de sua escolha.**:

   ✅ Utilizei PostgreSQL com Prisma.

4. **Cada usuário deve poder logar no sistema.**:

   ✅ Usuários podem logar no sistema, avaliar filmes e receber indicações.

5. **Documentação da API e suas rotas.**:

   ✅ Desenvolvido com OpenAPI: https://rater-nine.vercel.app/api-doc

## Instruções para a Aplicação

0. **Dev Container**
   O projeto foi desenvolvido dentro de um DevContainer no VSCode, certifique-se de que você possui o Docker e a extensão instaladas.

1. **Instale as dependências**:
   Na pasta raiz do projeto, rode:
   `code
        pnpm install
       `

2. **Preencha as environment variables**:

   ```env
    DATABASE_URL=""
    DIRECT_URL=""
    TMDB_API_KEY= ""
    JWT_SECRET=""
   ```

   **PS:** A chave do TMDB serve apenas para rodar o seed do Prisma, ela não é necessária para produção.

   **PS2:** Como estou utilizando um ambiente serverless na Vercel, Database hosts como o Supabase requerem uma conexão através de pooling, então por isso existem duas URLS, para desenvolvimento, basta utilizar:

`"postgresql://postgres:postgres@host.docker.internal:1212/postgres?schema=public"`

3. **OPCIONAL: Rodar Seed do Prisma**

   ```code
       pnpm run seed
   ```

   Isso irá limpar o banco de dados e alimentar diretamente da API do TMDB

4. **Para rodar o projeto:**

   ```code
        pnpm run dev
   ```

5. **Links**

- Deploy: https://rater-nine.vercel.app/
- Repositório: https://github.com/gcmarcello/rater
