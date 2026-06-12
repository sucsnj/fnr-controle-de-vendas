# front/src/pages/Fornecedores/Fornecedores.tsx

## Responsabilidade
Gera a interface de listagem e edição de fornecedores.

## Comportamento
- Carrega fornecedores ativos ou inativos.
- Abre modal de criação/edição para fornecedor.
- Envia `POST /fornecedores`, `PUT /fornecedores/:id`, `PATCH /fornecedores/:id/inativar` e `PATCH /fornecedores/:id/reativar`.
- Controla estado local para o formulário e erros.

## Observações
- O formulário cobre CNPJ, razão social, responsável, telefone, email e endereço.
- Há controle de status inativo com caixa de seleção.
- Estilos são repetidos do componente de clientes.

## Dependências
- `react`
- `../../services/api`
