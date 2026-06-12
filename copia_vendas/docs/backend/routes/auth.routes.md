# backend/src/routes/auth.routes.ts

## Responsabilidade
Define as rotas de autenticação.

## Comportamento
- Cria um `Router` do Express.
- Registra apenas a rota `POST /login`, que delega para `login` em `auth.controller`.
- Exporta o router para uso em `app.ts`.

## Observações
- A rota não utiliza middleware de autenticação, pois é o ponto de emissão do token.
- O corpo esperado é `username` e `password` no formato `x-www-form-urlencoded`.

## Dependências
- `express`
- `../controllers/auth.controller`
