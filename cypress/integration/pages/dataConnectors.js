import selectors from "../selectors/dataConnectors"
export class Dataconnectors {
    clickOnAddDataConnector(){
        cy.get(selectors.addDataConnector).click();
    }
    enterDataConnectorName(name) {
        cy.get(selectors.nameInput).type(name).should('have.value', name);
    }

    enterDataConnectorDescription(description) {
        cy.get(selectors.descriptionInput).type(description).should('have.value', description);
    }

    selectAuthType(type) {
        cy.get(selectors.authenticatonDropdown).click();
        cy.get(selectors.authenticationTypeInput).type(type).should('have.value',type);
        cy.xpath(selectors.authType.replace('AuthType', type)).click();
    }

    ClickSaveBtn() {
        cy.xpath(selectors.saveBtn).click();
    }

    createADataConnector(name, description, type){
        this.clickOnAddDataConnector();
        this.enterDataConnectorName(name);
        this.enterDataConnectorDescription(description);
        this.selectAuthType(type);
        this.ClickSaveBtn();
        cy.get(selectors.addResource).should('be.visible');
    }

    OpenConfigurationTab(){
        cy.xpath(selectors.configurationtab).click();
        
    }
    AddAToken(token){
        this.OpenConfigurationTab();
        cy.get(selectors.tokenInput).type(token);
        this.ClickSaveBtn();

    }

    AddAListResource(description, method, URL){
        this.clickOnAddResource();
        this.AddResourceDescription(description);
        this.selectMethodOfResource(method);
        this.AddResourceURL(URL);
        cy.xpath(selectors.addBtn).click();
    }

    clickOnAddResource(){
        cy.get(selectors.addResource).click();
        cy.wait(2000);
    }

    AddResourceDescription(description){
        cy.get(selectors.resourceDescription).type(description);
    }
    
    selectMethodOfResource(method){
        cy.get(selectors.resourceMethod).select(method);
    }

    AddResourceURL(URL){
        cy.get(selectors.resourceURL).type(URL).should('have.value', URL);
    }

    OpenResourcesTab(){
        cy.xpath(selectors.resourcestab).click();
    }

}