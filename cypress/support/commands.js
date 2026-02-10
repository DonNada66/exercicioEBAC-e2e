Cypress.Commands.add('login', () => {
    const username = Cypress.env('USER_LOGIN');
    const password = Cypress.env('USER_PASSWORD');

    cy.get('#username').type(username)
    cy.get('#password').type(password, { log: false })
    cy.get('.woocommerce-form > .button').click()
});

