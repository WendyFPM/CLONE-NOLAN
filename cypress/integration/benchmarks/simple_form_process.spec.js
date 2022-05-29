describe('simple form process', () => {
    it("benchmark", function () {
        cy.importProcess('simple_form_process').then(processId => {
            cy.login();
            cy.visit(`/process_events/${processId}?event=node_1`)
        });

        cy.get('.vuetable-body a', { timeout: 1000 }).should('be.visible');
        cy.get('.vuetable-body a').first().click();

        cy.get('[data-cy="screen-field-input"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="screen-field-input"]').type('abc');
        cy.get('[data-cy="screen-field-checkbox"]').click();
        cy.get('button').contains('Submit').click();

        cy.get('#summary tr:nth-child(2) td:nth-child(2)').should('have.text', 'abc');
        cy.get('#summary tr:nth-child(3) td:nth-child(2)').should('have.text', 'true');
    });
});