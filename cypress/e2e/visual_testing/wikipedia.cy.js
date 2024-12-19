describe('Teste de Regressão Visual - Wikipedia', () => {
    beforeEach(() => {
        // Força um tamanho específico de viewport
        cy.viewport(1200, 780);
        // Espera a página carregar completamente
        cy.visit('/wiki/Ajuda:P%C3%A1gina_principal');
        // Espera elementos cruciais estarem visíveis
        cy.get('#bodyContent').should('be.visible');
        cy.get('.vector-menu-content-list').should('be.visible');
        // Espera adicional para garantir que todo conteúdo dinâmico carregou
        cy.wait(1000);
    });

    it('CT001 - Deve validar o conteudo da página de ajuda', () => {
        cy.get('#bodyContent').matchImageSnapshot('pagina-ajuda-conteudo', {
            failureThreshold: 0.03,
            failureThresholdType: 'percent',
            customDiffConfig: { threshold: 0.3 }
        });
    });
});