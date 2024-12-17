describe('Wikipedia - Página Principal', () => {
  beforeEach(() => {
    cy.visit('/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal');
  });

  context('Validação de elementos da barra de navegação', () => {
    it('CT001 - Validações do logotipo', () => {
      // Verificar a existência do logotipo
      cy.get('a.mw-logo')
        .should('exist')
        .and('have.attr', 'href', '/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal')
        .within(() => {
          // Validação do ícone da logo
          cy.get('.mw-logo-icon')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'src', '/static/images/icons/wikipedia.png')
            .and('have.attr', 'height', '50')
            .and('have.attr', 'width', '50')
            .and('have.attr', 'alt', '');
  
          // Validação do container da logo
          cy.get('.mw-logo-container')
            .should('exist')
            .and('have.class', 'skin-invert')
            .within(() => {
              // Validação do texto principal
              cy.get('.mw-logo-wordmark')
                .should('exist')
                .and('be.visible')
                .and('have.attr', 'alt', 'Wikipédia')
                .and('have.attr', 'src', '/static/images/mobile/copyright/wikipedia-wordmark-fr.svg');
  
              // Validação da tagline
              cy.get('.mw-logo-tagline')
                .should('exist')
                .and('be.visible')
                .and('have.attr', 'src', '/static/images/mobile/copyright/wikipedia-tagline-pt.svg')
                .and('have.attr', 'width', '120')
                .and('have.attr', 'height', '13');
            });
        });
  
      // Teste de navegação ao clicar na logo
      cy.get('a.mw-logo').click();
      cy.url().should('include', '/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal');
    });

    it('CT002 - Validações do formulário de pesquisa', () => {
      // Validação do formulário de pesquisa
      cy.get('form#searchform')
        .should('exist')
        .and('have.class', 'cdx-search-input')
        .and('have.attr', 'action', '/w/index.php')

      // Validação do input de pesquisa
      cy.get('.cdx-text-input__input')
        .should('exist')
        .and('be.visible')
        .and('have.attr', 'placeholder', 'Pesquisar na Wikipédia')
        .and('have.attr', 'aria-label', 'Pesquisar na Wikipédia')
        .and('have.attr', 'name', 'search')
        .and('have.attr', 'accesskey', 'f')
        .and('have.attr', 'autocomplete', 'off')
        
      // Validação do botão de pesquisa
      cy.get('button.cdx-search-input__end-button')
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Pesquisar');
      
      // Validação dos campos hidden
      cy.get('input[type="hidden"][name="title"]')
        .should('exist')
        .and('have.attr', 'value', 'Especial:Pesquisar');
    });

    it('CT003 - Validações dos links da barra de navegação', () => {
      cy.get('#p-vector-user-menu-overflow')
        .should('exist')
        .and('have.class', 'vector-menu mw-portlet')
        .within(() => {
          // Validações do link de donativos
          cy.get('#pt-sitesupport-2')
            .should('exist')
            .and('have.text', 'Donativos\n')
          cy.get('li#pt-sitesupport-2 a')
            .invoke('attr', 'href')
            .then((href) => {
              // Criação de regex para verificar se o link começa com a URL do site de donativos
              const regex = /^https:\/\/donate\.wikimedia\.org/; 
              expect(href).to.match(regex);
            });
          // Validação do link de Criar Conta
          cy.get('#pt-createaccount-2')
            .should('exist')
            .and('have.text', 'Criar uma conta\n')
          cy.get('li#pt-createaccount-2 a')
            .invoke('attr', 'href')
            .then((href) => {
                const expectedLink = "/w/index.php?title=Especial:Criar_conta&returnto=Wikip%C3%A9dia%3AP%C3%A1gina+principal";
                expect(href).to.equal(expectedLink);
            });

          // Validação do link de Entrar na conta
          cy.get('#pt-login-2')
            .should('exist')
            .and('have.text', 'Entrar\n')
          cy.get('li#pt-login-2 a')
            .invoke('attr', 'href')
            .then((href) => {
                const expectedLink = "/w/index.php?title=Especial:Entrar&returnto=Wikip%C3%A9dia%3AP%C3%A1gina+principal";
                expect(href).to.equal(expectedLink);
            });
        });
      // Validação do input com links para Contribuições e Discussão
      cy.get('#vector-user-links-dropdown')
        .should('have.attr', 'title', 'Mais opções')
        .within(() => { 
          cy.get('#vector-user-links-dropdown-checkbox')
            .should('have.attr', 'type', 'checkbox') // Verifica se o tipo do input é "checkbox"
            .should('have.attr', 'role', 'button') // Verifica se o atributo "role" é "button"
            .should('have.class', 'vector-dropdown-checkbox') // Verifica se a classe está presente
            .should('have.attr', 'aria-label', 'Ferramentas pessoais') // Verifica o valor do atributo "aria-label"
        })
      // Verificar dropdown expandido
      cy.get('#vector-user-links-dropdown-checkbox')
        .click()
        .should('have.attr', 'aria-expanded', 'true', {timeout: 10000}) // Verifica se o atributo "aria-expanded" está presente
      
      // Validação do link Contribuições
      cy.get('#p-user-menu-anon-editor ul li a')
        .first()
        .should('have.text', 'Contribuições')
        .and('have.attr', 'href', '/wiki/Especial:Minhas_contribui%C3%A7%C3%B5es');  
      // Validação do link Discussão
      cy.get('#p-user-menu-anon-editor ul li a')
        .last()
        .should('have.text', 'Discussão')
        .and('have.attr', 'href', '/wiki/Especial:Minha_discuss%C3%A3o');

      // validação do link Saber mais
      cy.get('.vector-menu-heading')
        .should('contain', 'Páginas para editores sem sessão iniciada')
        .find('a')
          .should('have.attr', 'href', '/wiki/Ajuda:Introduction')
    });
  });
});