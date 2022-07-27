/// <reference types="cypress" />

describe('Blog app', function() {
  beforeEach(function() {
    /**
     * Actualmente no es posible agregar nuevos usuarios a través de la interfaz
     * de usuario del frontend, por lo que agregamos un nuevo usuario al backend
     * desde el bloque beforeEach
     */
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'logged-in')
  })

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()

    cy.contains('logged-in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created')
      cy.get('#author').type('by cypress')
      cy.get('#url').type('https://www.cypress.io/')
      cy.contains('add').click()
      cy.contains('blog created')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog created',
          author: 'by cypress',
          url: 'https://www.cypress.io/',
          likes: null
        })
        // cy.visit('http://localhost:3000')
      })

      it('new blog with 0 likes', function () {
        cy.contains('view').click()
        cy.contains('another blog created')
        cy.contains('Likes 0')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog created (1)',
          author: 'by cypress',
          url: 'https://www.cypress.io/',
          likes: 5
        })
        cy.createBlog({
          title: 'another blog created (2)',
          author: 'by cypress',
          url: 'https://www.cypress.io/',
          likes: 10
        })
        cy.createBlog({
          title: 'another blog created (3)',
          author: 'by cypress',
          url: 'https://www.cypress.io/',
        })

        cy.contains('another blog created (1)')
          .contains('view')
          .click()

        cy.contains('another blog created (2)')
          .contains('view')
          .click()
      })

      it('check order - desc by likes', function() {
        cy.visit('http://localhost:3000')

        cy.get('*[data-cy^="blog-content"]').then( blogs => {
          cy.wrap(blogs[0]).contains('another blog created (2)') // 10 likes
          cy.wrap(blogs[1]).contains('another blog created (1)') // 5 likes
          cy.wrap(blogs[2]).contains('another blog created (3)') // 0 likes
        })
      })

      it('delete one blog (owner)', function () {
        cy.contains('button', 'delete').click()

        cy.should('not.contain', 'another blog created (1)')
      })

      describe('delete a blog (not owner)', function () {
        beforeEach(function () {
          cy.contains('Logout').click()

          const user = {
            name: 'Matti Luukkainen (2)',
            username: 'root_2',
            password: 'sekret'
          }
          cy.request('POST', 'http://localhost:3001/api/users/', user)
          cy.visit('http://localhost:3000')
        })

        it('try delete one blog', function () {
          cy.login({ username: 'root_2', password: 'sekret' })

          cy.contains('another blog created (2)')
            .contains('view')
            .click()

          cy.contains('another blog created (2)').parent()
            .find('button')
            .contains('delete')
            .click()

          cy.contains('another blog created (2)')
        })
      })
    })
  })


})