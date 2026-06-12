# backend/src/controllers/produtos.controller.ts

## Responsabilidade
Gerencia operações CRUD e status de produtos.

## Exportações
- `getProdutos(req, res)`
- `createProduto(req, res)`
- `updateProduto(req, res)`
- `inativarProduto(req, res)`
- `reativarProduto(req, res)`

## Fluxo
- `getProdutos`: busca produtos com inclusão de categoria e paginação.
- `createProduto`: cria produtos com campos numéricos convertidos para `Number`.
- `updateProduto`: atualiza produto mesmo se alguns campos estiverem ausentes.
- `inativarProduto` / `reativarProduto`: ajustam o campo `ativo` mantendo dados de categoria.

## Observações
- O endpoint aceita tanto `camelCase` quanto `snake_case` para alguns campos.
- Não há validação de quantidade mínima ou checagem de categoria existente.
- Retorna associção com categoria usando `include: { categoria: true }`.

## Dependências
- `../config/prisma`
- `../middlewares/auth.middleware`
