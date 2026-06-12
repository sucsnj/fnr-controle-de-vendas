# backend/src/routes/clientes.routes.ts

## Responsabilidade
Define as rotas de cliente e garante que apenas requisições autenticadas possam acessá-las.

## Comportamento
- Aplica `authMiddleware` em todas as rotas.
- Define rotas:
  - `GET /` → `getClientes`
  - `POST /` → `createCliente`
  - `PUT /:id` → `updateCliente`
  - `PATCH /:id/inativar` → `inativarCliente`
  - `PATCH /:id/reativar` → `reativarCliente`

## Observações
- Esta rota é montada em `/clientes` no arquivo `app.ts`.
- Todos os métodos dependem do token JWT válido.

## Dependências
- `express`
- `../middlewares/auth.middleware`
- `../controllers/clientes.controller`
