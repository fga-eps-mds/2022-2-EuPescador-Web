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

    it.only('Cadastrar Espécie - Erro ao criar peixe', () => {
        cy.visit('http://localhost:3000/dados')

        cy.contains('Listagem de Peixes')
        .should('be.visible')

       cy.contains('Cadastrar Espécie').click()

       cy.contains('Nome usual').next().type('Peixe teste')

       cy.contains('Salvar').click()

       cy.get('.Toastify__toast-body').should('contains.text', 'Erro ao criar peixe')
 
    });

    it.only('Cadastrar Espécie com sucesso', () => {
        cy.visit('http://localhost:3000/dados')

        cy.contains('Listagem de Peixes')
        .should('be.visible')

       cy.contains('Cadastrar Espécie').click()

       cy.contains('Nome usual').next().type('Peixe teste')

       cy.contains('Salvar').click()

       cy.get('.Toastify__toast-body').should('contains.text', 'Erro ao criar peixe')
 
    });


    it('Editar peixe', () => {
        cy.visit('http://localhost:3000/dados')

        cy.contains('Listagem de Peixes')
        .should('be.visible')

        



    });

    it('Deletar peixe', () => {
        cy.visit('http://localhost:3000/')

    })

    
});