# Documentação Completa do Frontend

## Visão Geral
O frontend é uma aplicação web construída com **React 19**, **TypeScript** e **Vite**. Ela oferece interface de login, cadastro e dashboards para gerenciar clientes, fornecedores, pedidos, produtos, categorias, vendedores e agenda.

## Estrutura do Frontend

### Arquivos principais
- `src/main.tsx`
  - Ponto de entrada do React.
  - Renderiza o componente raiz `App` dentro do elemento `#root`.

- `src/App.tsx`
  - Define o roteamento da aplicação.
  - Exibe `DemoExpirado` se a demo tiver expirado.
  - Usa `AuthProvider` para gerenciar autenticação.
  - Protege as páginas administrativas com `PrivateRoute`.

- `src/contexts/AuthContext.tsx`
  - Define contexto de autenticação global.
  - Gerencia login, logout e estado de autenticado.
  - Sincroniza token com `localStorage`.

- `src/services/api.ts`
  - Configura o cliente Axios.
  - Define `baseURL` padrão ou via `VITE_API_URL`.
  - Intercepta requisições e adiciona token JWT.
  - Intercepta respostas 401 para limpar token e redirecionar ao login.

## Componente de Proteção e Layout

### `PrivateRoute`
- Impede o acesso às rotas internas quando `isAuthenticated` é falso.
- Usa `Navigate` para redirecionar ao login.

### `Layout`
- Contém `Navbar` e `Sidebar`.
- Controla estado de sidebar colapsada.
- Ajusta o conteúdo principal com margens dinâmicas.

### `Navbar`
- Exibe título do sistema, email do usuário e botão de logout.
- Faz logout chamando o contexto de autenticação.

### `Sidebar`
- Mostra menus para as principais páginas do sistema.
- Destaque o item ativo com base na rota atual.
- Permite colapsar a navegação lateral.

### `DemoExpirado`
- Tela de encerramento exibida quando a demo vence.
- Usada em `App.tsx` para bloquear acesso geral.

## Páginas Principais

### `Login`
- Exibe formulário de login.
- Chama `login(email, password)` do contexto.
- Redireciona para `/dashboard` ao autenticar.
- Exibe mensagem de erro em caso de falha.

### `Cadastro`
- Exibe formulário de cadastro de usuário.
- Valida senha mínima de 6 caracteres e confirmação de senha.
- Envia `POST /cadastro` para o backend.
- Redireciona para `Login` após sucesso.

### `Dashboard`
- Exibe cards com contagem de clientes, fornecedores e produtos.
- Calcula gráficos de pedidos por cliente e pedidos por mês.
- Usa `react-chartjs-2` e `Chart.js` para gráficos.

### `Clientes`
- Lista clientes com busca por nome e filtro por inativos.
- Abre modal para criar ou editar clientes.
- Envia solicitações para `GET /clientes`, `POST /clientes`, `PUT /clientes/:id`, `PATCH /clientes/:id/inativar`, `PATCH /clientes/:id/reativar`.

### `Fornecedores`
- Lista fornecedores com filtro por inativos.
- Abre modal para criação/edição.
- Envia chamadas para `/fornecedores`.

### `Produtos`
- Lista produtos com categoria associada.
- Abre modal para criação e edição.
- Envia payloads para `/produtos`.

### `Categorias`
- Lista categorias.
- Modal para criação/edição.
- Envia requisições para `/categorias`.

### `Vendedores`
- Lista vendedores e exibe campo `isAdmin`.
- Modal para criar/editar vendedores.
- Envia requisições para `/vendedores`.

### `Pedidos`
- Lista pedidos com cliente, vendedor, datas e status de entrega.
- Modal para criar/editar pedidos com itens de produto.
- Envia `POST /pedidos`, `PUT /pedidos/:id`, `POST /pedidos/:id/entregue`, `PATCH /pedidos/:id/inativar`, `PATCH /pedidos/:id/reativar`.

### `Agenda`
- Lista agendamentos com cliente, vendedor, observação e status.
- Modal para criação/edição de agendamentos.
- Envia `POST /agenda`, `PUT /agenda/:id`, `POST /agenda/:id/realizado`, `DELETE /agenda/:id`.

## Fluxo de Autenticação

1. Usuário acessa página de login.
2. Submete email e senha.
3. `AuthContext.login` envia requisição para `POST /auth/login`.
4. Token JWT retornado é salvo no `localStorage`.
5. Cabeçalho `Authorization: Bearer <token>` é adicionado automaticamente nas próximas requisições Axios.
6. Se uma resposta 401 ocorrer, o token é removido e a página é redirecionada para `/`.

## Fluxo de Dados

- A maioria das páginas carrega dados via `useEffect` e armazena em `useState`.
- As operações de CRUD atualizam a lista chamando novamente a API.
- O `App` decide entre mostrar a aplicação ou a tela de demo expirada.
- A navegação entre páginas ocorre via `react-router-dom`.

## Detalhes Técnicos

### `api.ts`
- `baseURL` configurável por `VITE_API_URL`.
- Cabeçalho `Content-Type: application/json`.
- Interceptador de requisição injeta token de `localStorage`.
- Interceptador de resposta trata `401` globalmente.

### Estilo e Layout
- Estilos aplicados principalmente em objetos `React.CSSProperties` inline.
- Não há uso de CSS modules ou sistema de design centralizado.
- O layout é consistente entre as páginas CRUD e o dashboard.

## Pontos de Atenção e Melhorias

### Reutilização de Código
- Muitas páginas repetem lógica de tabelas, modais e botões.
- Componentes de formulário e listas poderiam ser extraídos para reduzir duplicação.

### Validação de Formulários
- A validação atual é mínima e feita principalmente no frontend com verificações simples.
- Muitos formulários aceitam valores usando `any` em `useState`.
- Seria recomendada validação adicional antes do envio ao backend.

### Autenticação e Segurança
- O token é armazenado em `localStorage`, o que possui riscos de XSS.
- A detecção de expiração da demo ocorre tanto no frontend quanto no backend.
- Não há uso de refresh token ou verificação de validade do JWT ao carregar a aplicação.

### Experiência do Usuário
- A interface é funcional, mas depende de muitos modais manuais.
- A navegação é simples e direta, com sidebar e página inicial clara.
- Gráficos no dashboard são informativos, mas o backend não fornece métricas específicas por cliente.

## Dependências Principais
- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `chart.js`
- `react-chartjs-2`
- `react-icons`

## Uso
- Instalar dependências com `npm install` em `front/`.
- Iniciar com `npm start`.
- Configurar `VITE_API_URL` quando o backend estiver em outra URL.
