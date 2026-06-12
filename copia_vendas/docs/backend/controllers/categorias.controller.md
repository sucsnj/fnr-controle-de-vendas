# backend/src/controllers/categorias.controller.ts

## Responsabilidade
Gerencia operações CRUD e status de categorias de produtos.

## Exportações
- `getCategorias(req, res)`
- `createCategoria(req, res)`
- `updateCategoria(req, res)`
- `inativarCategoria(req, res)`
- `reativarCategoria(req, res)`

## Fluxo
- `getCategorias`: busca categorias ativas ou inativas, ordenadas por nome.
- `createCategoria`: valida se o nome já existe antes de inserir.
- `updateCategoria`: atualiza nome, descrição e status.
- `inativarCategoria` / `reativarCategoria`: alteram o campo `ativo`.

## Observações
- Não há validação de conteúdo ou tamanho do nome/descrição.
- Atualizações não protegem contra duplicação de nomes no `update` além do banco.

## Dependências
- `../config/prisma`
- `../middlewares/auth.middleware`
