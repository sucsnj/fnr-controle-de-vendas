# front/src/components/DemoExpirado/DemoExpirado.tsx

## Responsabilidade
Exibe uma tela informando que a versão de demonstração expirou.

## Comportamento
- Renderiza um card centralizado com ícone e mensagem de expiração.
- Informa a data de expiração `10/07/2026`.
- Convida o usuário a entrar em contato com o desenvolvedor para continuar usando.

## Observações
- É usado diretamente em `App.tsx` quando a data atual excede a data de expiração.
- Não há interação além da tela informativa.

## Dependências
- `react`
