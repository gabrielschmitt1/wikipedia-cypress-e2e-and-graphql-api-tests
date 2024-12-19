describe('GraphQLZero API Tests', () => {
  it('CT001 - Deve buscar usuario especifico com sucesso', () => {
    const query = `
          query {
            user(id: 1) {
              id
              username
              email
              address {
                geo {
                  lat
                  lng
                }
              }
            }
          }
        `

    cy.graphQLRequest(query).then((response) => {
      // Validar que o status da resposta é 200
      expect(response.status).to.eq(200);
      // Validar que o retorno contém a propriedade "user"
      expect(response.body.data).to.have.property('user');
      // Validar que os campos retornados são válidos
      const user = response.body.data.user;
      expect(user).to.have.property('id', '1'); // Verifica que o ID é 1
      expect(user).to.have.property('username');
      expect(user).to.have.property('email');
      expect(user).to.have.property('address');
      expect(user.address).to.have.property('geo');
      expect(user.address.geo).to.have.property('lat');
      expect(user.address.geo).to.have.property('lng');
    });
  });
  it('CT002 - Deve buscar usuários com sucesso', () => {
    const query = `
            query {
              users(options: { paginate: { page: 1, limit: 2 } }) {
                data {
                  id
                  name
                }
                meta {
                  totalCount
                }
              }
            }
          `

    cy.graphQLRequest(query).then((response) => {
      // Validar que o status da resposta é 200
      expect(response.status).to.eq(200);

      // Validar que os dados da resposta contêm usuários
      expect(response.body).to.have.property('data');
      expect(response.body.data.users.data).to.be.an('array');
      expect(response.body.data.users.data.length).to.be.greaterThan(0);

      // Validar os campos retornados de cada usuário
      response.body.data.users.data.forEach((user) => {
        expect(user).to.have.property('id');
        expect(user).to.have.property('name');
      });

      // Validar o total de usuários
      expect(response.body.data.users.meta).to.have.property('totalCount');
    });
  });

  it('CT003 - Deve criar um post com sucesso', () => {
    // Carregar as variáveis do arquivo de fixture
    const query = `
              mutation ($input: CreatePostInput!) {
                createPost(input: $input) {
                  id
                  title
                  body
                }
              }
            `
    cy.fixture('post-mutation.json').then((variables) => {
      cy.graphQLRequest(query, variables).then((response) => {
        // Validar que o status da resposta é 200
        expect(response.status).to.eq(200);

        // Validar que a resposta contém dados sobre o post criado
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('createPost');

        // Validar que o post criado possui os campos esperados
        const post = response.body.data.createPost;
        expect(post).to.have.property('id');
        expect(post).to.have.property('title', variables.input.title);
        expect(post).to.have.property('body', variables.input.body);
      });
    });
  });

  it('CT004 - Deve buscar um post com sucesso', () => {
    const query = `
        query {
          post(id: 1) {
            id
            title
            body
          }
        }
      `
    cy.graphQLRequest(query).then((response) => {
      // Validar que o status da resposta é 200
      expect(response.status).to.eq(200);

      // Validar que a resposta contém dados sobre o post criado
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('post');

      // Validar que o post criado possui os campos esperados
      const post = response.body.data.post;
      expect(post).to.have.property('id');
      expect(post).to.have.property('title');
      expect(post).to.have.property('body');
    });
  });

  it('CT005 - Deve deletar um post com sucesso', () => {
    const postId = "1"; // ID do post que será deletado
    const variables = { id: postId }
    const query = `
          mutation ($id: ID!) {
            deletePost(id: $id)
          }
        `
    cy.graphQLRequest(query, variables).then((response) => {
      // Validar que o status da resposta é 200
      expect(response.status).to.eq(200);

      // Validar que a resposta contém dados sobre a deleção
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('deletePost');

      // Validar que a resposta da mutação é verdadeira
      expect(response.body.data.deletePost).to.be.true;
    });
  });
});
