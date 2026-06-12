# Documentação do Projeto

## Visão Geral
Este projeto é uma aplicação de controle de vendas dividida em duas camadas principais:

- **Backend**: Node.js, TypeScript, Express e Prisma.
- **Frontend**: React, TypeScript e Vite.

O objetivo é gerenciar clientes, fornecedores, vendedores, produtos, pedidos, categorias e agendamentos.

## Arquitetura Geral

### Backend

O backend segue um padrão modular:

- **`src/server.ts`**: inicializa o servidor Express.
- **`src/app.ts`**: configura middlewares, rotas e rota de cadastro público.
- **`src/config/prisma.ts`**: exporta a instância Prisma para acesso ao banco.
- **`src/middlewares/auth.middleware.ts`**: valida tokens JWT e injeta dados do usuário no request.
- **`src/routes/*.routes.ts`**: define endpoints por recurso.
- **`src/controllers/*.controller.ts`**: implementa regras de negócio e manipulação de dados.

### Frontend

O frontend é organizado em:

- **`src/main.tsx`**: ponto de entrada React.
- **`src/App.tsx`**: define rotas, proteção de páginas e layout geral.
- **`src/contexts/AuthContext.tsx`**: gerencia estado de autenticação e persistência de token.
- **`src/services/api.ts`**: configura Axios para chamadas à API e intercepta respostas.
- **`src/components/`**: contém UI de layout, navegação e controle de rota privada.
- **`src/pages/`**: contém telas específicas para cada domínio do sistema.

## Fluxo de Dados entre Módulos

1. **Login / Cadastro**:
   - Frontend envia credenciais ou dados de cadastro para o backend.
   - Backend valida ou cria usuário, gera JWT e retorna para o frontend.
   - Frontend armazena token em `localStorage` e define o cabeçalho `Authorization` nas requisições.

2. **Chamadas CRUD**:
   - Páginas chamam `api` para acessar endpoints como `/clientes`, `/fornecedores`, `/produtos`, `/pedidos`, `/categorias`, `/vendedores` e `/agenda`.
   - Rotas no backend são protegidas pelo middleware JWT quando necessário.
   - Controladores consultam ou atualizam o banco via Prisma e retornam resultados.

3. **Proteção de textos e navegação**:
   - Frontend usa `PrivateRoute` para garantir que apenas usuários autenticados acessem páginas administrativas.
   - Backend rejeita chamadas sem token válido com status `401`.

## Pontos Fortes

- Boa separação entre rotas e controladores no backend.
- Uso de Prisma como ORM para acesso consistente ao banco de dados.
- Frontend modular com contexto de autenticação e rotas protegidas.
- Uso de hooks para organização de estado nas páginas.
- Reuso básico de componentes de layout (`Layout`, `Navbar`, `Sidebar`).

## Pontos Fracos

- **Validação de entrada insuficiente**: backend depende de validações manuais básicas e não utiliza Zod nas requisições.
- **Segurança**: fallback de `JWT_SECRET` para `secret` e dados em `localStorage` são pontos de risco.
- **UI e manutenção**: muitos estilos inline no frontend duplicados.
- **Tratamento de erros**: não existe middleware global para erros no backend.
- **Dados sensíveis**: `process.env` não está documentado no repositório.
- **Expiração da demo**: lógica de expiração está distribuída entre backend e frontend.

## Sugestões de Melhoria

### Backend

- Adicionar validação de request com `zod` ou bibliotecas similares em cada rota.
- Substituir o secret hardcoded (`secret`) por uma variável obrigatória e validar presença.
- Implementar tratamento de erros global no Express.
- Externalizar configurações de CORS e tempos de expiração.
- Documentar o modelo Prisma e adicionar migrações no README.

### Frontend

- Centralizar estilos com CSS ou sistema de design (Theme / CSS Modules / Styled Components).
- Reduzir duplicação de modais e tabelas com componentes reutilizáveis.
- Adotar um hook customizado para formulários e listas paginadas.
- Melhorar experiência de autenticação com refresh token.
- Validar entradas antes de enviar para a API.
- Externalizar `VITE_API_URL` e fornecer `.env.example`.

## Observações

- A rota `POST /cadastro` é pública e cria o primeiro usuário como administrador.
- A demo expira em **10/07/2026** tanto no frontend quanto no backend.
- A aplicação usa `Axios` no frontend e `Prisma` no backend.
- A integração entre frontend e backend depende do padrão REST simples, com endpoints típicos de CRUD.
