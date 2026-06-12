# front/src/pages/Categorias/Categorias.tsx

## Responsabilidade
Renderiza a tela de categorias e permite criação/edição.

## Comportamento
- Carrega lista de categorias.
- Abre modal para criação ou edição.
- Envia `POST /categorias`, `PUT /categorias/:id`, `PATCH /categorias/:id/inativar` e `PATCH /categorias/:id/reativar`.
- Exibe status ativo/inativo na tabela.

## Observações
- Não há filtro para categorias inativas.
- O formulário é simples e mantém apenas nome e descrição.
- Estilos seguem o padrão das páginas de CRUD.

## Dependências
- `react`
- `../../services/api`
