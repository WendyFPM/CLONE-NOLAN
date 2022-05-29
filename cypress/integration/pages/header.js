import selectors from "../selectors/header";
import promisify from 'cypress-promise'
export class Header {

    clickOnAddRequest(){
        cy.get(selectors.addRequestBtn).click();
        cy.wait(2000);
        cy.xpath(selectors.loadingProcesses).should('not.exist');
    }

    searchWithProcessName(processName){
        cy.get(selectors.searchWithProceesNameTxtBx).type(processName).should('have.value', processName);
        cy.wait(2000);
    }

    async clickOnStart(processName){
        cy.xpath(selectors.startBtnBasedOnProcessName.replace('processName', processName)).click();
        cy.title().should('eq', 'Request Detail - ProcessMaker');
        const requestId = await promisify(cy.url().then(url => {
            return url.split('/')[4].trim();
        }))
        return requestId;
    }


}