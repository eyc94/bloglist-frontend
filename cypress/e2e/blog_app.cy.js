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

    describe('and several blogs exists', function() {
      beforeEach(function() {
        cy.contains('New Blog').click();
        cy.get('#title-input').type('firsttitle');
        cy.get('#author-input').type('firstauthor');
        cy.get('#url-input').type('www.firsturl.com');
        cy.get('#new-blog-button').click();

        cy.contains('New Blog').click();
        cy.get('#title-input').type('secondtitle');
        cy.get('#author-input').type('secondauthor');
        cy.get('#url-input').type('www.secondurl.com');
        cy.get('#new-blog-button').click();

        cy.contains('New Blog').click();
        cy.get('#title-input').type('thirdtitle');
        cy.get('#author-input').type('thirdauthor');
        cy.get('#url-input').type('www.thirdurl.com');
        cy.get('#new-blog-button').click();

        cy.contains('firsttitle').find('button').should('contain', 'View').click();
        cy.contains('firsttitle').parent().find('button').should('contain', 'like').as('1like');
        cy.contains('firsttitle').parent().find('button').should('contain', 'Remove').as('1remove');


        cy.contains('secondtitle').find('button').should('contain', 'View').click();
        cy.contains('secondtitle').parent().find('button').should('contain', 'like').as('2like');
        cy.contains('secondtitle').parent().find('button').should('contain', 'Remove').as('2remove');


        cy.contains('thirdtitle').find('button').should('contain', 'View').click();
        cy.contains('thirdtitle').parent().find('button').should('contain', 'like').as('3like');
        cy.contains('thirdtitle').parent().find('button').should('contain', 'Remove').as('3remove');
      });

      it('user can like a blog', function() {
        cy.get('@1like').contains('like').as('like1');
        cy.get('@like1').click();
        cy.contains('Likes: 1');
      });

      it('user can delete their blog', function() {
        cy.get('@1remove').contains('Remove').as('remove1');
        cy.get('@remove1').click();
        cy.get('html').should('not.contain', 'firsttitle firstauthor');
      });

      it('they are sorted in the proper order', function() {
        cy.get('@1like').contains('like').as('like1');
        cy.get('@2like').contains('like').as('like2');
        cy.get('@3like').contains('like').as('like3');

        cy.get('@like1').click();
        cy.wait(400);
        cy.get('@like2').click();
        cy.wait(400);
        cy.get('@like2').click();
        cy.wait(400);
        cy.get('@like3').click();
        cy.wait(400);
        cy.get('@like3').click();
        cy.wait(400);
        cy.get('@like3').click();
        cy.wait(400);

        cy.get('.blog').eq(0).should('contain', 'thirdtitle');
        cy.get('.blog').eq(1).should('contain', 'secondtitle');
        cy.get('.blog').eq(2).should('contain', 'firsttitle');
      });
    });
  });
});
