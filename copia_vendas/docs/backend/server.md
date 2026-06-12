# backend/src/server.ts

## Responsabilidade
Responsável por iniciar o servidor HTTP na porta configurada.

## Comportamento
- Carrega variáveis de ambiente com `dotenv/config`.
- Importa o aplicativo Express definido em `src/app.ts`.
- Lê a variável `PORT` do ambiente ou usa `3333` como padrão.
- Usa `app.listen()` para subir o servidor e exibir mensagem de inicialização.

## Observações
- Não contém lógica de aplicação além da inicialização do servidor.
- O arquivo é usado diretamente pelos scripts `npm start` e `npm run dev`.

## Dependências
- `express` (indiretamente via `app`)
- `dotenv/config`
