/* eslint-disable @typescript-eslint/no-unsafe-call */
import { faker } from '@faker-js/faker';
describe('Listagem de Peixes', () => {
    beforeEach(() => {
        cy.loginSession()
    })
    it('Cadastrar Espécie com sucesso', () => {
        const randomFish = faker.animal.fish();
        const randomGrandeGrupo = faker.animal.fish();
        const randomGrupo = faker.animal.fish();
        const randomNomeCientifico = faker.animal.fish();

        cy.visit('dados')

        cy.contains('Listagem de Peixes')
            .should('be.visible')

        cy.contains('Cadastrar Espécie').click()

        cy.contains('Nome usual').next().type(randomFish)
        cy.contains('Grande Grupo').next().type(randomGrandeGrupo)
        cy.contains('Nome científico').next().type(randomNomeCientifico)
        cy.contains('Alimentação').parent().parent().contains('Grupo').next().type(randomGrupo)

        cy.get('#file-input').selectFile('cypress/fixtures/animal.jpg', { force: true })

        cy.contains('Salvar').click()

        cy.get('.Toastify__toast-body').should('contains.text', 'Peixe criado com sucesso!')

        cy.contains(randomFish)
            .should('be.visible')
    });
    it('Cadastrar Espécie - Erro ao criar peixe', () => {
        cy.visit('dados')

        cy.contains('Listagem de Peixes')
            .should('be.visible')

        cy.contains('Cadastrar Espécie').click()

        cy.contains('Nome usual').next().type('Peixe teste')

        cy.contains('Salvar').click()

        cy.get('.Toastify__toast-body').should('contains.text', 'Erro ao criar peixe')

    });
    it('Cadastrar e Deletar peixe', () => {
        const randomFish = faker.animal.fish();
        const randomGrandeGrupo = faker.animal.fish();
        const randomGrupo = faker.animal.fish();
        const randomNomeCientifico = faker.animal.fish();
        cy.visit('dados')

        cy.contains('Listagem de Peixes')
            .should('be.visible')

        cy.contains('Cadastrar Espécie').click()

        cy.contains('Nome usual').next().type(randomFish)
        cy.contains('Grande Grupo').next().type(randomGrandeGrupo)
        cy.contains('Nome científico').next().type(randomNomeCientifico)
        cy.contains('Alimentação').parent().parent().contains('Grupo').next().type(randomGrupo)

        cy.get('#file-input').selectFile('cypress/fixtures/animal.jpg', { force: true })

        cy.contains('Salvar').click()

        cy.get('.Toastify__toast-body').should('contains.text', 'Peixe criado com sucesso!')

        cy.contains(randomFish).click()

        cy.contains('Excluir Espécie').click()

        cy.contains('Deseja excluir essa espécie de peixe?').should('be.visible')

        cy.contains('Confirmar').click()

        cy.contains(randomFish).should('not.exist')
    })
    it('Deletar peixe - botão de cancelar', () => {
        cy.visit('dados')

        cy.contains('Listagem de Peixes')
            .should('be.visible')

        //primeiro peixe da lista
        cy.get(':nth-child(1) > .MuiBox-root > .MuiPaper-root > .MuiGrid-container').click()

        cy.contains('Excluir Espécie').click()

        cy.contains('Deseja excluir essa espécie de peixe?').should('be.visible')

        cy.contains('Cancelar').click()

        cy.contains('Deseja excluir essa espécie de peixe?').should('not.exist')
    });
    it('Editar peixe - Peixe atualizado com sucesso', () => {
        const randomFish = faker.animal.fish();
        cy.visit('dados')

        cy.contains('Listagem de Peixes')
            .should('be.visible')

        //primeiro peixe da lista
        cy.get(':nth-child(1) > .MuiBox-root > .MuiPaper-root > .MuiGrid-container').click()

        cy.contains('Editar Espécie').click()

        cy.contains('Nome usual').next().clear().type('EDITADO ' + randomFish)

        cy.contains('Salvar').click()

        cy.get('.Toastify__toast-body').should('contains.text', 'Peixe atualizado com sucesso!')

        cy.get(':nth-child(1) > .MuiBox-root > .MuiPaper-root > .MuiGrid-container')
            .should('contains.text', 'EDITADO ' + randomFish)
    });
    it('Entrar em um peixe e fechar a modal', () => {
        cy.visit('dados')

        cy.contains('Listagem de Peixes')
            .should('be.visible')

        cy.get(':nth-child(1) > .MuiBox-root > .MuiPaper-root > .MuiGrid-container').click()

        cy.contains('✖').click()

        cy.contains('Grande Grupo').should('not.exist')
    });
    it('Paginação', () => {
        cy.visit('dados')

        cy.contains('Listagem de Peixes')
            .should('be.visible')

        //clica em avançar página e verifica se foi para a página 2 
        cy.get('[data-testid="NavigateNextIcon"]').click()

        cy.get('[aria-label="pagination navigation"]').contains('2')
            .should('have.class', 'Mui-selected')

        //clica em voltar página e verifica se voltou para a pagina 1 ]]
        cy.get('[data-testid="NavigateBeforeIcon"]').click()

        cy.get('[aria-label="pagination navigation"]').contains('1')
            .should('have.class', 'Mui-selected')
    });
    it.skip('Cadastrar Espécie com imagem aleatória', () => {
        cy.visit('dados')
        cy.contains('Listagem de Peixes')
            .should('be.visible')

        cy.contains('Cadastrar Espécie').click()

        //       cy.get('#file-input').selectFile('cypress/fixtures/animal.jpg', {force: true})


        const randomImg = faker.image.animals(2345, 2345)

        /*    cy.request(randomImg).then((response) => {   
           cy.writeFile('cypress/fixtures/imagem.png', response.body)
           })
   
    */
        cy.writeFile(`cypress/fixtures/foto.jpg`, randomImg, 'binary', (error) => {
            if (error) {
                console.error(error);
            }
        });

        cy.get('#file-input').selectFile('cypress/fixtures/foto.jpg', { force: true })
    });
    it.skip('Editar peixe - apagar nome e tentar salvar', () => {
        const randomFish = faker.animal.fish();
        cy.visit('dados')

        cy.contains('Listagem de Peixes')
            .should('be.visible')

        //primeiro peixe da lista
        cy.get(':nth-child(1) > .MuiBox-root > .MuiPaper-root > .MuiGrid-container').click()

        cy.contains('Editar Espécie').click()

        cy.contains('Nome usual').next().clear()

        cy.contains('Salvar').click()

    });
});