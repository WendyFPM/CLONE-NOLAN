import selectors from "../selectors/process"
import pageConstants from "../helpers/pageConstants";
import promisify from 'cypress-promise'
import { NavigationHelper } from "../helpers/navigationHelper";
import { isThisWeek } from "date-fns";
export class Process {

    async getId(eventName) {
        cy.wait(2000);
        var locator;
        switch (eventName) {
            case 'start':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.start_event);
                break;
            case 'pdf generator':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.pdf_generator_event);
                break;
            case 'task':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.task_event);
                break;
            case 'end':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.end_event);
                break;
            case 'data connector':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.data_connector_event);
                break;
            case 'Gateway':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.gateway_event);
                break;
            case 'Intermediate Event':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.intermediate_event);
                break;
        }
        const id = await promisify(cy.get(locator).then($elems => {
            var index = 0;
            var max_id = 0;
            for (let i = 0; i < $elems.length; i++) {
                let id = $elems[i].id;
                let ids = id.split('_');
                if ((parseInt(ids[1]) % 2) == 1) {
                    if (max_id < parseInt(ids[1])) {
                        max_id = parseInt(ids[1]);
                        index = i;
                    }
                }
            }
            return $elems[index].id;
        }));

        return id;
    }
    
    async getRecentElementId() {
        return await promisify(cy
            .get('[title="Start Event"]')
            .then($el => $el.text())
        )
    }

    dragEvent(type, offsetX, offsetY) {
        switch (type) {
            case 'start':
                this.dragStartEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.start_event), offsetX, offsetY);
                break;
            case 'pool':
                this.dragEventByOffSet(selectors.prrocessEvent.replace('eventName', pageConstants.process.pool_event), offsetX, offsetY);
               // cy.xpath('(//*[@button-id="bottom-right-resize-button"])[1]').trigger('mousedown', 'bottomRight',{force: true});
                break;
            case 'task':
                this.dragEventByOffSet(selectors.prrocessEvent.replace('eventName', pageConstants.process.task_event), offsetX, offsetY);
                break;
            case 'pdf generator':
                this.dragPdfGeneratorEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.pdf_generator_event), offsetX, offsetY);
                break;
            case 'end':
                this.dragEndEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.end_event), offsetX, offsetY);
                break;
            case 'Data Connector':
                 this.dragdataConnectorEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.data_connector_event), offsetX, offsetY);
                break;
            case 'Gateway':
                this.draggatewayEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.gateway_event), offsetX, offsetY);
                break;
            case 'Intermediate Event':
                this.dragintermediateEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.intermediate_event), offsetX, offsetY);
                break;
                
        }
    }

    dragStartEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='Start Event'])[2]")
            .trigger('mouseup');
    }

    dragEndEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='End Event'])[2]")
            .trigger('mouseup');
    }

    dragPdfGeneratorEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='PDF Generator'])[2]")
            .trigger('mouseup');
    }

    dragdataConnectorEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='Data Connector'])[2]")
            .trigger('mouseup');
    }

    draggatewayEvent(selector, offsetX, offsetY){
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
        .trigger('mousemove', {
            pageX: offsetX,
            pageY: offsetY,
            force: true
        })
    cy.xpath("(//span[text()='Gateway'])[2]")
        .trigger('mouseup');  
    }

    dragintermediateEvent(selector, offsetX, offsetY){
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
        .trigger('mousemove', {
            pageX: offsetX,
            pageY: offsetY,
            force: true
        })
    cy.xpath("(//span[text()='Intermediate Event'])[2]")
        .trigger('mouseup');  
    }

    dragEventByOffSet(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY
            })
        cy.xpath(selector.replace('index', 2))
            .trigger('mouseup', {
                pageX: offsetX,
                pageY: offsetY
            });
    }

    clickOnZoomOut() {
        cy.get(selectors.zoomOutBtn).click();
    }

    connectToEvents(event1Locator, event2Locator){
        cy.get('#'+event1Locator).click();
        cy.get('#generic-flow-button').click();
        cy.get('#'+event2Locator).click();
    }

    clickOnSave(){
        cy.get(selectors.saveBtn).click();
    }

    saveTheProcess(){
        this.clickOnSave();
        cy.xpath(selectors.saveBtnInPopUp).click();
        cy.xpath(selectors.saveChangesModal).should('not.exist');

    }

    createProcess(name, description){
        this.clickOnAddProcess();
        this.enterProcessName(name);
        this.enterProcessDescription(description);
        this.clickOnSaveInAddProcessModal();
    }

    clickOnSaveInAddProcessModal(){
        cy.xpath(selectors.saveBtnInPopUp).click();
    }

    clickOnAddProcess(){
        cy.get(selectors.addProcessBtn).click();
    }

    enterProcessName(name){
        cy.get(selectors.nameTxtBx).type(name).should('have.value', name);
    }

    enterProcessDescription(description){
        cy.get(selectors.descriptionTxtBx).type(description).should('have.value', description);
    }

    addScreenToFormTask(eventLocator, screenName){
        cy.get('#'+eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.screenForInputDropdown).click();
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click({force: true});
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    addDisplayScreenToPDFGenrator(eventLocator, screenName){
        cy.get('#'+eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.screenForDisplayDropdown).click();
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    addDisplayScreenToManualTask(eventLocator, screenName){
        cy.get('#'+eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.screenForManualTask).click();
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    clickOnLoopActivity(){
        cy.get(selectors.expandLoopActivityBtn).click();
    }

    selectLoopMode(loopMode){
        cy.xpath(selectors.loopModeDropdown).select(loopMode);
    }

    enterRequestVarArrayName(selectListName){
        cy.xpath(selectors.requestVarArrayTxtBx).type(selectListName).should('have.value', selectListName);
    }

    enterLoopIterations(selectListName){
        cy.xpath(selectors.iterationTextBox).type(selectListName).should('have.value', selectListName);
    }

    enterExitCondition(exitConditionName){
        cy.xpath(selectors.conditionTextBox).type(exitConditionName).should('have.value', exitConditionName);
    }

    addLoopActivity(loopMode, selectListName, exitConditionName){
        this.clickOnLoopActivity();
        this.selectLoopMode(loopMode);
        switch (loopMode) {
            case 'Multi-Instance (Sequential)':
                this.enterRequestVarArrayName(selectListName);
                  break;
            case 'Loop':
                this.enterLoopIterations(selectListName);
                this.enterExitCondition(exitConditionName);
               break;
            case 'Multi-Instance (Parallel)':
                this.enterRequestVarArrayName(selectListName);
                  break;
        }
    }


    changeToManualTask(){
        cy.get(selectors.addManualTask).click();
    }

     
    changetoscripttask(){
        cy.get(selectors.scripttaskBtn).click();
    }


    addScreenToscriptTask(eventLocator, screenName){
        cy.get('#'+eventLocator).click();
        cy.wait(2000);
        cy.get(selectors.screenForScriptDropdown).click();
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    addUserToProcessManager(processName){
        cy.xpath('(//button[@title="Edit"])[1]').should('be.visible');
        cy.xpath(selectors.searchInputProcess).type(processName).should('have.value', processName);
        cy.xpath(selectors.searchBox).click();
        cy.wait(2000);
        cy.xpath(selectors.processNameInputTxt.replace('processName',processName)).should('be.visible');
        cy.xpath(selectors.configureBtn).click();
        cy.wait(2000);
        cy.xpath(selectors.processManagerDropdown).click();
        cy.xpath(selectors.processInputTxt).type("admin");
        cy.xpath(selectors.processManagerDropdownOption).click();
        cy.xpath(selectors.processManagerEditSaveBtn).click();
        cy.wait(5000);
        //cy.xpath("//span[text()='Designer']").click();
        }

        selectdataconnector(eventLocator, screenName,listName){
            cy.get('#'+eventLocator).click();
            cy.wait(2000);
            cy.xpath(selectors.dataConnectorDropdown).click();
            cy.get(selectors.dataConnectorInputtxtBx).type(screenName).should('have.value', screenName);
            cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
            cy.xpath(selectors.dataconnectorListDropdown).click();
            cy.get(selectors.dataConnectorListInputtxtBx).type(listName).should('have.value', listName);
            cy.xpath(selectors.listInputoption.replace('listName', listName)).click({multiple:true});
            //cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
        }
        changetaskname(rename){
            cy.get(selectors.nameInput).clear();
            cy.get(selectors.nameInput).type(rename).should('have.value', rename);
        }

        changeToeventBasedGateway(){
            cy.get(selectors.eventBasedGatewayBtn).click();
        }

        changeTointermediateSignalCatchEvent(){
            cy.get(selectors.intermediateSignalCatchEvent).click();
        }

        addsignal(eventLocator, signalName){
            cy.get('#'+eventLocator).click();
            cy.wait(2000);
            cy.xpath(selectors.signalForInputDropdown).click();
            cy.get(selectors.signalInputTxtBx).type(signalName).should('have.value', signalName);
            cy.xpath(selectors.signalDropdownOption.replace('signalName', signalName)).click({multiple:true});
            // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
        }

        addassignmentRules(eventLocator, userName){
            cy.get('#'+eventLocator).click({force: true});
            cy.wait(2000);
            cy.xpath(selectors.configDropDown).click();
            cy.xpath(selectors.assignRules).click();
            cy.get(selectors.userDropDown).select("user_group");
            cy.xpath(selectors.assignedUsersOption).click();
            cy.xpath(selectors.usertxtInput).type(userName).should('have.value', userName);
            cy.xpath(selectors.useroption.replace('userName', userName)).click({multiple:true, force:true});
        }
        addResponseMapping(source, requestVariable){
            cy.xpath(selectors.responseMappingbtn).click();
            cy.get(selectors.responseMappingSrcInput).type(source).should('have.value', source);
            cy.get(selectors.responseMappingVarInput).type(requestVariable).should('have.value',requestVariable);
            cy.get(selectors.resMappingSaveBtn).click();
            cy.xpath(selectors.resMappingEditOption).should('be.visible');
        }
        changeToterminateEndEvent(){
            cy.get(selectors.terminateEndEventBtn).click();
        }
        changepdfFileName(pdffilename){
            cy.get(selectors.pdfFileNameInput).clear();
            cy.get(selectors.pdfFileNameInput).type(pdffilename).should('have.value', pdffilename);
        }
}