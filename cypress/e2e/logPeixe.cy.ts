/* eslint-disable @typescript-eslint/no-unsafe-call */
describe('Logs dos Peixes', () => {
    beforeEach(() => {
        cy.loginSession()
    })
    it.skip('Exportar logs', () => {
        cy.visit('logs')

        cy.get('[href="/logs"]').click()

        cy.contains('Logs de Peixes').should('be.visible')

        cy.url()
            .should('include', '/logs')
        
        cy.contains('Clique aqui para exportar logs').click()

        cy.readFile('C:/Users/cardo/OneDrive/Documentos/Projetos/2022-2-EuPescador-Web/cypress/downloads/fish-logs.xlsx')
    });
    it.skip('Editar log - Salvar edição', () => {
        cy.visit('logs')

        cy.get('[href="/logs"]').click()

        cy.contains('Logs de Peixes').should('be.visible')

        cy.url().should('include', '/logs')

        cy.contains('Arraia').parent().find('[data-testid="editButton"]').click()

        cy.contains('Detalhes do Log').should('be.visible')

        cy.get('[name="species"]').type('{selectall}{backspace}Cypress Editou')

        cy.contains('Visível').click()

        cy.contains('Salvar').click()

        cy.get('.Toastify__toast-body').should('have.text', 'Log atualizado com sucesso!')

        cy.contains('Logs dos Peixes').should('be.visible')
    })
    it('Editar log - Botão de cancelar', () => {
        cy.visit('logs')

        cy.get('[href="/logs"]').click()

        cy.contains('Logs de Peixes').should('be.visible')

        cy.url().should('include', '/logs')

        cy.contains('Arraia').parent().find('[data-testid="editButton"]').click()

        cy.contains('Detalhes do Log').should('be.visible')

        cy.contains('Cancelar').click()

        cy.contains('Logs de Peixes').should('be.visible')
    })
    it('Excluir log', () => {
        cy.visit('logs')

        cy.get('[href="/logs"]').click()

        cy.contains('Logs de Peixes').should('be.visible')

        cy.url().should('include', '/logs')

        cy.contains('Arraia').parent().find('[data-testid="deleteButton"]').click()

        cy.contains('Deseja excluir o registro do peixe Cano?').should('be.visible')

        cy.contains('Cancelar').click()
    });
});