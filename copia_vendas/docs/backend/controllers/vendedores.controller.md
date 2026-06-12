# backend/src/controllers/vendedores.controller.ts

## Responsabilidade
Gerencia operações CRUD e status de vendedores.

## Exportações
- `getVendedores(req, res)`
- `createVendedor(req, res)`
- `updateVendedor(req, res)`
- `inativarVendedor(req, res)`
- `reativarVendedor(req, res)`

## Fluxo
- `getVendedores`: busca vendedores ativos ou inativos com paginação.
- `createVendedor`: valida email único antes de criar.
- `updateVendedor`: atualiza registros de vendedor existentes.
- `inativarVendedor` / `reativarVendedor`: alteram o campo `ativo`.

## Observações
- Não há rotas para alterar senha de vendedor.
- O campo `isAdmin` é definido apenas na criação do primeiro usuário no cadastro público.
- O controle de ativo/inativo usa apenas o campo `ativo`.

## Dependências
- `../config/prisma`
- `../middlewares/auth.middleware`
