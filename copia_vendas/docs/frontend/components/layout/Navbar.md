# front/src/components/layout/Navbar.tsx

## Responsabilidade
Renderiza a barra de navegação superior com o nome do sistema e botão de logout.

## Comportamento
- Mostra título fixo `📦 Controle de Vendas`.
- Exibe email do usuário quando presente.
- Provê botão de logout que chama `logout()` e navega para `/`.

## Observações
- O layout é fixo no topo e usa estilos inline.
- O usuário é lido do contexto de autenticação.

## Dependências
- `react`
- `react-router-dom`
- `../../contexts/AuthContext`
