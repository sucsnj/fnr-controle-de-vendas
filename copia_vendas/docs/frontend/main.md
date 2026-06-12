# front/src/main.tsx

## Responsabilidade
Ponto de entrada do aplicativo React.

## Comportamento
- Importa React e ReactDOM.
- Importa o componente `App` e o estilo global.
- Renderiza `App` dentro do elemento `#root` do HTML.
- Envolve `App` em `React.StrictMode`.

## Observações
- Não contém lógica de roteamento ou autenticação.
- Configura o inicializador da árvore React.

## Dependências
- `react`
- `react-dom`
- `./App`
- `./styles/global.css`
