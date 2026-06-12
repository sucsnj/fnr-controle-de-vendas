# front/src/pages/Produtos/Produtos.tsx

## Responsabilidade
Renderiza a interface de gestão de produtos.

## Comportamento
- Carrega produtos e categorias.
- Abre modal para criação ou edição de produto.
- Envia `POST /produtos`, `PUT /produtos/:id`, `PATCH /produtos/:id/inativar` e `PATCH /produtos/:id/reativar`.
- Mostra tabela com tipo, quantidade, valor unitário, valor total, unidade de medida e categoria.

## Observações
- Usa categorias para criar e editar produtos.
- Não valida se a categoria selecionada é obrigatória para edição.
- O valor total é tratado como campo explícito no formulário.

## Dependências
- `react`
- `../../services/api`
