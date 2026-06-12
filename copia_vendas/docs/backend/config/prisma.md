# backend/src/config/prisma.ts

## Responsabilidade
Instancia e exporta o cliente Prisma para acesso ao banco de dados.

## Comportamento
- Cria um objeto `PrismaClient` usando as configurações padrão do Prisma.
- Exporta este objeto como `default` para ser usado em todos os controladores.

## Observações
- Esse módulo mantém uma única instância compartilhada em toda a aplicação.
- Não há manipulação extra de conexão, logs ou tratamento de eventos.

## Dependências
- `@prisma/client`

## Uso
Importe com `import prisma from '../config/prisma'` em controladores e outros módulos que acessam o banco.
