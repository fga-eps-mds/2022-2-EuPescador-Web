/* eslint-disable @typescript-eslint/no-unsafe-call */
describe('Log de Peixes', () => {

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

    it('Exportar logs', () => {
        cy.visit('http://localhost:3000/')

        cy.get('[href="/logs"]').click()

        cy.contains('Logs dos Peixes').should('be.visible')

        cy.url()
            .should('include', '/logs')
        
        cy.contains('Clique aqui para exportar logs').click()

        cy.readFile('C:/Users/cardo/OneDrive/Documentos/Projetos/2022-2-EuPescador-Web/cypress/downloads/fish-logs.xlsx')
    });

    it('Editar log - Salvar edição', () => {
        cy.visit('http://localhost:3000/')

        cy.get('[href="/logs"]').click()

        cy.contains('Logs dos Peixes').should('be.visible')

        cy.url().should('include', '/logs')

        cy.contains('baiacu').parent().find('[data-testid="editButton"]').click()

        cy.contains('Detalhes do Log').should('be.visible')

        cy.get('[name="species"]').type('{selectall}{backspace}Cypress Editou')

        cy.contains('Salvar').click()

        //Aguardar desenvolvimento 

    })

    it('Editar log - Botão de cancelar', () => {
        cy.visit('http://localhost:3000/')

        cy.get('[href="/logs"]').click()

        cy.contains('Logs dos Peixes').should('be.visible')

        cy.url().should('include', '/logs')

        cy.contains('baiacu').parent().find('[data-testid="editButton"]').click()

        cy.contains('Detalhes do Log').should('be.visible')

        cy.contains('Cancelar').click()

        cy.contains('Logs dos Peixes').should('be.visible')
    })

    it('Excluir log', () => {
        cy.visit('http://localhost:3000/')

        cy.get('[href="/logs"]').click()

        cy.contains('Logs dos Peixes').should('be.visible')

        cy.url().should('include', '/logs')

        cy.contains('baiacu').parent().find('[data-testid="deleteButton"]').click()

        cy.contains('Deseja excluir o registro do peixe baiacu?').should('be.visible')

        cy.contains('Cancelar').click()
    });

});