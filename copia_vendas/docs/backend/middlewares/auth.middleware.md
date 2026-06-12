# backend/src/middlewares/auth.middleware.ts

## Responsabilidade
Valida o token JWT enviado no cabeçalho `Authorization` e adiciona informações do usuário ao objeto de requisição.

## Exportações
- `authMiddleware(req, res, next)`
- `AuthRequest` (interface estendendo `Request` com `userId` e `userEmail`)

## Fluxo
1. Verifica se o cabeçalho `Authorization` existe e começa com `Bearer `.
2. Extrai o token.
3. Tenta verificar o token usando `jwt.verify` e o segredo da variável de ambiente `JWT_SECRET`.
4. Preenche `req.userId` e `req.userEmail` com valores do payload.
5. Chama `next()` em caso de sucesso.
6. Responde com `401` em caso de falha.

## Observações
- Usa fallback `secret` quando `JWT_SECRET` não está definido, o que é uma vulnerabilidade de segurança.
- Não diferencia entre token expirado e token inválido.
- Presume payload com `sub` e `id`.

## Dependências
- `express`
- `jsonwebtoken`
