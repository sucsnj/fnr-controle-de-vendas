# front/src/services/api.ts

## Responsabilidade
Configura uma instância Axios para comunicação com o backend.

## Comportamento
- Cria `api` com `baseURL` baseado em `VITE_API_URL` ou `http://localhost:3333`.
- Define cabeçalho padrão `Content-Type: application/json`.
- Intercepta requisições para injetar token do `localStorage` no cabeçalho `Authorization`.
- Intercepta respostas para capturar o status `401` e forçar logout redirecionando para `/`.

## Observações
- Usa `localStorage` para persistir o token.
- O redirecionamento para a página inicial ocorre diretamente dentro do interceptor de resposta.
- Não há tratamento de refresh token.

## Dependências
- `axios`
