# front/src/components/layout/Layout.tsx

## Responsabilidade
Define o layout principal das páginas autenticadas.

## Componentes Utilizados
- `Navbar`
- `Sidebar`

## Comportamento
- Controla estado `collapsed` para alternar largura da sidebar.
- Renderiza `Navbar` no topo fixo.
- Renderiza `Sidebar` à esquerda com largura dinâmica.
- Exibe `children` no conteúdo principal com espaçamento e transição de margem.

## Observações
- Estilos são aplicados inline.
- A margem do conteúdo principal depende do estado da sidebar.

## Dependências
- `React`
- `./Navbar`
- `./Sidebar`
