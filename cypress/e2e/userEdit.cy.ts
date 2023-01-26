import { isObject } from "lodash"

/* eslint-disable @typescript-eslint/no-unsafe-call */
describe('User edit', () => {

  beforeEach(() => {
    const email = 'lucas@email.com'
    const senha = '1234'

    cy.session([email, senha], () => {
      cy.visit('http://localhost:3000/')
      cy.contains('Entre na sua conta')
        .should('be.visible')

      cy.get('#email').type(email)
      cy.get('#password').type(senha)
      cy.get('[data-testid="login-button"]').click()
      cy.get('[data-testid="usuarios-button"').click()
    })
  })

  it('Alterar o nome do usuário', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid="usuarios-button"').click()

    cy.contains('Gerência de Usuários')
      .should('be.visible')

    cy.url().should('include', '/usuarios')

    //procura pelo email do usuário e clica em editar
    cy.contains('lucas@email.com').parent()
      .find('[data-testid="editButton"]').click()

    cy.contains('Alterar Usuário')
      .should('be.visible')

    cy.wait(500)
    cy.get('#nome').type('{selectall}{backspace}Lucas editado')

    cy.contains('Salvar').click()

    cy.get('.Toastify__toast-body')
      .should('have.text', 'usuário editado com successo!')

    //clica na msg e verifica que ela desapareceu
    cy.get('.Toastify__toast-body').click()
      .should('not.exist')
  })

  it('Botão de cancelar dentro da edição', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid="usuarios-button"').click()

    cy.contains('Gerência de Usuários')
      .should('be.visible')

    cy.url().should('include', '/usuarios')

    //procura pelo email do usuário e clica em editar
    cy.contains('lucas@email.com').parent()
      .find('[data-testid="editButton"]').click()

    cy.contains('Alterar Usuário')
      .should('be.visible')

    cy.contains('Cancelar').click()

    cy.contains('Gerência de Usuários')
      .should('be.visible')
  });

  it('Validar modal de exclusão', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid="usuarios-button"').click()

    cy.contains('Gerência de Usuários')
      .should('be.visible')

    cy.url().should('include', '/usuarios')

    cy.contains('lucas@email.com').parent()
      .find('[data-testid="deleteButton"]').click()

    //verifica se a modal foi aberta
    cy.contains('Deseja excluir o usuário?').should('be.visible')

    //clica no bsotão cancelar
    cy.contains('Cancelar').click()

    //verifica se a modal foi fechada
    cy.contains('Deseja excluir o usuário?').should('not.exist')
  })

  it('Paginação', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid="usuarios-button"').click()

    cy.contains('Gerência de Usuários')
      .should('be.visible')

    cy.url().should('include', '/usuarios')

    //clica em avançar página e verifica se foi para a página 2 
    cy.get('[data-testid="NavigateNextIcon"]').click()

    cy.get('[aria-label="pagination navigation"]').contains('2')
      .should('have.class', 'Mui-selected')

    //clica em voltar página e verifica se voltou para a pagina 1 ]]
    cy.get('[data-testid="NavigateBeforeIcon"]').click()

    cy.get('[aria-label="pagination navigation"]').contains('1')
      .should('have.class', 'Mui-selected')
  });
})