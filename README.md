
````markdown
# 📋 TaskPlus

**TaskPlus** é uma aplicação de gerenciamento de tarefas desenvolvida em **Next.js + TypeScript** no frontend e **Spring Boot** no backend. Seu foco é oferecer uma experiência simples, rápida e intuitiva para o controle de tarefas.

Desenvolvido por **Luan Chaves**.  
Versão atual: `v0.1.0`

---

## 🚀 Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login com token de autenticação
- ✅ Listagem de tarefas por usuário autenticado
- ✅ Criação, edição e exclusão de tarefas
- ✅ Validações de email e senha no formulário
- ✅ Navegação protegida por autenticação

---

## ⚙️ Tecnologias

### Frontend

- [Next.js 15.3.1](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- Axios para requisições HTTP

### Backend

> O backend da aplicação é desenvolvido com **Spring Boot** e está disponível em um repositório separado.

---

## 📂 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/DevMboo/task-plus.git
cd task-plus
````

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Execute o ambiente de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

---

## 📌 Estrutura de Diretórios

```
.
├── components/           # Componentes reutilizáveis
│   └── common/           # Campos e elementos de formulário
├── contexts/             # Contexto de autenticação
├── hooks/                # Hooks personalizados (validação de email/senha)
├── pages/                # Páginas da aplicação
│   ├── login.tsx         # Tela de login
│   ├── register.tsx      # Tela de registro
│   ├── tasks.tsx         # Painel de tarefas
│   └── index.tsx         # Redirecionamento ou landing
├── services/             # Serviços de autenticação e API
└── styles/               # Estilização global com Tailwind
```

---

## 🔐 Rotas disponíveis

| Rota        | Método | Descrição                        |
| ----------- | ------ | -------------------------------- |
| `/login`    | GET    | Tela de login                    |
| `/register` | GET    | Tela de registro de novo usuário |
| `/tasks`    | GET    | Painel de tarefas (protegido)    |
| `/`    | GET    | Visualização geral (protegido)   |

> As rotas privadas só são acessíveis com um token JWT armazenado no `localStorage`.

---

## 🔗 Integração com o Backend

A aplicação se comunica com um backend **Spring Boot** através de endpoints da API REST. O token JWT retornado no login é armazenado no `localStorage` e enviado em requisições autenticadas.

---

## 🧪 Scripts disponíveis

| Script          | Descrição                                |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Inicia o servidor de desenvolvimento     |
| `npm run build` | Compila o projeto para produção          |
| `npm run start` | Inicia o servidor de produção            |
| `npm run lint`  | Executa o linter nos arquivos do projeto |

---

## 👤 Autor

Desenvolvido com 💜 por **Luan Chaves** **DevMboo**

---

## 📌 Versão

**v0.1.0**

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

```
