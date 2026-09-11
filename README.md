# MedClinic API

## Sobre o projeto

O MedClinic API é uma API REST desenvolvida em Node.js, TypeScript, Express, TypeORM e PostgreSQL, criada como base para um sistema de gerenciamento de uma clínica médica. O projeto contempla, nesta primeira etapa, a estrutura inicial da aplicação, autenticação de usuários, gerenciamento de usuários e controle de acesso baseado em funções (RBAC).

A aplicação foi desenvolvida seguindo uma arquitetura em camadas, utilizando Controllers, Services e Repositories, além de DTOs para validação e padronização dos dados, middlewares para autenticação, autorização e tratamento de erros, e TypeORM para o mapeamento e acesso ao banco de dados PostgreSQL.

## Objetivo

Desenvolver uma aplicação back-end para consolidar os conhecimentos adquiridos durante os estudos do módulo Carreira Tech - Trilha Desenvolvimento de Software, aplicando na prática conceitos de arquitetura em camadas, programação orientada a objetos, persistência de dados, autenticação, autorização e implementação de regras de negócio.

O projeto também tem como objetivo exercitar a construção de uma API organizada e escalável, utilizando Node.js, TypeScript, Express, TypeORM e PostgreSQL, além de boas práticas de validação, tratamento de erros e organização do código, criando uma base preparada para a evolução do sistema.

## Tecnologias utilizadas

- Node.js;
- TypeScript;
- Express;
- TypeORM;
- PostgreSQL;
- pgAdmin 4;
- JWT;
- bcryptjs;
- class-validator;
- class-transformer;
- CORS;
- Git;
- GitHub.

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- PostgreSQL
- Git

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/luizrd84/SCTEC-Projeto03-MedClinic-API.git
```

Acesse a pasta do projeto, por exemplo:

```
cd SCTEC-Projeto03-MedClinic-API
```

Instale as dependências:

```
npm install
```

Crie um arquivo chamado .env na raiz do projeto, utilizando como referência o arquivo .envExemplo e configure as credenciais de acesso ao banco de dados.

Crie um banco de dados chamado **medclinicdb** no PostgreSQL utilizando a ferramenta de sua preferência (recomenda-se o pgAdmin).

Execute o script para criar as tabelas e demais objetos do banco de dados:

```
npm run schema
```

## Como executar

Execute o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

## Estrutura do projeto

```
sctec-projeto02-bookstore-manager-cli/
│
├── src/
│   ├── server.ts
│   │
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   └── UsuarioController.ts
│   │
│   ├── database/
│   │   ├── createAdmin.ts
│   │   ├── createSchema.ts
│   │   ├── data-source.ts
│   │   └── schema.sql
│   │
│   ├── entities/
│   │   ├── DTOs/
│   │   │   ├── AlterarSenhaDto.ts
│   │   │   ├── CriarUsuarioDto.ts
│   │   │   ├── LoginDto.ts
│   │   │   ├── RefreshTokenDto.ts
│   │   │   ├── UsuarioIdParamDto.ts
│   │   │   └── UsuarioResponseDto.ts
│   │   │
│   │   ├── RefreshToken.ts
│   │   └── Usuario.ts
│   │
│   ├── errors/
│   │   └── AppError.ts
│   │
│   ├── middlewares/
│   │   ├── asyncHandler.ts
│   │   ├── authMiddleware.ts
│   │   ├── errorMiddleware.ts
│   │   ├── roleMiddleware.ts
│   │   └── validateDTO.ts
│   │
│   ├── repositories/
│   │   ├── RefreshTokenRepository.ts
│   │   └── UsuarioRepository.ts
│   │
│   ├── routes/
│   │   ├── adminRoutes.ts
│   │   ├── auth.routes.ts
│   │   ├── index.ts
│   │   └── usuario.routes.ts
│   │
│   ├── services/
│   │   ├── AuthService.ts
│   │   └── UsuarioService.ts
│   │
│   └── utils/
│       └── jwt.ts
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Funcionalidades implementadas

- Cadastro de usuários com diferentes níveis de acesso;
- Cadastro de usuários com perfil GERENTE e ATENDENTE;
- Criação de usuário ADMIN para administração inicial do sistema;
- Autenticação de usuários utilizando JWT;
- Geração de Access Token e Refresh Token;
- Renovação de Access Token através do Refresh Token;
- Logout com revogação do Refresh Token;
- Consulta dos dados do usuário autenticado através do endpoint /auth/me;
- Listagem de usuários;
- Consulta de usuário por ID;
- Exclusão de usuários;
- Alteração da própria senha pelo usuário autenticado;
- Controle de acesso baseado em funções (RBAC);
- Restrição de funcionalidades de acordo com o perfil do usuário;
- Validação de dados utilizando DTOs e class-validator;
- Validação de parâmetros de rota;
- Criptografia das senhas utilizando bcryptjs;
- Persistência dos dados em PostgreSQL através do TypeORM;
- Tratamento centralizado de erros;

## Perfis de acesso disponíveis

A API possui os seguintes perfis de acesso:

- **ADMIN** — perfil administrativo, destinado ao gerenciamento geral do sistema e dos usuários.
- **GERENTE** — perfil de gerenciamento, destinado às operações e funcionalidades administrativas da aplicação.
- **ATENDENTE** — perfil operacional, destinado ao atendimento e execução das operações disponíveis no sistema.

Os perfis são armazenados no campo `role` do usuário e serão utilizados pelo mecanismo de **RBAC (Role-Based Access Control)** para controlar o acesso às funcionalidades da API.

## Endpoints

### Autenticação

A API utiliza autenticação baseada em JWT (JSON Web Token).

### POST /auth/login

Realiza a autenticação do usuário através de e-mail e senha.

#### Requisição

```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "senha": "123456"
}
```

#### Resposta — 200 OK

```http
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "..."
}
```

### POST /auth/refresh

Gera um novo `accessToken` utilizando um `refreshToken` válido.

#### Requisição

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "..."
}
```

#### Resposta — 200 OK

```http
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### POST /auth/logout

Realiza o logout do usuário autenticado.

O `accessToken` utilizado na requisição é invalidado e adicionado a uma lista negra (blacklist), impedindo que seja utilizado novamente enquanto estiver registrado nessa lista.

#### Requisição

```http
POST /auth/logout
Authorization: Bearer <accessToken>
```

#### Resposta — 200 OK

```http
{
  "message": "Logout realizado com sucesso"
}
```

## Melhorias futuras

- Continuidade do projeto

## Autor

- Desenvolvido por Luiz Ricardo Dias
