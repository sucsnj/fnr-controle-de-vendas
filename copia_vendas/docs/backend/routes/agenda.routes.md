# backend/src/routes/agenda.routes.ts

## Responsabilidade
Registra endpoints para gerenciamento de agendamentos.

## Comportamento
- Aplica `authMiddleware` a todas as rotas.
- Define:
  - `GET /proximos` → `getProximos`
  - `GET /` → `getAgenda`
  - `POST /` → `createAgendamento`
  - `PUT /:id` → `updateAgendamento`
  - `POST /:id/realizado` → `marcarRealizado`
  - `DELETE /:id` → `deleteAgendamento`

## Observações
- Montada em `/agenda` no aplicativo.
- O endpoint `proximos` retorna agendamentos dentro da próxima semana.

## Dependências
- `express`
- `../middlewares/auth.middleware`
- `../controllers/agenda.controller`
