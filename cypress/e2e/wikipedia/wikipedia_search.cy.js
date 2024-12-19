describe('Wikipedia - Testes de Pesquisa', () => {
  beforeEach(() => {
    cy.visit('/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal');
  });

  // Cenários de Pesquisa Básicos
  context('Pesquisas Básicas', () => {
    it('CT001 - Deve realizar pesquisa básica com sucesso', () => {
      // Intercepta a API de busca
      cy.intercept('GET', '**/rest.php/v1/search/title**').as('request')
      // Pesquisa de termo simples
      cy.get('#searchInput')
        .type('gabriel')

      cy.contains('button', 'Pesquisar').click()
      // Aguarda que a API responda
      cy.wait('@request', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
      // Verificações de resultados
      cy.url().should('include', 'Gabriel')
      cy.get('#firstHeading').should('contain', 'Gabriel')
    })

    it('CT002 - Deve buscar por país (Brasil) com sucesso', { tags: ['smoke'] }, () => {
      // Intercepta a API de busca
      cy.intercept('GET', '**/rest.php/v1/search/title**').as('request')
      cy.get('#searchInput').as('buscaBrasil')
      cy.get('@buscaBrasil').type('Brasil')
      cy.contains('button', 'Pesquisar').click()
      // Aguarda que a API responda
      cy.wait('@request').its('response.statusCode').should('eq', 200)
      // Verificações de resultados
      cy.url().should('include', 'Brasil')
      cy.get('#firstHeading').should('contain', 'Brasil')
    });

    it('CT003 - Deve validar o conteudo dos menus ao pesquisar por (Brasil)', { tags: ['smoke'] }, () => {
      cy.visit('/wiki/Brasil')
      // Lista de IDs e textos esperados
      const menuItems = [
        { id: '#toc-mw-content-text', text: 'Início' },
        { id: '#toc-Etimologia', text: 'Etimologia' },
        { id: '#toc-História', text: 'História' },
        { id: '#toc-Geografia', text: 'Geografia' },
        { id: '#toc-Demografia', text: 'Demografia' },
        { id: '#toc-Governo_e_política', text: 'Governo e política' },
        { id: '#toc-Subdivisões', text: 'Subdivisões' },
        { id: '#toc-Economia', text: 'Economia' },
        { id: '#toc-Infraestrutura', text: 'Infraestrutura' },
        { id: '#toc-Cultura', text: 'Cultura' },
        { id: '#toc-Ver_também', text: 'Ver também' },
        { id: '#toc-Notas_e_referências', text: 'Notas e referências' },
        { id: '#toc-Ligações_externas', text: 'Ligações externas' },
      ];
      // Validação da seção principal e de colaboração
      // Itera sobre a lista e aplica as asserções
      menuItems.forEach(item => {
        cy.get(item.id)
          .scrollIntoView()
          .should('contain.text', item.text)
          .and('be.visible');
      });
      // Validando clique e conteudo de submenus
      cy.get('#toc-Economia').click()

      const subMenuItems = [
        { id: '#toc-Turismo', text: 'Turismo' },
      ]

      subMenuItems.forEach(item => {
        cy.get(item.id)
          .scrollIntoView()
          .should('contain.text', item.text)
          .and('be.visible');
      });
    });

    it('CT004 - Deve validar visibilidade das imagens da bandeira e do brasão', () => {
      cy.visit('/wiki/Brasil')
      // Bandeira do brasil
      cy.get('a[title="Bandeira do Brasil"] img')
        .should('have.attr', 'alt', 'Bandeira do Brasil') // Verifica o atributo alt
        .and('have.attr', 'src') // Verifica o atributo src
        .and('include', 'Flag_of_Brazil.svg'); // Verifica se o src contém o nome do arquivo
      // Brasão de armas
      cy.get('a[title="Armas Nacionais"] img')
        .should('have.attr', 'alt', 'Armas Nacionais')
        .and('have.attr', 'src')
        .and('include', 'Coat_of_arms_of_Brazil.svg');

    });

    it('CT005 - Deve validar o lema do Brasil', () => {
      cy.visit('/wiki/Brasil')
      cy.get('th:contains("Lema:") a')
        .should('have.attr', 'href', '/wiki/Ordem_e_Progresso') // Valida o link do lema
        .and('contain.text', 'Ordem e Progresso'); // Valida o texto do lema
    });

    it('CT006 - Deve validar o hino nacional', () => {
      cy.visit('/wiki/Brasil')
      cy.get('th:contains("Hino:") i a')
        .should('have.attr', 'href', '/wiki/Hino_Nacional_Brasileiro') // Valida o link para o hino
        .and('contain.text', 'Hino Nacional Brasileiro'); // Valida o texto do hino

      cy.get('audio[data-mwtitle="Hino-Nacional-Brasil-instrumental-mec.ogg"]')
        .should('exist'); // Verifica se o áudio do hino está presente
    });

    it('CT007 - Deve validar a capital do Brasil', () => {
      cy.visit('/wiki/Brasil')
      cy.get('td:contains("Capital") + td a')
        .should('have.attr', 'href', '/wiki/Bras%C3%ADlia') // Valida o link para Brasília
        .and('contain.text', 'Brasília'); // Valida o texto da capital

      cy.get('td:contains("Capital") + td')
        .should('contain.text', "15°47'56\"S 47°52'00\"O"); // Valida as coordenadas da capital
    });

    it('CT008 - Deve validar a maior cidade do Brasil', () => {
      cy.visit('/wiki/Brasil')
      cy.get('td:contains("Maior cidade") + td a')
        .should('have.attr', 'href', '/wiki/S%C3%A3o_Paulo') // Valida o link para São Paulo
        .and('contain.text', 'São Paulo'); // Valida o texto da maior cidade
    });

  })

  // Cenários de Pesquisa Avançados
  context('Pesquisas Avançadas', () => {
    it('CT009 - Deve realizar pesquisa com caracteres especiais', () => {
      const termosPesquisa = [
        'São Paulo',
        '!',
        '123'
      ]

      termosPesquisa.forEach((termo) => {
        // Interceptando requisições de pesquisa
        cy.intercept('GET', '**/rest.php/v1/search/title**').as('searchRequest')
        cy.wrap(termo).then((termoAtual) => {
          // Visitando a pagina novamente para garantir um estado limpo
          cy.visit('/', { timeout: 10000 })
          cy.get('#searchInput')
            .type(termoAtual)
          cy.contains('button', 'Pesquisar').click()
          // Aguardando a requisição terminar e validando a resposta
          cy.wait('@searchRequest', { timeout: 10000 })
            .its('response.statusCode')
            .should('eq', 200)
          // Verificando resultados
          cy.get('#firstHeading').should('be.visible')
        })
      })
    })

    it('CT010 - Deve testar pesquisas sem resultados', () => {
      const termoSemResultado = 'asdfghjklcpoiuytrewq'
      cy.intercept('GET', `https://pt.wikipedia.org/w/rest.php/v1/search/title?q=${termoSemResultado}&limit=10`).as('noResults')
      cy.get('#searchInput')
        .type(termoSemResultado)
      cy.contains('button', 'Pesquisar').click()
      cy.wait('@noResults', { timeout: 10000 })
      // Verificar mensagem de nenhum resultado
      cy.get('.mw-search-nonefound')
        .should('be.visible')
        .and('contain', 'A pesquisa não produziu resultados.')
    })
  })

  // Cenários de Navegação e Interação
  context('Navegação e Interação', () => {
    it('CT011 - Deve navegar entre resultados de pesquisa', { tags: ['smoke'] }, () => {
      cy.get('input[name="search"][aria-label="Pesquisar na Wikipédia"]')
        .type('Argentina')
      cy.get('input[name="search"][aria-label="Pesquisar na Wikipédia"]')
        // Testando o click no enter para obter resultados
        .type('{enter}')

      // Verificar links de resultados
      cy.get('.mw-page-title-main')
        .should('be.visible')
        .and('have.text', 'Argentina')
      // Verificar que a página de destino carregou
      cy.get('#firstHeading').should('be.visible')
    })

    it('CT012 - Deve testar sugestões de pesquisa', () => {
      cy.get('input[name="search"][aria-label="Pesquisar na Wikipédia"]')
        .type('Argen')

      // Verificar dropdown de sugestões
      cy.get('.cdx-search-result-title bdi').first()
        .then(($bdi) => {
          const texto = $bdi.text()
          expect(texto).to.equal('Argentina')
        })
      // Selecionar primeira sugestão
      cy.get('.cdx-search-result-title__match')
        .first()
        .click()

      // Verificar links de resultados
      cy.get('.mw-page-title-main')
        .should('be.visible')
        .and('have.text', 'Argentina')
      // Verificar que a página de destino carregou
      cy.get('#firstHeading').should('be.visible')
    })
  })

  // Cenários de Desempenho e Acessibilidade
  context('Desempenho e Acessibilidade', () => {
    it('CT013 - Deve verificar tempo de carregamento da página', { tags: ['smoke'] }, () => {
      cy.get('#searchInput').as('timingSearch')
      cy.get('@timingSearch').type('Computação')
      cy.contains('button', 'Pesquisar').click()

      // Verificar tempo de carregamento
      cy.window().then((win) => {
        const navigation = win.performance.getEntriesByType('navigation')[0]
        const loadTime = navigation.duration
        expect(loadTime).to.be.lessThan(5000) // Menos de 5 segundos
      })
    })

    it('CT014 - Deve verificar acessibilidade básica', { tags: ['smoke'] }, () => {
      // Verificações simples de acessibilidade
      cy.get('#searchInput')
        .should('have.attr', 'aria-label')
        .and('not.be.empty')
    })
  })
})