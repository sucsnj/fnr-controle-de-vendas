# backend/src/controllers/pedidos.controller.ts

## Responsabilidade
Gerencia pedidos, seus produtos associados e status operacionais.

## Exportações
- `getPedidos(req, res)`
- `createPedido(req, res)`
- `updatePedido(req, res)`
- `marcarEntregue(req, res)`
- `inativarPedido(req, res)`
- `reativarPedido(req, res)`
- `getStatus(req, res)`

## Fluxo
- `getPedidos`: busca pedidos com múltos relacionamentos e inclui produtos, cliente, fornecedor, vendedor e categoria.
- `createPedido`: valida número de pedido e número de OS duplicados antes de criar.
- `updatePedido`: atualiza pedido e reconstrói itens de produto quando enviados.
- `marcarEntregue`: marca pedido como entregue e fixa data de entrega.
- `getStatus`: calcula estatísticas de pedidos em andamento, atrasados, total e entregues.

## Observações
- Usa conversões de data para `Date` e aceita tanto `camelCase` quanto `snake_case`.
- Ao atualizar, exclui todos os produtos anteriores do pedido e recria com novos itens.
- `getStatus` não diferencia entre pedidos inativos e ativos em alguns cálculos.

## Dependências
- `../config/prisma`
- `../middlewares/auth.middleware`
