# backend/src/routes/categorias.routes.ts

## Responsabilidade
Registra endpoints para gerenciamento de categorias.

## Comportamento
- Aplica `authMiddleware` a todas as rotas.
- Define:
  - `GET /` → `getCategorias`
  - `POST /` → `createCategoria`
  - `PUT /:id` → `updateCategoria`
  - `PATCH /:id/inativar` → `inativarCategoria`
  - `PATCH /:id/reativar` → `reativarCategoria`

## Observações
- As rotas de categoria também estão protegidas por autenticação.
- Montada em `/categorias` no aplicativo.

## Dependências
- `express`
- `../middlewares/auth.middleware`
- `../controllers/categorias.controller`
