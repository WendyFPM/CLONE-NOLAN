import Selectors from "../selectors/screens"
export class Screens {

	clickOnAddScreen() {
		cy.get(Selectors.addScreenButton).click();
	}

	enterScreenName(name) {
		cy.get(Selectors.nameTxtBx).type(name).should('have.value', name);
	}

	enterScreenDescription(description) {
		cy.get(Selectors.descriptionTxtBx).type(description).should('have.value', description);
	}

	selectScreenType(type) {
		cy.get(Selectors.typeDropDown).select(type);
	}

	clickOnSave() {
		cy.xpath(Selectors.saveBtn).click();
	}

	createScreen(name, description, type) {
		this.clickOnAddScreen();
		this.enterScreenName(name);
		this.enterScreenDescription(description);
		this.selectScreenType(type);
		this.clickOnSave();
		if (type == 'Conversational') {
			cy.get(Selectors.saveScreenBtn).should('be.visible');
		} else {
			cy.get(Selectors.saveVersionsBtn).should('be.visible');
		}
	}

	saveTheChanges(type) {
		if (type == 'Conversational') {
			this.clickOnSaveScreen();
		} else {
			this.clickOnSaveVersions();
			this.clickOnSave();
			cy.wait(2000);
		}
	}

	clickOnSaveScreen() {
		cy.get(Selectors.saveScreenBtn).click();
	}

	clickOnSaveVersions() {
		cy.get(Selectors.saveVersionsBtn).click();
	}

	addScreen(screenData, timeStamp) {
		this.createScreen(timeStamp + screenData.name, screenData.description, screenData.type);
		this.addControlls(screenData.controlls, timeStamp);
		this.saveTheChanges(screenData.type);
	}

	addControl(controlName) {
		cy.window().then((win) => {
			win.testing.addControlByLabel(controlName);
		})
	}

	setVariableName(name) {
		if (name != null) {
			cy.get(Selectors.varaibleNameTxtBx).clear();
			cy.get(Selectors.varaibleNameTxtBx).type(name).should('have.value', name);
		}
	}

	clickOnDataSource() {
		cy.get(Selectors.dataSourceSectionBtn).click();
	}

	selectTheDataSource(source) {
		cy.get(Selectors.dataSourceDropDown).select(source);
	}

	checkAllowMultipleSelections(check) {
		if (check) {
			cy.xpath(Selectors.allowMultipleSelections).check();
		}
	}

	selectTypeOfReturnedValue(option) {
		cy.get(Selectors.typeOfReturnedValue).select(option);
	}

	fillOptionsVaraible(options_varaible) {
		cy.get(Selectors.optionsVaraibleTxtBx).clear();
		cy.get(Selectors.optionsVaraibleTxtBx).type(options_varaible).should('have.value', options_varaible);
	}

	addLineInputControl(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
	}

	addSelectListControl(data, timeStamp) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
		this.clickOnDataSource();
		this.selectTheDataSource(data.datasource.data_source);
		switch (data.datasource.data_source) {
			case 'Data Connector':
				this.fillOptionsVaraible(data.datasource.options_varaible);
				this.checkAllowMultipleSelections(data.datasource.allow_multiple_selections);
				this.selectTypeOfReturnedValue(data.datasource.return_value);
				this.setContentValue(data.datasource.content);
				this.selectDataConnector(data.datasource.data_connector+timeStamp);
				this.selectTheEndPoint(data.datasource.endPoint);
				break;

			case 'Request Data':
				this.fillOptionsVaraible(data.datasource.options_varaible);
				this.fillOptionLabelShown(data.datasource.option_label_shown);
				this.fillVariableDataProperty(data.datasource.variable_data_property);
				break;
		}

	}

	addRichTextControl(data) {
		this.addControl(data.name);
		this.enterRichTextContent(data.content);
	}

	enterRichTextContent(content) {
		cy.get(Selectors.richTextContentTxtArea).clear();
		cy.get(Selectors.richTextContentTxtArea).type(content, {
			parseSpecialCharSequences: false
		}).should('have.value', content);
	}

	setContentValue(content) {
		cy.get(Selectors.contentTxtBx).clear();
		cy.get(Selectors.contentTxtBx).type(content).should('have.value', content);
	}

	selectDataConnector(option) {
		cy.get(Selectors.dataConnectorDropDown).select(option);
	}

	selectTheEndPoint(endPointOption) {
		cy.get(Selectors.endPointDropDown).select(endPointOption);
	}

	addControlls(controllsData, timeStamp) {
		for (var i = 0; i < controllsData.length; i++) {
			switch (controllsData[i].name) {
				case 'Line Input':
					this.addLineInputControl(controllsData[i]);
					break;
				case 'Select List':
					this.addSelectListControl(controllsData[i], timeStamp);
					break;
				case 'Rich Text':
					this.addRichTextControl(controllsData[i]);
					break;
				case 'Submit Button':
					this.addSubmitButtonControl(controllsData[i]);
					break;
				case 'Date Picker':
					this.addDatePickerControl(controllsData[i]);
					break;
				case 'File Upload':
					this.addFileUploadControl(controllsData[i]);
					break;
				case 'File Preview':
					this.addFilePreviewControl(controllsData[i]);
					break;
			}
		}
	}

	addSubmitButtonControl(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
	}

	addDatePickerControl(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
		this.setLabelName(data.label_name);
		this.setDataTypeForDatePicker(data.data_type);
	}

	setLabelName(name) {
		if (name != null) {
			cy.get(Selectors.labelNameTxtBx).clear();
			cy.get(Selectors.labelNameTxtBx).type(name).should('have.value', name);
		}
	}

	addFileUploadControl(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
		this.setLabelName(data.label_name);
	}

	setDataTypeForDatePicker(type) {
		cy.xpath(Selectors.dateDropDownbtn).click();
		cy.xpath(Selectors.dateValueBx.replace('type', type)).click();
	}

	addFilePreviewControl(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
		this.setLabelName(data.label_name);
	}

	fillOptionsVaraible(options_varaible) {
		cy.get(Selectors.optionsVaraibleTxtBx).clear();
		cy.get(Selectors.optionsVaraibleTxtBx).type(options_varaible).should('have.value', options_varaible);
	}

	fillOptionLabelShown(option_label_shown) {
		cy.get(Selectors.optionsLabelTxtBx).clear();
		cy.get(Selectors.optionsLabelTxtBx).type(option_label_shown).should('have.value', option_label_shown);

	}

	fillVariableDataProperty(variable_data_property) {
		cy.get(Selectors.variableDataProTxtBx).clear();
		cy.get(Selectors.variableDataProTxtBx).type(variable_data_property).should('have.value', variable_data_property);
	}

}