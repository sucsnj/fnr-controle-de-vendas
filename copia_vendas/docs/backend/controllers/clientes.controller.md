# backend/src/controllers/clientes.controller.ts

## Responsabilidade
Gerencia operações CRUD e status de clientes.

## Exportações
- `getClientes(req, res)`
- `createCliente(req, res)`
- `updateCliente(req, res)`
- `inativarCliente(req, res)`
- `reativarCliente(req, res)`

## Fluxo
- `getClientes`: busca clientes ativos ou inativos com filtros de nome, paginação e ordenação.
- `createCliente`: valida CPF/CNPJ e email antes de criar um cliente.
- `updateCliente`: atualiza cadastro do cliente garantindo unicidade de CPF/CNPJ e email.
- `inativarCliente` / `reativarCliente`: alternam o campo `ativo` do cliente.

## Observações
- Aceita tanto `cpfCnpj` quanto `cpf_cnpj` e campos equivalentes para compatibilidade.
- Não há validação de formato de CPF/CNPJ ou email.
- Não existe soft-delete verdadeiro: o cliente permanece no banco, apenas o campo `ativo` muda.

## Dependências
- `../config/prisma`
- `../middlewares/auth.middleware`
