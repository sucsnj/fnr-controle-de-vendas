# front/src/pages/Agenda/Agenda.tsx

## Responsabilidade
Renderiza a interface de agendamentos e permite criar, editar e concluir registros.

## Comportamento
- Carrega agenda, clientes e vendedores.
- Abre modal de criação/edição de agendamento.
- Envia `POST /agenda`, `PUT /agenda/:id`, `POST /agenda/:id/realizado` e `DELETE /agenda/:id`.
- Permite marcar agendamento como realizado e excluir registros.

## Observações
- O campo de data usa `datetime-local`.
- A opção de repetir mensalmente é persistida e usada no backend para criar novo agendamento.
- A exclusão pergunta ao usuário com `confirm`.

## Dependências
- `react`
- `../../services/api`
