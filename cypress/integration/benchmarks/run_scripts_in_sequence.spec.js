describe('run scripts in sequence', () => {
    it("benchmark", function() {
        cy.importProcess('run_scripts_in_sequence').then(processId => {
            cy.login();
            cy.visit(`/process_events/${processId}?event=node_1`)
        });

        cy.reloadPageUntil('#summary tr:nth-child(2)').then(() => {
            cy.get('#summary tr:nth-child(2) td:nth-child(2)').should('have.text', '1');
            cy.get('#summary tr:nth-child(3) td:nth-child(2)').should('have.text', '2');
        });
    });
});