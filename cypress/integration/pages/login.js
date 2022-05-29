/// <reference types="cypress" />
import selectors from "../selectors/login"
import headerSelectors from "../selectors/header";
export class Login {

  navigateToUrl() {
    cy.visit("/login");
  }

  clickOnLogin(){
    cy.get(selectors.loginBtn).click();
  }

  login(username = Cypress.env("username"), password = Cypress.env("password")) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickOnLogin();

    cy.get(headerSelectors.userAvatarBtn).should('be.visible');
  }

  enterUsername(username) {
    cy.get(selectors.usernameTxtBx).type(username).should('have.value', username);
  }

  enterPassword(password) {
    cy.get(selectors.passwordTxtBx).type(password).should('have.value', password);
  }

}