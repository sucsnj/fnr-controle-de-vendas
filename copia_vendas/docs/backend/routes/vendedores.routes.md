# backend/src/routes/vendedores.routes.ts

## Responsabilidade
Registra endpoints para gerenciamento de vendedores.

## Comportamento
- Usa `authMiddleware` para proteger as rotas.
- Define:
  - `GET /` → `getVendedores`
  - `POST /` → `createVendedor`
  - `PUT /:id` → `updateVendedor`
  - `PATCH /:id/inativar` → `inativarVendedor`
  - `PATCH /:id/reativar` → `reativarVendedor`

## Observações
- Montada em `/vendedores` no arquivo `app.ts`.
- Não existem endpoints específicos para alterar permissões.

## Dependências
- `express`
- `../middlewares/auth.middleware`
- `../controllers/vendedores.controller`
