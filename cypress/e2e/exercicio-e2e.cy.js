/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";

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
        //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
        cy.fixture('produtos').then(dados => {
            var i
            for (i = 0; i < 3; i++) {
                produtosPage.buscarProdutos(dados[i].nomeProduto)
                produtosPage.addProdutoCarrinho(
                    dados[i].tamanho,
                    dados[i].cor,
                    dados[i].quantidade
                )
            }           
        })
    });
})