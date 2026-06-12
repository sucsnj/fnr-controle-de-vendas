# front/src/pages/Vendedores/Vendedores.tsx

## Responsabilidade
Renderiza a interface de gestão de vendedores.

## Comportamento
- Carrega lista de vendedores ativos ou inativos.
- Abre modal para criação ou edição.
- Envia `POST /vendedores`, `PUT /vendedores/:id`, `PATCH /vendedores/:id/inativar` e `PATCH /vendedores/:id/reativar`.
- Exibe informações de nome, email, telefone, descrição e status de administrador.

## Observações
- O campo `isAdmin` é exibido como indicador visual, mas não pode ser alterado pelo usuário.
- A tela usa o mesmo padrão de CRUD das demais páginas.

## Dependências
- `react`
- `../../services/api`
