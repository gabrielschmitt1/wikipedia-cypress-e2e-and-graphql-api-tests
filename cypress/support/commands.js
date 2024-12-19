Cypress.Commands.add('graphQLRequest', (query, variables) => {
    const apiUrl = Cypress.env('apiUrl'); // Recupera a URL da API
  
    return cy.request({
      method: 'POST',
      url: apiUrl,  // Usa a URL da API
      body: {
        query: query,
        variables: variables
      }
    });
 });
  