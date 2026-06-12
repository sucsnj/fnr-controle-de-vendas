# front/src/contexts/AuthContext.tsx

## Responsabilidade
Gerencia o estado global de autenticação e expõe métodos de login/logout.

## Exportações
- `AuthProvider`
- `useAuth`

## Estado
- `isAuthenticated`: booleano que indica se o usuário está autenticado.
- `user`: objeto com `email` ou `null`.

## Funções
- `login(email, password)`: faz requisição para `POST /auth/login`, armazena o token e configura o cabeçalho `Authorization`.
- `logout()`: remove token e dados do usuário do `localStorage`.

## Fluxo
1. No carregamento, tenta ler `access_token` do `localStorage`.
2. Se existir, define o cabeçalho padrão do `api` e marca o usuário como autenticado.
3. Em caso de login, armazena token e email, e atualiza o contexto.
4. Em logout, limpa o estado e o `localStorage`.

## Observações
- Utiliza `URLSearchParams` para enviar credenciais ao backend.
- Não há verificação de validade do token ao inicializar, apenas presença no `localStorage`.

## Dependências
- `react`
- `../services/api`
