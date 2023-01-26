/* eslint-disable @typescript-eslint/no-unsafe-call */
describe('Modal', () => {

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

    it('Entrar em um peixe e fechar a modal', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[href="/dados"]').click()

        cy.contains('Listagem de Peixes')
            .should('be.visible')

        cy.contains('Ituí-cavalo').click()

        cy.contains('Apteronotus camposdapazi')
            .should('be.visible')

        cy.contains('✖').click()
    });

    it('Editar peixe', () => {
        cy.visit('http://localhost:3000/')


    });

    it('Deletar peixe', () => {
        cy.visit('http://localhost:3000/')

    })

    it('Cadastrar Espécie', () => {
        cy.visit('http://localhost:3000/dados')

        cy.contains('Cadastrar Espécie').click()

    });
});