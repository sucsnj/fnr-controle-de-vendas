# backend/src/routes/pedidos.routes.ts

## Responsabilidade
Registra endpoints para gerenciamento de pedidos.

## Comportamento
- Protege todas as rotas com `authMiddleware`.
- Define as rotas:
  - `GET /status` → `getStatus`
  - `GET /` → `getPedidos`
  - `POST /` → `createPedido`
  - `PUT /:id` → `updatePedido`
  - `POST /:id/entregue` → `marcarEntregue`
  - `PATCH /:id/inativar` → `inativarPedido`
  - `PATCH /:id/reativar` → `reativarPedido`

## Observações
- A rota de status entrega um resumo de pedidos atrasados, em andamento, total e entregues.
- Montada em `/pedidos` no aplicativo.

## Dependências
- `express`
- `../middlewares/auth.middleware`
- `../controllers/pedidos.controller`
