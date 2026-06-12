# Documentação Completa do Backend

## Visão Geral
O backend deste projeto é uma API REST construída com **Node.js**, **TypeScript**, **Express** e **Prisma ORM**. Ele fornece endpoints para autenticação e gerenciamento dos recursos principais do sistema: clientes, fornecedores, produtos, categorias, pedidos, vendedores e agenda.

## Estrutura do Backend

### Arquivos principais
- `src/server.ts`
  - Ponto de entrada do servidor.
  - Importa o aplicativo Express (`app.ts`) e inicia a escuta na porta configurada em `process.env.PORT` ou `3333`.

- `src/app.ts`
  - Configura middlewares globais (`cors`, `express.json`, `express.urlencoded`).
  - Monta rotas para cada módulo.
  - Implementa o endpoint público de cadastro de usuário (`POST /cadastro`).
  - Aplica bloqueio de demonstração baseado em data para todas as requisições.
  - Registra `GET /` como rota de health check.

- `src/config/prisma.ts`
  - Cria e exporta uma instância única de `PrismaClient`.
  - Usado pelos controladores para acessar o banco de dados.

- `src/middlewares/auth.middleware.ts`
  - Verifica o cabeçalho `Authorization` em requisições protegidas.
  - Valida JWT usando `jsonwebtoken` e o segredo `JWT_SECRET` ou fallback `secret`.
  - Adiciona `userId` e `userEmail` à requisição.

## Arquitetura por pasta

### `src/routes/`
Cada arquivo de rota importa um controlador e aplica `authMiddleware` para proteger os endpoints:
- `auth.routes.ts`
- `clientes.routes.ts`
- `fornecedores.routes.ts`
- `produtos.routes.ts`
- `categorias.routes.ts`
- `vendedores.routes.ts`
- `pedidos.routes.ts`
- `agenda.routes.ts`

### `src/controllers/`
Cada controlador gerencia a lógica de negócio e as operações de banco de dados com Prisma:
- `auth.controller.ts` → login e geração de JWT
- `clientes.controller.ts` → CRUD de clientes e ativação/inativação
- `fornecedores.controller.ts` → CRUD de fornecedores e ativação/inativação
- `categorias.controller.ts` → CRUD de categorias e ativação/inativação
- `produtos.controller.ts` → CRUD de produtos e ativação/inativação
- `vendedores.controller.ts` → CRUD de vendedores e ativação/inativação
- `pedidos.controller.ts` → gestão de pedidos, itens de pedido, status e estatísticas
- `agenda.controller.ts` → gestão de agendamentos, conclusão, repetição mensal e exclusão

## Fluxo de Requisições

1. **Cadastro** (`POST /cadastro`)
   - Recebe `nome`, `email` e `senha`.
   - Verifica dados obrigatórios e unicidade de email.
   - Hash de senha com `bcryptjs`.
   - Cria `vendedor` e `usuario` no banco.
   - Caso seja primeiro usuário, cria categorias padrão.

2. **Login** (`POST /auth/login`)
   - Recebe `username` e `password` via `x-www-form-urlencoded`.
   - Busca o usuário por email.
   - Compara senha com hash armazenado.
   - Retorna JWT com `sub` e `id` no payload.

3. **Acesso Protegido**
   - Todas as rotas sob `/clientes`, `/fornecedores`, `/produtos`, `/categorias`, `/vendedores`, `/pedidos` e `/agenda` aplicam `authMiddleware`.
   - O middleware valida o token e rejeita com `401` quando inválido ou ausente.

4. **Operações CRUD**
   - Controladores usam o cliente Prisma para `findMany`, `findUnique`, `create`, `update`, `deleteMany` e `delete`.
   - Campos de filtros e paginação são extraídos de `req.query`.
   - O uso de `ativo` permite inativar/reativar registros sem excluir fisicamente.

## Detalhes de Endpoints

### Autenticação
- `POST /auth/login`
  - Entrada: `username`, `password`
  - Saída: `{ access_token, token_type }`

### Cadastro público
- `POST /cadastro`
  - Entrada: `nome`, `email`, `senha`
  - Saída: mensagem de sucesso

### Clientes
- `GET /clientes`
- `POST /clientes`
- `PUT /clientes/:id`
- `PATCH /clientes/:id/inativar`
- `PATCH /clientes/:id/reativar`

### Fornecedores
- `GET /fornecedores`
- `POST /fornecedores`
- `PUT /fornecedores/:id`
- `PATCH /fornecedores/:id/inativar`
- `PATCH /fornecedores/:id/reativar`

### Categorias
- `GET /categorias`
- `POST /categorias`
- `PUT /categorias/:id`
- `PATCH /categorias/:id/inativar`
- `PATCH /categorias/:id/reativar`

### Produtos
- `GET /produtos`
- `POST /produtos`
- `PUT /produtos/:id`
- `PATCH /produtos/:id/inativar`
- `PATCH /produtos/:id/reativar`

### Vendedores
- `GET /vendedores`
- `POST /vendedores`
- `PUT /vendedores/:id`
- `PATCH /vendedores/:id/inativar`
- `PATCH /vendedores/:id/reativar`

### Pedidos
- `GET /pedidos`
- `GET /pedidos/status`
- `POST /pedidos`
- `PUT /pedidos/:id`
- `POST /pedidos/:id/entregue`
- `PATCH /pedidos/:id/inativar`
- `PATCH /pedidos/:id/reativar`

### Agenda
- `GET /agenda`
- `GET /agenda/proximos`
- `POST /agenda`
- `PUT /agenda/:id`
- `POST /agenda/:id/realizado`
- `DELETE /agenda/:id`

## Lógica Específica por Módulo

### Pedidos
- Os pedidos incluem múltiplos relacionamentos:
  - `cliente`, `fornecedor`, `vendedor`, `categoria`
  - `produtos` com `pedido_produto`
- Cria e atualiza itens de pedido via `produtos.create` e `produtos.deleteMany`.
- `getStatus` calcula métricas: em andamento, atrasados, total e entregues.

### Agenda
- Suporta agendamento com repetição mensal.
- Ao marcar realizado, um novo agendamento é criado com +30 dias se `repetirMensalmente` estiver ativo.
- Permite consulta de agendamentos da próxima semana.

## Configuração do Prisma
- A configuração do banco é feita a partir do schema Prisma em `prisma/schema.prisma`.
- O projeto usa SQLite em desenvolvimento via `dev.db`.
- O seed inicializa dados no arquivo `prisma/seed.ts`.

## Pontos de Atenção e Melhorias

### Validação de Dados
- A maior parte das validações acontece no código do controlador e não em schemas específicos.
- Não há validação centralizada usando `zod` ou `class-validator`.
- Falta validação de formatos para CPF/CNPJ, CNPJ, emails e datas.

### Segurança
- `JWT_SECRET` possui fallback estático para `secret`.
- Tokens são verificados, mas não há política de refresh token.
- O middleware não diferencia erros de expiração e erros de token inválido.

### Robustez
- Falta tratamento global de erros no Express.
- O endpoint de cadastro carrega `prisma` e `bcryptjs` dinamicamente dentro da rota.
- O mecanismo de expiração da demo está presente em `app.ts` e impede o uso após data fixa.

### Manutenção
- Código repetido entre controladores, especialmente para inativar/reativar.
- Padrões de conversão de campos (`snake_case`/`camelCase`) aparecem em vários lugares.
- Poderia ser útil extrair utilitários de conversão e validação.
