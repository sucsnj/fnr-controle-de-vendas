# front/src/pages/Clientes/Clientes.tsx

## Responsabilidade
Gera a interface de listagem e edição de clientes.

## Comportamento
- Carrega clientes com filtros de `inativo` e busca por nome.
- Abre modal para criação ou edição de cliente.
- Envia `POST /clientes`, `PUT /clientes/:id`, `PATCH /clientes/:id/inativar` e `PATCH /clientes/:id/reativar`.
- Controla estado do formulário e exibe erros retornados pela API.

## Observações
- O formulário aceita campos como `cpfCnpj`, `iEst` e `iMuni`.
- A lista mostra ações de edição e ativação/desativação.
- Estilos de tabela e modal são definidos em constantes inline.

## Dependências
- `react`
- `../../services/api`
