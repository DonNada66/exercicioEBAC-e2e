class checkoutPage {
    preencherInformacoes(empresa, endereco, complemento, cidade, estado, cep, telefone, notas,tipoPagamento) {
        cy.get('#billing_company').clear().type(empresa)
        cy.get('#billing_address_1').clear().type(endereco)
        cy.get('#billing_address_2').clear().type(complemento)
        cy.get('#billing_city').clear().type(cidade)
        cy.get('#select2-billing_state-container').click()
        cy.get('.select2-search__field').type(estado)
        cy.get('.select2-dropdown').contains(estado).click()
        cy.get('#billing_postcode').clear().type(cep)
        cy.get('#billing_phone').clear().type(telefone)
        cy.get('#order_comments').clear().type(notas)

        if (tipoPagamento == 'Transferência bancária') {
            cy.get('#payment_method_bacs').check()
        }
        else if (tipoPagamento == 'Cheque') {
            cy.get('#payment_method_cheque').check()
        }
        else if (tipoPagamento == 'Pagamento na entrega') {
            cy.get('#payment_method_cheque').check()
        }

        cy.get('#terms').check()
        cy.get('#place_order').click()
    }
}

export default new checkoutPage()