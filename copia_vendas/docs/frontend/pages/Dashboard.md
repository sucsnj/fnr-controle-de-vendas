# front/src/pages/Dashboard/Dashboard.tsx

## Responsabilidade
Exibe indicadores e gráficos de resumo do sistema.

## Comportamento
- Carrega contagens de clientes, fornecedores, produtos e pedidos.
- Calcula pedidos por cliente e pedidos por mês a partir da lista de pedidos.
- Renderiza cards de resumo e gráficos de barras usando `react-chartjs-2`.

## Observações
- Usa `Chart.js` via `chart.js/auto`.
- Não há paginação ou filtros no painel de dados.
- As métricas são calculadas localmente a partir dos dados retornados do backend.

## Dependências
- `react`
- `react-chartjs-2`
- `chart.js`
- `../../services/api`
