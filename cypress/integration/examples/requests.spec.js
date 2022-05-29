describe('Requests page', () => {
    beforeEach(() => {
        cy.login();
        cy.visit("/requests");
    });
    describe("Requests page", function () {
        it("should be in the Request page", function () {
            cy.title()
                .should("include", "My Requests");
        });
        it("should create a new request", function () {
            cy.get("#navbar-request-button")
                .click();
            cy.get("#requests-modal___BV_modal_content_")
                .should("be.visible");
        });
    });
});