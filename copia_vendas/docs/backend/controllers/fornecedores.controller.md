# backend/src/controllers/fornecedores.controller.ts

## Responsabilidade
Gerencia operações CRUD e status de fornecedores.

## Exportações
- `getFornecedores(req, res)`
- `createFornecedor(req, res)`
- `updateFornecedor(req, res)`
- `inativarFornecedor(req, res)`
- `reativarFornecedor(req, res)`

## Fluxo
- `getFornecedores`: busca fornecedores ativos ou inativos com paginação.
- `createFornecedor`: valida unicidade de CNPJ antes de criar.
- `updateFornecedor`: atualiza dados do fornecedor existente.
- `inativarFornecedor` / `reativarFornecedor`: ajustam o campo `ativo`.

## Observações
- Aceita campo `razaoSocial` ou `razao_social` para compatibilidade.
- Não valida o formato do CNPJ.
- Não há verificação de dependências em outros registros ao inativar.

## Dependências
- `../config/prisma`
- `../middlewares/auth.middleware`
