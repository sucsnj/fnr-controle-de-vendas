# front/src/pages/Login/Login.tsx

## Responsabilidade
Renderiza a tela de login e autentica o usuário.

## Comportamento
- Mantém estado local para `email`, `password`, `error` e `loading`.
- Chama a função `login` do contexto de autenticação ao submeter o formulário.
- Redireciona para `/dashboard` em caso de sucesso.
- Trata falhas exibindo mensagem de erro.

## Observações
- O formulário não contém validação avançada além de campos obrigatórios.
- Exibe link para a página de cadastro.
- O botão de envio é desabilitado enquanto a requisição está em andamento.

## Dependências
- `react`
- `react-router-dom`
- `../../contexts/AuthContext`
