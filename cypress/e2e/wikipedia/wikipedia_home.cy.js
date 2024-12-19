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
      cy.get('#p-user-menu-anon-editor')
        .should('be.visible') // Verifica se dropdown está visivel

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

  context('Validação do menu principal de navegação lateral', { tags: ['menu', 'smoke'] }, () => {

    beforeEach(() => {
      cy.get('#vector-main-menu-dropdown-checkbox')
        .click()
    });

    it('CT004 - Verificar se o menu principal está visível ao carregar a página inicial', () => {
      cy.get('#vector-main-menu')
        .should('be.visible')
    });

    it('CT005 - Validar opção de manter menu fixo na barra lateral', () => {
      // Selecionando o botão usando o atributo de teste data-event-name
      cy.get('[data-event-name="pinnable-header.vector-main-menu.pin"]')
        .should('contain.text', 'mover para a barra lateral')
        .and('be.visible')
        .click();
      cy.get('[data-event-name="pinnable-header.vector-main-menu.unpin"]')
        .should('contain.text', 'ocultar')
        .and('be.visible');
    });

    it('CT006 - Validar itens do menu principal com opções visiveis', () => {
      // Lista de IDs e textos esperados
      const menuItems = [
        { id: '#n-mainpage-description', text: 'Página principal' },
        { id: '#n-featuredcontent', text: 'Conteúdo destacado' },
        { id: '#n-currentevents', text: 'Eventos atuais' },
        { id: '#n-villagepump', text: 'Esplanada' },
        { id: '#n-randompage', text: 'Página aleatória' },
        { id: '#n-portals', text: 'Portais' },
        { id: '#n-bug_in_article', text: 'Informar um erro' },
        { id: '#n-welcome', text: 'Boas-vindas' },
        { id: '#n-help', text: 'Ajuda' },
        { id: '#n-Páginas-de-testes-públicas', text: 'Páginas de testes públicas' },
        { id: '#n-portal', text: 'Portal comunitário' },
        { id: '#n-recentchanges', text: 'Mudanças recentes' },
        { id: '#n-maintenance', text: 'Manutenção' },
        { id: '#n-createpage', text: 'Criar página' },
        { id: '#n-newpages-description', text: 'Páginas novas' },
        { id: '#n-contact-description', text: 'Contato' },
      ];
      // Validação da seção principal e de colaboração
      // Itera sobre a lista e aplica as asserções
      menuItems.forEach(item => {
        cy.get(item.id)
          .scrollIntoView()
          .should('contain.text', item.text)
          .and('be.visible');
      });
    });


  });

  context('Validação do menu ferramentas', () => {

    beforeEach(() => {
      cy.get('#vector-page-tools-dropdown-checkbox')
        .click()
    });

    it('CT007 - Verificar se o menu ferramentas está visível ao carregar a página inicial', () => {
      cy.get('#vector-page-tools')
        .should('be.visible')
    });

    it('CT008 - Validar opção de manter menu ferramentas fixo na barra lateral', () => {
      // Selecionando o botão usando o atributo de teste data-event-name
      cy.get('[data-event-name="pinnable-header.vector-page-tools.pin"]')
        .should('contain.text', 'mover para a barra lateral')
        .and('be.visible')
        .click();
      cy.get('[data-event-name="pinnable-header.vector-page-tools.unpin"]')
        .should('contain.text', 'ocultar')
        .and('be.visible');
    });

    it('CT009 - Validar itens do menu ferramentas com opções visiveis', () => {
      // Lista de IDs e textos esperados
      const menuItems = [
        { id: '#t-whatlinkshere', text: 'Páginas afluentes' },
        { id: '#t-recentchangeslinked', text: 'Alterações relacionadas' },
        { id: '#t-upload', text: 'Carregar ficheiro' },
        { id: '#t-specialpages', text: 'Páginas especiais' },
        { id: '#t-permalink', text: 'Hiperligação permanente' },
        { id: '#t-info', text: 'Informações da página' },
        { id: '#t-urlshortener', text: 'Obter URL encurtado' },
        { id: '#t-urlshortener-qrcode', text: 'Descarregar código QR' },
        { id: '#wbc-editpage', text: 'Editar hiperligações interlínguas' },
        { id: '#coll-create_a_book', text: 'Criar um livro' },
        { id: '#coll-download-as-rl', text: 'Descarregar como PDF' },
        { id: '#t-print', text: 'Versão para impressão' },
        { id: '.wb-otherproject-commons', text: 'Wikimedia Commons' },
        { id: '.wb-otherproject-foundation', text: 'Fundação Wikimedia' },
        { id: '.wb-otherproject-mediawiki', text: 'MediaWiki' },
        { id: '.wb-otherproject-meta', text: 'Meta-Wiki' },
        { id: '.wb-otherproject-outreach', text: 'Divulgação da Wikimedia' },
        { id: '.wb-otherproject-sources', text: 'Wikisource multilingue' },
        { id: '.wb-otherproject-species', text: 'Wikispecies' },
        { id: '.wb-otherproject-wikibooks', text: 'Wikilivros' },
        { id: '.wb-otherproject-wikidata', text: 'Wikidata' },
        { id: '.wb-otherproject-wikifunctions', text: 'Wikifunctions' },
        { id: '.wb-otherproject-wikimania', text: 'Wikimania' },
        { id: '.wb-otherproject-wikinews', text: 'Wikinotícias' },
        { id: '.wb-otherproject-wikiquote', text: 'Wikiquote' },
        { id: '.wb-otherproject-wikisource', text: 'Wikisource' },
        { id: '.wb-otherproject-wikiversity', text: 'Wikiversidade' },
        { id: '.wb-otherproject-wikivoyage', text: 'Wikivoyage' },
        { id: '.wb-otherproject-wiktionary', text: 'Wikcionário' },
        { id: '#t-wikibase', text: 'Elemento Wikidata' }
      ];
      // Validação da seção Geral e de colaboração
      // Itera sobre a lista e aplica as asserções
      menuItems.forEach(item => {
        cy.get(item.id)
          .scrollIntoView() // Garante que o elemento está visivel na tela
          .should('contain.text', item.text)
          .and('be.visible');
      });
    });


  });

  context('Validação dos textos de apresentação na pagina principal', () => {
    it('CT010 - Validação do texto de boas vindas na inicial de apresentação', () => {
      // Valida o texto no <span>
      cy.get('.hp-welkom-1')
        .should('contain.text', 'Boas-vindas')
        .within(() => {
          // Valida o link no <a>
          cy.get('a[href="/wiki/Wikip%C3%A9dia:Boas-vindas"]')
            .should('exist')
            .and('contain.text', 'Boas-vindas')
            .and('have.attr', 'title', 'Wikipédia:Boas-vindas');
        });

      cy.get('.hp-welkom-2')
        .should('contain.text', 'a enciclopédia livre que todos podem editar')
        .within(() => {
          cy.get('a[href="/wiki/Enciclop%C3%A9dia"]')
            .should('exist')
            .and('have.attr', 'title', 'Enciclopédia');
          cy.get('a[href="/wiki/Conte%C3%BAdo_livre"]')
            .should('exist')
            .and('have.attr', 'title', 'Conteúdo livre');
          cy.get('a[href="/wiki/Ajuda:Tutorial/Edi%C3%A7%C3%A3o"')
            .should('exist')
            .and('have.attr', 'title', 'Ajuda:Tutorial/Edição');
        })

      cy.get('a[href="/wiki/Wikip%C3%A9dia"]')
        .should('exist')
        .and('contain.text', 'Wikipédia')
        .and('have.attr', 'title', 'Wikipédia')

    });

    it('CT011 - Validação dos links da seção de boas vindas', () => {
      const links = [
        { href: '/wiki/Ajuda:P%C3%A1gina_principal', text: 'Ajuda' },
        { href: '/wiki/Wikip%C3%A9dia:Navegue', text: 'Índice' },
        { href: '/wiki/Ajuda:Perguntas_frequentes', text: 'Perguntas' },
        { href: '/wiki/Wikip%C3%A9dia:Pol%C3%ADticas_e_recomenda%C3%A7%C3%B5es', text: 'Políticas' },
        { href: '/wiki/Portal:%C3%8Dndice', text: 'Portais' },
      ];

      links.forEach(link => {
        cy.get(`a[href="${link.href}"]`)
          .should('contain.text', link.text);
      });
    });
  });

  context('Validação da tabela de disciplinas da wikipédia', () => {
    it('CT012 - Validação da listagem das disciplinas', () => {
      const tableLinks = [
        { href: '/wiki/Portal:Arte', text: 'Arte' },
        { href: '/wiki/Portal:Biografias', text: 'Biografias' },
        { href: '/wiki/Portal:Ci%C3%AAncia', text: 'Ciência' },
        { href: '/wiki/Portal:Filosofia', text: 'Filosofia' },
        { href: '/wiki/Portal:Geografia', text: 'Geografia' },
        { href: '/wiki/Portal:Hist%C3%B3ria', text: 'História' },
        { href: '/wiki/Portal:Matem%C3%A1tica', text: 'Matemática' },
        { href: '/wiki/Portal:Sociedade', text: 'Sociedade' },
        { href: '/wiki/Portal:Tecnologia', text: 'Tecnologia' },
      ];

      // Seleciona a tabela
      cy.get('table.hp-portalen').should('be.visible').within(() => {
        // Para cada link dentro da tabela, verifica se o link está no elemento correto
        tableLinks.forEach(link => {
          cy.get(`a[href="${link.href}"]`)
            .should('contain.text', link.text) // Verifica o texto do link
            .should('be.visible') // Verifica se o link é visível
            .parents('td') // Verifica se o link está dentro de um <td>
            .closest('tr') // Verifica se o <td> está dentro de uma <tr>
            .closest('table.hp-portalen') // Verifica se o <tr> está dentro da tabela
            .should('exist'); // Confirma que o link está dentro da tabela
        });
      });
    });
  });

  context('Validação das seções principais da pagina', () => {
    it('CT013 - Validação da Seção Artigo em Destaque e Eventos Atuais', () => {
      cy.get('.main-page-responsive-columns.main-page-first-row').should('exist').within(() => {
        cy.contains('Artigo em destaque'); // Verifica a presença do título
        cy.contains('Eventos atuais');
        cy.get('img.mw-file-element')
          .should('be.visible'); // Verifica se a imagem é visível
        cy.get('a[href]')
          .should('exist'); // Verifica se existe um link
        cy.get('p')
          .should('not.be.empty'); // Verifica se o parágrafo do artigo não está vazio
        cy.get('.main-page-block-contents ul li')
          .should('have.length.greaterThan', 0); // Verifica se há pelo menos um evento listado
        cy.get('.main-page-block-contents figure').each(($figure) => {
          // Valida que as imagem do evento existam
          cy.wrap($figure).find('img')
            .should('have.attr', 'src')
            .and('include', 'upload.wikimedia.org');
        });
        cy.get('.ea-links a').contains('Mais eventos atuais')
          // Valida a existencia do link para Mais eventos atuais
          .should('have.attr', 'href');
      })
    });

    it('CT014 - Validação da Seção Imagem do dia', () => {

      cy.get('.main-page.main-page-third-row').within(() => {
        // Verifica se o título da seção está presente
        cy.get('.main-page-block-heading').contains('Imagem do dia');
        // Verifica se a seção de conteúdo da imagem existe
        cy.get('.main-page-block-contents').should('exist');
        // Verifica se a imagem está presente
        cy.get('.main-page-block-contents img').should('exist');
        // Verifica se a imagem tem um atributo src válido
        cy.get('.main-page-block-contents img')
          .should('have.attr', 'src')
          .and('include', 'upload.wikimedia.org');
        // Verifica se o link da imagem aponta para a página de descrição
        cy.get('.main-page-block-contents a')
          .should('have.attr', 'href')
          .and('include', '/wiki/');
        // Verifica se todos os links dentro da descrição têm um href válido
        cy.get('.main-page-block-contents a').each(($link) => {
          cy.wrap($link)
            .should('have.attr', 'href')
            .and('not.be.empty');
        });
        // Verifica se os botões de compartilhamento (Facebook, X) têm links válidos
        cy.get('.plainlinks a').each(($button) => {
          cy.wrap($button)
            .should('have.attr', 'href')
        });
        // Verifica se o link "Índice geral" está presente e com href válido
        cy.get('.plainlinks a').contains('Índice geral')
          .should('have.attr', 'href');
        // Verifica se o link "Commons" está presente e com href válido
        cy.get('.plainlinks a').contains('Commons')
          .should('have.attr', 'href');
      })
    });

    it('CT015 - Validação da Seção Sobre a Wikipédia', () => {
      // Seleciona o elemento pai da seção "Sobre a Wikipédia"
      cy.get('table.hp-kop').eq(0).within(() => {
        // Verifica se o título "Sobre a Wikipédia" está presente dentro da tabela
        cy.get('span').contains('Sobre a Wikipédia')
          .should('exist');
        // Verifica se o link da Wikipédia está presente
        cy.get('a[title="Wikipédia"]')
          .should('have.attr', 'href', '/wiki/Wikip%C3%A9dia');
        // Verifica se a lista de tópicos importantes está visível
        cy.get('.hlist').should('exist');

        const links = [
          { href: '/wiki/Wikip%C3%A9dia:Princ%C3%ADpio_da_imparcialidade', text: 'Princípio da imparcialidade' },
          { href: '/wiki/Wikip%C3%A9dia:Vers%C3%B5es_da_l%C3%ADngua_portuguesa', text: 'Versões do português' },
          { href: '/wiki/Wikip%C3%A9dia:Direitos_de_autor', text: 'Direitos de autor' },
          { href: '/wiki/Wikip%C3%A9dia:Normas_de_conduta', text: 'Normas de conduta' },
          { href: '/wiki/Wikip%C3%A9dia:Coisas_a_n%C3%A3o_fazer', text: 'Coisas a não fazer' },
          { href: '/wiki/Wikip%C3%A9dia:O_que_%C3%A9_um_wiki', text: 'O que é um wiki?' },
          { href: '/wiki/Wikip%C3%A9dia:Livro_de_estilo', text: 'Livro de estilo' },
          { href: '/wiki/Wikip%C3%A9dia:Como_contribuir_para_a_Wikip%C3%A9dia', text: 'Como contribuir' },
          { href: '/wiki/Ajuda:Tutorial', text: 'Tutorial' },
          { href: '/wiki/Wikip%C3%A9dia:Recursos_livres', text: 'Recursos livres' },
          { href: '/wiki/Portal:Conte%C3%BAdo_destacado', text: 'Conteúdo destacado' },
          { href: '/wiki/Ajuda:Guia_de_tradu%C3%A7%C3%A3o', text: 'Páginas a traduzir' },
          { href: '/wiki/Wikip%C3%A9dia:Artigos_pedidos', text: 'Artigos à espera de autor' },
          { href: '/wiki/Wikip%C3%A9dia:Manuten%C3%A7%C3%A3o', text: 'Manutenção' },
          { href: 'https://donate.wikimedia.org/wiki/Special:FundraiserRedirector', text: 'Donativos' },
          { href: '/wiki/Wikip%C3%A9dia:Esplanada', text: 'Esplanada' },
          { href: '/wiki/Wikip%C3%A9dia:FAQ', text: 'FAQ' },
          { href: '/wiki/Wikip%C3%A9dia:Contato', text: 'Contato' },
          { href: '/wiki/Wikimedia_Foundation', text: 'Wikimedia' },
          { href: '/wiki/MediaWiki', text: 'Software' },
          { href: '/wiki/Especial:Estat%C3%ADsticas', text: 'Estatísticas' },
          { href: '/wiki/Ajuda:Guia_de_consulta_e_reprodu%C3%A7%C3%A3o', text: 'Consulta e reprodução' },
          { href: '/wiki/Wikip%C3%A9dia:Decis%C3%B5es_da_comunidade', text: 'Decisões da comunidade' },
          { href: '/wiki/Wikip%C3%A9dia:Informe_um_erro', text: 'Informe um erro' },
          { href: '/wiki/Wikip%C3%A9dia:Dom%C3%ADnio_Wikip%C3%A9dia', text: 'Wikipédia' },
          { href: '/wiki/Wikip%C3%A9dia:Dom%C3%ADnio_MediaWiki', text: 'MediaWiki' },
          { href: '/wiki/Wikip%C3%A9dia:Lista_de_predefini%C3%A7%C3%B5es', text: 'Predefinição' },
          { href: '/wiki/Ajuda:P%C3%A1gina_principal', text: 'Ajuda' },
        ];

        links.forEach(link => {
          // Seleciona e valida os links com base no href e texto
          cy.get(`a[href="${link.href}"]`)
            .should('contain.text', link.text); // Verifica se o texto do link está correto
        });
      });
    });

    it('CT016 - Validação da Seção Projetos Irmãos', () => {
      // Seleciona o elemento pai da seção "Sobre a Wikipédia"
      cy.get('table.hp-kop').eq(1).within(() => {
        // Verifica se o título "Sobre a Wikipédia" está presente dentro da tabela
        cy.get('span').contains('Projetos-irmãos')
          .should('exist');
        // Verifica se o link da Wikimedia está presente
        cy.get('a[title="Wikimedia"]')
          .should('have.attr', 'href', '/wiki/Wikimedia');

        const links = [
          { href: "https://commons.wikimedia.org/wiki/P%C3%A1gina_principal", title: "Commons" },
          { href: "https://incubator.wikimedia.org/wiki/Incubator:Main_Page/pt", title: "Incubator" },
          { href: "https://meta.wikimedia.org/wiki/P%C3%A1gina_principal", title: "Meta-Wiki" },
          { href: "https://pt.wiktionary.org/wiki/P%C3%A1gina_principal", title: "Wikcionário" },
          { href: "https://www.wikidata.org/wiki/Wikidata:P%C3%A1gina_principal", title: "Wikidata" },
          { href: "https://pt.wikibooks.org/wiki/Wikilivros:P%C3%A1gina_principal", title: "Wikilivros" },
          { href: "https://pt.wikinews.org/wiki/P%C3%A1gina_principal", title: "Wikinotícias" },
          { href: "https://pt.wikiquote.org/wiki/pt:P%C3%A1gina_principal", title: "Wikiquote" },
          { href: "https://pt.wikisource.org/wiki/pt:Wikisource:P%C3%A1gina_principal", title: "Wikisource" },
          { href: "https://species.wikimedia.org/wiki/P%C3%A1gina_principal", title: "Wikispecies" },
          { href: "https://pt.wikiversity.org/wiki/pt:P%C3%A1gina_principal", title: "Wikiversidade" },
          { href: "https://pt.wikivoyage.org/wiki/pt:P%C3%A1gina_principal", title: "Wikivoyage" },
          { href: "https://www.wikifunctions.org/wiki/", title: "Wikifunctions" },
          { href: "https://phabricator.wikimedia.org/", title: "Phabricator" }
        ];

        links.forEach(({ href, title }) => {
          cy.get('span')
            .contains(title)  // Validar o texto do link
            .should('have.attr', 'href', href);  // Validar o link (href)
        });

      });
    });
  });

  context('Validação do Footer da pagina', () => {
    it('CT017 - Deve exibir o footer corretamente', () => {
      cy.get('#footer').should('be.visible'); // Verifica se o footer está visível
    });

    it('CT018 - Deve conter o texto de última modificação', () => {
      cy.get('#footer-info-lastmod')
        .should('be.visible')
        .and('contain', 'Esta página foi editada pela última vez');
    });

    it('CT019 - Deve conter o link da Creative Commons com o texto correto', () => {
      cy.get('#footer-info-copyright')
        .find('a')
        .should('have.attr', 'href')
        .and('include', 'creativecommons.org');
    });

    it('CT020 - Deve conter o link para a Política de Privacidade', () => {
      cy.get('#footer-places-privacy')
        .find('a')
        .should('have.attr', 'href')
        .and('include', 'foundation.wikimedia.org');
    });

    it('CT021 - Deve redirecionar para a página de desenvolvedores', () => {
      cy.get('#footer-places-developers')
        .find('a')
        .should('have.attr', 'href')
        .and('eq', 'https://developer.wikimedia.org');
    });

    it('CT022 - Deve exibir o link para a versão móvel', () => {
      cy.get('#footer-places-mobileview')
        .find('a')
        .should('have.attr', 'href')
        .and('include', 'm.wikipedia.org')
    });

    it('CT023 - Deve ter o logo da Wikimedia Foundation com link correto', () => {
      cy.get('#footer-copyrightico')
        .find('a')
        .should('have.attr', 'href')
        .and('eq', 'https://wikimediafoundation.org/');
      cy.get('#footer-copyrightico')
        .find('img')
        .should('have.attr', 'alt')
        .and('eq', 'Wikimedia Foundation');
    });

    it('CT024 - Deve exibir o logo "Powered by MediaWiki" com link correto', () => {
      cy.get('#footer-poweredbyico')
        .find('a')
        .should('have.attr', 'href')
        .and('eq', 'https://www.mediawiki.org/');
      cy.get('#footer-poweredbyico')
        .find('img')
        .should('have.attr', 'alt')
        .and('eq', 'Powered by MediaWiki');
    });

    it('CT025 - Deve conter links internos válidos', () => {
      // Verifica se os links internos estão funcionando, sem quebrar
      cy.get('#footer-places-about')
        .find('a')
        .should('have.attr', 'href')
        .and('include', '/wiki/Wikip%C3%A9dia:Sobre');
      cy.get('#footer-places-disclaimers')
        .find('a')
        .should('have.attr', 'href')
        .and('include', '/wiki/Wikip%C3%A9dia:Aviso_geral');
    });

    it('CT026 - O item "Editar configurações da antevisão" deve estar oculto', () => {
      cy.get('li[style="display: none;"]')
        .should('not.be.visible'); // Verifica que o item não está visível
    });

  });
});