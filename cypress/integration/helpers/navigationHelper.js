export class NavigationHelper {
    navigateToProcessPage(){
        cy.visit('/processes');
        cy.title().should('eq', 'Processes - ProcessMaker');
    }

    navigateToRequestsPage(){
        cy.visit('/requests');
        cy.title().should('eq', 'My Requests - ProcessMaker');
    }

    navigateToCompletedRequests(){
        cy.visit('requests/completed');
        cy.title().should('eq', 'Completed Requests - ProcessMaker');
    }

    navigateToAllRequests(){
        cy.visit('/requests/all');
        cy.title().should('eq', 'All Requests - ProcessMaker');
    }

    navigateToInprogressRequests(){
        cy.visit('/requests/in_progress');
        cy.title().should('eq', 'Requests In Progress - ProcessMaker');
    }

    navigateToAdminPage(){
        cy.visit('/admin');
        cy.title().should('eq', 'Users - ProcessMaker');
    }

    navigateToCollectionPage(){
        cy.visit('/collections');
        cy.title().should('eq', 'Collections - ProcessMaker');
    }

    navigateToScreensPage(){
        cy.visit('/designer/screens');
        cy.title().should('eq', 'Screens - ProcessMaker');
    }

    navigateToDataConnectorPage(){
        cy.visit('/designer/data-sources');
        cy.title().should('eq', 'Data Connectors - ProcessMaker');
    }
}