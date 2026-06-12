# backend/src/app.ts

## Responsabilidade
Este arquivo inicializa o aplicativo Express e monta middlewares e rotas principais.

## Principais funções
- Configura o `cors` para permitir conexões de originários locais específicos.
- Registra `express.json()` e `express.urlencoded()` para processar corpo das requisições.
- Adiciona um middleware de expiração de demonstração que bloqueia todas as requisições após 10/07/2026.
- Exporta rotas de recursos: autenticação, clientes, fornecedores, pedidos, produtos, categorias, vendedores e agenda.
- Implementa rota pública `POST /cadastro` para criação de novos usuários.
- Define rota de health check `GET /`.

## Observações
- A rota de cadastro cria o primeiro usuário como administrador e também categorias padrão.
- O `import('./config/prisma')` e `bcryptjs` são carregados dinamicamente no endpoint de cadastro.
- A lógica de expiração é replicada no frontend e pode ser centralizada.

## Dependências
- `express`
- `cors`
- `dotenv/config`
- `./routes/*`

## Uso
Este módulo é importado por `src/server.ts` para iniciar o servidor.
