# backend/src/routes/produtos.routes.ts

## Responsabilidade
Registra endpoints para gerenciamento de produtos.

## Comportamento
- Usa `authMiddleware` em todas as rotas.
- Expõe:
  - `GET /` → `getProdutos`
  - `POST /` → `createProduto`
  - `PUT /:id` → `updateProduto`
  - `PATCH /:id/inativar` → `inativarProduto`
  - `PATCH /:id/reativar` → `reativarProduto`

## Observações
- Montada como `/produtos` em `app.ts`.
- A resposta inclui a categoria associada ao produto.

## Dependências
- `express`
- `../middlewares/auth.middleware`
- `../controllers/produtos.controller`
