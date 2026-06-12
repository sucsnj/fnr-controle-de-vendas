# front/src/components/layout/Sidebar.tsx

## Responsabilidade
Renderiza o menu lateral com navegação entre as páginas do sistema.

## Comportamento
- Define um menu com itens para dashboard, clientes, fornecedores, pedidos, vendedores, categorias, produtos e agenda.
- Usa `useNavigate` e `useLocation` para controle de navegação e destaque do item ativo.
- Permite alternar entre estado colapsado e expandido.
- Exibe ícones usando `react-icons`.

## Observações
- O estilo é aplicado inline e o item ativo recebe borda e cor especial.
- A sidebar é fixa e ocupa o lado esquerdo do layout.
- Itens do menu usam navegação programática.

## Dependências
- `react`
- `react-router-dom`
- `react-icons/fa`
