# backend/src/controllers/auth.controller.ts

## Responsabilidade
Implementa a lógica de login da aplicação.

## Exportações
- `login(req, res)`

## Fluxo
1. Recebe `username` e `password` no corpo da requisição.
2. Busca o usuário por email no banco (`prisma.usuario.findUnique`).
3. Compara a senha enviada com o hash armazenado usando `bcrypt.compare`.
4. Valida se o usuário está ativo.
5. Gera token JWT com os campos `sub` e `id`.
6. Retorna `access_token` e `token_type`.

## Observações
- O login aceita `username` como nome do campo, alinhando-se ao formato `x-www-form-urlencoded` esperado pelo frontend.
- Não há verificação de vários fatores ou políticas de bloqueio.
- O token expira em 30 minutos por padrão, mas o valor pode ser configurado via `JWT_EXPIRES_IN`.

## Dependências
- `bcryptjs`
- `jsonwebtoken`
- `../config/prisma`
