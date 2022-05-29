import { Requests } from "./requests";
import {Header} from "./header";
import { NavigationHelper } from "../helpers/navigationHelper";

let navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
export class Execution {
    async actionsAndAssertionsOfTCP42227(requestId) {
        cy.get('input[name="form_input_1"]').type("Test");
        cy.get('button[aria-label="Submit"]').click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[1]").click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[2]").click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[3]").click();
        cy.xpath("//button[text()[normalize-space()='I am done selecting']]").click();

        cy.xpath("(//button[contains(@class, 'select-list-options')])[1]").click();
        //cy.xpath("//button[text()[normalize-space()='I am done selecting']]").click();

        //cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        cy.visit('/requests/' + requestId);
        var result = await request.waitUntilTheRequestIsCompleted(20000);
        // expect(result).to.be(true);

        cy.get('#file-manager-tab').click();
        cy.get('#fileManager tbody[role="rowgroup"] tr[data-pk]').should('have.length', 3);
    }

    async actionsAndAssertionsOfTCP42248(requestId) {
        //request part click on select list
        cy.get('[class="multiselect__input"]').click({
            force: true
        });
        //add option to select list
        cy.xpath('(//li[@role="option"]//span//span[text()="Latin America & Caribbean "])[1]').click({
            multiple: true
        });
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');

        //Go to Inprogress
        navHelper.navigateToProcessPage();
        navHelper.navigateToInprogressRequests();
        //open request by ID
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        //click on select list
        cy.get('[class="multiselect__input"]').click({
            force: true
        });
        //add option title3
        cy.xpath('(//span[text()="title3"])[1]').click();
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');

        //Go to Inprogress
        navHelper.navigateToProcessPage();
        navHelper.navigateToInprogressRequests();
        //open request by ID
        request.openRequestById(requestId);
        cy.wait(2000);
        request.clickOnTaskName(1, 1);
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //verify the process is completed
        request.processIsCompleted(requestId);
        //cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Data Connector A']]").should('be.visible');

        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task A']]").scrollIntoView().should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task B']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Data Connector B']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task c']]").should('be.visible');
    }

    async actionsAndAssertionsOfTCP42331(requestId, name, form_Screen, display_Screen){
        cy.get("[name='form_Screen']".replace('form_Screen', form_Screen)).should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[1]').attachFile("sample.pdf");
        cy.get('.uploader-file-name').contains("sample.pdf");
        cy.get('[data-cy="screen-field-form_input_2"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[2]').attachFile('drone.jpg');
        cy.xpath('(//*[@class="uploader-file-name"])[2]').contains("drone.jpg");
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        navHelper.navigateToRequestsPage();
        //navHelper.navigateToInprogressRequests();
        request.openRequestById(requestId);
        cy.wait(5000);
        request.clickOnTaskName(1, 1);
        cy.get("[name='display_Screen']".replace('display_Screen', display_Screen)).should('be.visible');
        cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[1]").should('be.visible');
        cy.get('[data-cy="screen-field-file_upload_1"]').should('be.visible');
        cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[2]").should('be.visible');
        cy.xpath("//div[@data-cy='screen-field-file_upload_2']//img[1]").should('be.visible');
        cy.xpath('//a[text()="Go to about Processmaker"]').click();
        cy.get("[aria-label='ProcessMaker']").should('be.visible');
        cy.go('back');
        cy.xpath('//button[text()[normalize-space()="Complete Task"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        cy.reload();
        cy.get('[id="file-manager-tab"]').click();
        cy.xpath('(//*[@title="View"])[3]').click();
        request.processIsCompleted(requestId);
    
        //requestpart___Quarter Scenario
        navHelper.navigateToRequestsPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        var requestId = await header.clickOnStart(name);
        request.clickOnTaskName(1, 1);
        cy.get("[name='form_Screen']".replace('form_Screen', form_Screen)).should('be.visible');
        //cy.get('[data-cy="screen-field-form_input_1"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[1]').attachFile("sample.pdf");
        cy.get('.uploader-file-name').contains("sample.pdf");
        cy.get('[data-cy="screen-field-form_input_2"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[2]').attachFile('drone.jpg');
        cy.xpath('(//*[@class="uploader-file-name"])[2]').contains("drone.jpg");
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        navHelper.navigateToRequestsPage();
        //navHelper.navigateToInprogressRequests();
        request.openRequestById(requestId);
        cy.wait(5000);
        request.clickOnTaskName(1, 1);
        cy.get("[name='display_Screen']".replace('display_Screen', display_Screen)).should('be.visible');
        cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[1]").should('be.visible');
        cy.get('[data-cy="screen-field-file_upload_1"]').should('be.visible');
        // cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[2]").should('be.visible');
        cy.xpath("//div[@data-cy='screen-field-file_upload_2']//img[1]").should('be.visible');
        cy.xpath('//a[text()="Go to about Processmaker"]').click();
        cy.get("[aria-label='ProcessMaker']").should('be.visible');
        cy.go('back');
        cy.xpath('//button[text()[normalize-space()="Complete Task"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        cy.get("[id='file-manager-tab']").should('be.visible');
        cy.get('[id="file-manager-tab"]').click();
        cy.xpath('(//*[@title="View"])[1]').click();
        cy.wait(2000);
        cy.go('back');
        cy.xpath('(//*[@title="View"])[2]').click();
        request.processIsCompleted(requestId);
    }
}