# front/src/pages/Pedidos/Pedidos.tsx

## Responsabilidade
Renderiza a tela de pedidos com CRUD completo e gerenciamento de itens.

## Comportamento
- Carrega pedidos, clientes, fornecedores, vendedores, categorias e produtos em paralelo.
- Abre modal para criação ou edição de pedido.
- Envia payload para `POST /pedidos`, `PUT /pedidos/:id`, `POST /pedidos/:id/entregue`, `PATCH /pedidos/:id/inativar` e `PATCH /pedidos/:id/reativar`.
- Permite adicionar múltiplos itens de produto ao pedido.
- Calcula valor total por item com base em quantidade e valor unitário.

## Observações
- O formulário aceita campos de pedido em `camelCase` e envia em `snake_case` para o backend.
- Mostra botão de entrega apenas para pedidos não entregues.
- Não há validação de consistência entre itens antes do envio.

## Dependências
- `react`
- `../../services/api`
