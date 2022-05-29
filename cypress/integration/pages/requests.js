import selectors from "../selectors/requests"
import promisify from 'cypress-promise';
import { NavigationHelper } from "../helpers/navigationHelper";

let navHelper = new NavigationHelper();
export class Requests {
    clickOnTaskName(rowIndex, coloumnIndex){
        cy.xpath((selectors.tasksTableCell.replace('rowIndex', rowIndex).replace('coloumnIndex', coloumnIndex))+'//a').click();
    }

    async waitUntilTheRequestIsCompleted(timeOut){
        var status;
        for(var i=0;i<timeOut/5;i++){
            const text = await promisify(cy
                .get('h4')
                .then(el => el.text())
            )
            cy.log(text);
            if(text=='Completed'){
                return true;
            }
            cy.wait(5000);
            cy.reload();
        }
        return false;
    }

    processIsCompleted(requestId){
        cy.visit('/requests/'+requestId);
        cy.xpath("//h4[text()='Completed']").should('be.visible');
    }

    processIsInprogress(requestId){
        cy.visit('/requests/'+requestId);
        cy.xpath("//h4[text()='In Progress']").should('be.visible');
    }

    openRequestById(requestId){
        navHelper.navigateToInprogressRequests();
        cy.visit('/requests/'+requestId);
        cy.wait(4000);
        cy.reload();
        cy.xpath("(//*[@class='vuetable-slot'])[1]").should('be.visible');  
    }

    openRequestByName(processName){
        navHelper.navigateToInprogressRequests();
        this.addRequestNameToSelectList(processName);
        cy.xpath(selectors.requestInputOption.replace('processName',processName)).click();
        cy.xpath("(//*[@class='vuetable-slot'])[1]").should('be.visible');
        this.getRequestID();
    }

    addRequestNameToSelectList(processName){
        cy.xpath(selectors.requestDropDown).click();
        cy.wait(2000);
        cy.xpath(selectors.requestInput).type(processName).should('have.value', processName);
        cy.xpath(selectors.requestDropDownOption.replace('processName', processName)).click({multiple: true});
        cy.xpath(selectors.requestSearchBox).click();
        cy.xpath(selectors.requestName.replace('processName',processName)).should('be.visible');
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

   async getRequestID(){
        const requestId = await promisify(cy.url().then(url => {
            return url.split('/')[4].trim();
        }))
        return requestId;
    }
}