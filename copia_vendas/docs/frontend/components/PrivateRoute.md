# front/src/components/PrivateRoute/PrivateRoute.tsx

## Responsabilidade
Protege rotas que exigem autenticação.

## Comportamento
- Lê `isAuthenticated` do contexto de autenticação.
- Se o usuário estiver autenticado, renderiza `children`.
- Caso contrário, redireciona para `/` usando `Navigate`.

## Observações
- Funciona apenas quando o contexto de autenticação está disponível no componente pai.
- Não exibe mensagem de erro, apenas faz o redirecionamento.

## Dependências
- `react-router-dom`
- `../../contexts/AuthContext`
