# backend/src/controllers/agenda.controller.ts

## Responsabilidade
Gerencia agendamentos, incluindo criação, edição, conclusão e exclusão.

## Exportações
- `getAgenda(req, res)`
- `createAgendamento(req, res)`
- `updateAgendamento(req, res)`
- `marcarRealizado(req, res)`
- `getProximos(req, res)`
- `deleteAgendamento(req, res)`

## Fluxo
- `getAgenda`: retorna agendamentos com cliente e vendedor inclusos.
- `createAgendamento`: cria novo agendamento e aceita repetição mensal.
- `updateAgendamento`: atualiza dados do agendamento existente.
- `marcarRealizado`: marca como realizado e, se configurado, cria nova ocorrência mensal.
- `getProximos`: lista agendamentos futuros de até uma semana.
- `deleteAgendamento`: remove agendamento do banco.

## Observações
- A repetição mensal cria um novo registro adicionando 30 dias, sem garantias de mês correto.
- Não há verificação de conflito de horários ou duplicidade.
- `deleteAgendamento` usa exclusão física no banco.

## Dependências
- `../config/prisma`
- `../middlewares/auth.middleware`
