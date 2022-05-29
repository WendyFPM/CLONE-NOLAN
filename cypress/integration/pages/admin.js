import selectors from "../selectors/admin"

var date = new Date();

export class Admin {

	searchForCollection(collectionName) {
		cy.get(selectors.searchInputBox).type(collectionName).should('have.value', collectionName);
		cy.xpath(selectors.searchctrl).click({
			multiple: true
		});
		cy.wait(5000);
		cy.xpath(selectors.collectionNameInput.replace('collectionName', collectionName)).should('be.visible');
		cy.xpath(selectors.editctrl).click();
	}


	creatACollection(name, description, createScreen, viewScreen, editScreen) {
		cy.get(selectors.newCollectionBtn).click();
		cy.get(selectors.nameInputTxtBx).type(name).should('have.value', name);
		cy.get(selectors.descriptionInputTxtBx).type(description).should('have.value', description);
		this.addCreateScreenToCollection(createScreen);
		this.addViewScreenToCollection(viewScreen);
		this.addEditScreenToCollection(editScreen);
		cy.xpath(selectors.collectionsaveBtn).click();
		cy.get(selectors.newRecordBtn).should('be.visible');
	}

	addRecordstoBookCollection(name) {
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title1", "author1", "1000");
		cy.xpath(selectors.collectionNameInput.replace('name', name)).click();
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title2", "author2", "4000");
		cy.xpath(selectors.collectionNameInput.replace('name', name)).click();
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title3", "author3", "3000");
		cy.xpath(selectors.collectionNameInput.replace('name', name)).click();
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title4", "author4", "2000");
	}

	addingDataToBookCollection(date, title, author, price) {
		cy.get(selectors.newRecordBtn).click();
		cy.xpath(selectors.dateinputTxtBx).type(date).should('have.value', date);
		cy.get(selectors.titleInputTxtBx).type(title).should('have.value', title);
		cy.get(selectors.authorInputTxtBx).type(author).should('have.value', author);
		cy.get(selectors.priceInputTxtBx).type(price).should('have.value', price);
		cy.get(selectors.submitBtn).click();
		cy.get(selectors.navEditBtn).should('be.visible');
		cy.wait(3000);
	}
	addCreateScreenToCollection(screenName) {
		cy.xpath(selectors.createscreenForInputDropdown).click();
		cy.get(selectors.createscreenInputTxtBx).type(screenName).should('have.value', screenName);
		cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).first().click();
		// cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
	}

	addViewScreenToCollection(screenName) {
		cy.xpath(selectors.viewScreenForInputDropdown).click();
		cy.get(selectors.viewScreenInputTxtBx).type(screenName).should('have.value', screenName);
		cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
		// cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
	}

	addEditScreenToCollection(screenName) {
		cy.xpath(selectors.editScreenForInputDropdown).click();
		cy.get(selectors.editScreenInputTxtBx).type(screenName).should('have.value', screenName);
		cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).last().click();
		// cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
	}


}