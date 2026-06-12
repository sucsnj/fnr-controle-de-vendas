# backend/src/routes/fornecedores.routes.ts

## Responsabilidade
Registra endpoints para gerenciamento de fornecedores.

## Comportamento
- Usa `authMiddleware` em todas as rotas.
- Expõe:
  - `GET /` → `getFornecedores`
  - `POST /` → `createFornecedor`
  - `PUT /:id` → `updateFornecedor`
  - `PATCH /:id/inativar` → `inativarFornecedor`
  - `PATCH /:id/reativar` → `reativarFornecedor`

## Observações
- Montada sob `/fornecedores` em `app.ts`.
- Não há versão pública deste recurso.

## Dependências
- `express`
- `../middlewares/auth.middleware`
- `../controllers/fornecedores.controller`
