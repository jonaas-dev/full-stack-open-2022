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
        })
        cy.createBlog({
          title: 'another blog created (2)',
          author: 'by cypress',
          url: 'https://www.cypress.io/',
        })
        cy.createBlog({
          title: 'another blog created (3)',
          author: 'by cypress',
          url: 'https://www.cypress.io/',
        })
      })

      it('one of those can be made important', function () {
        cy.contains('another blog created (1)')
          .contains('view')
          .click()

        cy.contains('another blog created (2)')
          .contains('view')
          .click()
      })
    })
  })


})