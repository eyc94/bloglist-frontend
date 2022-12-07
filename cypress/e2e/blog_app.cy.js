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
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
