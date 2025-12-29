/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";
import checkoutPage from "../support/page_objects/checkout.page";
import { fakerPT_BR as faker } from '@faker-js/faker'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta')
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario, login.senha)

        })
        produtosPage.visitarUrl

    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.fixture('produtos').then(dados => {
            var i
            for (i = 0; i < 4; i++) {
                produtosPage.buscarProdutos(dados[i].nomeProduto)
                produtosPage.addProdutoCarrinho(
                    dados[i].tamanho,
                    dados[i].cor,
                    dados[i].quantidade
                )
            }
        })

        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart')
            .should('have.class', 'open')
            .find('a.button.checkout.wc-forward')
            .should('be.visible')
            .click();

        checkoutPage.preencherInformacoes(
            faker.company.name(),
            faker.location.streetAddress(false),
            faker.location.secondaryAddress(),
            faker.location.city(),
            faker.location.state(),
            faker.location.zipCode(),
            faker.phone.number(),
            faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
            'Cheque'
        )
        cy.wait(2000)
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
})