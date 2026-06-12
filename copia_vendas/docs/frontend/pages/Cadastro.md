# front/src/pages/Cadastro/Cadastro.tsx

## Responsabilidade
Implementa a tela de cadastro de novos usuários.

## Comportamento
- Mantém estado para `nome`, `email`, `senha`, `confirmar`, `erro`, `sucesso` e `loading`.
- Valida se as senhas coincidem e têm pelo menos 6 caracteres.
- Envia `POST /cadastro` para o backend usando `api`.
- Exibe mensagem de sucesso e redireciona para a tela de login.

## Observações
- O cadastro é público e usa o endpoint `/cadastro` no backend.
- Há tratamento de mensagem de erro retornada pelo servidor.
- Não há validação de formato de email além do atributo HTML `type=email`.

## Dependências
- `react`
- `react-router-dom`
- `../../services/api`
