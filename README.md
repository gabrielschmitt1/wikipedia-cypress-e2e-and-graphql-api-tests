# Wikipedia-GraphqlZero-Cypress

Este é um projeto de automação de testes utilizando o framework [Cypress](https://www.cypress.io/). Ele foi projetado para realizar:

- Testes End-to-End (E2E) no site [Wikipedia](https://www.wikipedia.org/).
- Testes GraphQL utilizando a API do [GraphQLZero](https://graphqlzero.almansi.me/).

## Estrutura do Projeto

A estrutura de pastas do projeto está organizada da seguinte maneira:

```
wikipedia-cypress-e2e-and-graphqlzero-api-tests
|-- .github/workflows/          # Arquivos para configuração de pipelines CI/CD
|   |-- cypress-api-tests.yml   # Pipeline para testes GraphQL
|   |-- cypress-e2e-tests.yml   # Pipeline para testes E2E
|   |-- cypress-smoke-tests.yml # Pipeline para Smoke testes
|
|-- cypress/
|   |-- e2e/                    
|   |   |-- graphqlzero/        # Testes para a API GraphQL
|   |   |   |-- graphqlzero.cy.js
|   |   |-- wikipedia/          # Testes para o site Wikipedia
|   |       |-- wikipedia_home.cy.js
|   |       |-- wikipedia_search.cy.js
|   |
|   |-- fixtures/               # Dados fixos para uso nos testes
|   |   |-- post-mutation.json
|   |
|   |-- support/                
|       |-- commands.js         # Comandos customizados do Cypress
|       |-- e2e.js              # Configurações globais dos testes
|
|-- .eslintrc.json              # Configuração do ESLint
|-- .gitignore                  # Arquivos e pastas ignorados pelo Git
|-- cypress.config.js           # Configuração principal do Cypress
|-- LICENSE                     # Licença do projeto
|-- package-lock.json           # Controle de versões das dependências
|-- package.json                # Configuração do npm e dependências
|-- README.md                   # Documentação do projeto
```

## Testes Implementados

### Testes E2E no Wikipedia

Os testes E2E verificam funcionalidades principais do site Wikipedia para garantir que elas estão funcionando conforme o esperado.

- **Arquivo:** `wikipedia_home.cy.js`
  - Testa elementos principais da página inicial do Wikipedia.

- **Arquivo:** `wikipedia_search.cy.js`
  - Testa o recurso de busca do Wikipedia, incluindo validação de resultados.

### Testes GraphQL no GraphQLZero

Os testes GraphQL são feitos para validar a API do GraphQLZero.

- **Arquivo:** `graphqlzero.cy.js`
  - Testa consultas (queries) e mutações da API.
  - Utiliza dados fixos definidos no arquivo `post-mutation.json`.

## Configurações Necessárias

### Requisitos

- Node.js (v18 ou superior)
- npm (v8 ou superior)

### Instalação do Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/gabrielschmitt1/wikipedia-cypress-e2e-and-graphql-api-tests.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd wikipedia-cypress
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

### Executando os Testes

#### Testes E2E

Para executar os testes End-to-End do Wikipedia:
```bash
npm run cy:run:e2e
```

#### Testes principais E2E (smoke)

Para executar os smoke testes do Wikipedia:
```bash
npm run cy:run:e2e:smoke
```

#### Testes GraphQL

Para executar os testes GraphQL do GraphQLZero:
```bash
npm run cy:run:api
```

#### Executar Todos os Testes

Para rodar todos os testes de uma vez:
```bash
npm run cy:run:all
```

### Abrindo o Cypress em Modo Interativo

Para abrir o painel interativo do Cypress:
```bash
npm run cy:open
```

## Integração Contínua (CI)

O projeto possui pipelines configurados no GitHub Actions para executar os testes.

- **Arquivo:** `.github/workflows/cypress-e2e-tests.yml`
  - Definido workflow_dispatch para permitir executar manualmente os testes
  - Executa automaticamente apenas ao subir um push para uma branch de release

- **Arquivo:** `.github/workflows/cypress-smoke-tests.yml`
  - Definido workflow_dispatch para permitir executar manualmente os testes

- **Arquivo:** `.github/workflows/cypress-api-tests.yml`
  - Executa os testes GraphQL do GraphQLZero.

### Plugins e bibliotecas utilizadas

  - @cypress/grep - Para separar e executar os testes através de tags
  - cypress-plugin-xhr-toggle - Para manter requisições xhr não visiveis durante os testes
  - eslint-plugin-cypress - Plugin para manter o padrão de melhores praticas de uso do Cypress.

### Comentários e Possíveis melhorias

  - Foi decidido utilizar a estrutura padrão do Cypress para organizar os testes.
  - Poderia ser implementado um sistema de notificação por (email/slack) com relatorio dos testes e detalhes de testes falhando.
  - Criar uma verificação de Lint automatica, para manter o padrão de indentação do projeto. 

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## Contato

Para mais informações, entre em contato:
- **Nome:** Gabriel Schmitt
- **E-mail:** [gabrielschmitt7@gmail.com](mailto:gabrielschmitt7@gmail.com)

