# front/src/App.tsx

## Responsabilidade
Define as rotas públicas e privadas da aplicação, além do layout principal.

## Componentes Principais
- `AuthProvider` para fornecer estado de autenticação.
- `Router` para gerenciar navegação.
- `PrivateRoute` protege páginas administrativas.
- `Layout` envolve páginas autenticadas com barra de navegação e sidebar.
- `DemoExpirado` exibe uma tela quando a demo expira.

## Rotas
- `/` → `Login`
- `/cadastro` → `Cadastro`
- `/dashboard` → `Dashboard` (privada)
- `/clientes` → `Clientes` (privada)
- `/fornecedores` → `Fornecedores` (privada)
- `/pedidos` → `Pedidos` (privada)
- `/produtos` → `Produtos` (privada)
- `/categorias` → `Categorias` (privada)
- `/vendedores` → `Vendedores` (privada)
- `/agenda` → `Agenda` (privada)
- `*` → redireciona para `/`

## Observações
- Aplica a verificação de expiração localmente antes de montar o app.
- A estratégia de proteção envolve renderizar o componente dentro de `PrivateRoute` e `Layout`.

## Dependências
- `react-router-dom`
- `./contexts/AuthContext`
- `./components/PrivateRoute/PrivateRoute`
- `./components/layout/Layout`
- `./components/DemoExpirado/DemoExpirado`
- Várias páginas do diretório `src/pages`
