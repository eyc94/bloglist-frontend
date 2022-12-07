describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'owner',
      username: 'admin',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Login');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('admin');
      cy.get('#password-input').type('password');
      cy.get('#login-button').click();

      cy.contains('owner logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('admin');
      cy.get('#password-input').type('wrong');
      cy.get('#login-button').click();

      cy.contains('Wrong username or password');
      cy.get('html').should('not.contain', 'owner logged in');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username-input').type('admin');
      cy.get('#password-input').type('password');
      cy.get('#login-button').click();
    });

    it('A blog can be created', function() {
      cy.contains('New Blog').click();
      cy.get('#title-input').type('test title');
      cy.get('#author-input').type('test author');
      cy.get('#url-input').type('www.sample.com');
      cy.get('#new-blog-button').click();
      cy.contains('test title test author');
    });

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.contains('New Blog').click();
        cy.get('#title-input').type('test title');
        cy.get('#author-input').type('test author');
        cy.get('#url-input').type('www.sample.com');
        cy.get('#new-blog-button').click();
      });

      it('user can like a blog', function() {
        cy.contains('View').click();
        cy.contains('like').click();
        cy.contains('Likes: 1');
      });

      it('user can delete their blog', function() {
        cy.contains('View').click();
        cy.contains('Remove').click();
        cy.get('html').should('not.contain', 'test title test author');
      });
    });
  });
});
