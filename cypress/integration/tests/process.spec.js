import {
  Login
} from "../pages/login"
import {
  Process
} from "../pages/process";
import {
  NavigationHelper
} from "../helpers/navigationHelper";
import {
  Header
} from "../pages/header";
import {
  Requests
} from "../pages/requests";
import {
  Execution
} from "../pages/execution";
import {
  Screens
} from "../pages/screens";
import {
  Dataconnectors
} from "../pages/dataConnectors";
import {
  Admin
} from "../pages/admin";
import testData from "../../fixtures/test_data/TCP42227.json";
import testData2248 from "../../fixtures/test_data/TCP42248.json";
import testData2311 from "../../fixtures/test_data/TCP42311.json";

import EnvData from "../../../cypress.json";

const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const execution = new Execution();
const screens = new Screens();
const dataconnector = new Dataconnectors();
const admin = new Admin();
describe("ProcessMaker Test Cases", () => {

  before(() => {
    login.navigateToUrl();
    login.login();
  })

  it('TCP4 - 2227', async () => {
    var name = "QA-Process-" + new Date().getTime();
    var timeStamp = new Date().getTime();
    var description = "Created for testing purpose";
    var coverstaion_screen = timeStamp + testData.screens[0].name;
    var displayScreen = timeStamp + testData.screens[1].name;
    var seletListName = "selectlistmultiple";
    var loopMode = "Multi-Instance (Sequential)";
    var dataConnectorName = testData.screens[0].controlls[1].datasource.data_connector + timeStamp;
    var dataConnectorType = "Bearer Token";
    var token = testData.screens[0].controlls[1].datasource.token;
    var resourceMethod = "GET";
    var resourceURL = EnvData.baseUrl + '/api/1.0/groups';

    // Create a data connector
    navHelper.navigateToDataConnectorPage();
    dataconnector.createADataConnector(dataConnectorName, description, dataConnectorType);
    dataconnector.OpenConfigurationTab();
    dataconnector.AddAToken(token);
    dataconnector.OpenResourcesTab();
    dataconnector.AddAListResource(description, resourceMethod, resourceURL);

    // Create screens
    navHelper.navigateToScreensPage();
    for (var i = 0; i < testData.screens.length; i++) {
      screens.addScreen(testData.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }

    // Creating Process
    navHelper.navigateToProcessPage();
    process.createProcess(name, description);
    cy.wait(5000); // Will remove later

    process.dragEvent('start', 400, 200);
    const start_event_id = await process.getId("start");

    process.dragEvent('pdf generator', 500, 400);
    const pdf_event_id = await process.getId("pdf generator");

    process.dragEvent('task', 650, 200);
    const task_event_id = await process.getId("task");

    process.dragEvent('end', 500, 550);
    const end_event_id = await process.getId("end");

    process.connectToEvents(start_event_id, task_event_id);
    process.connectToEvents(task_event_id, pdf_event_id);
    process.connectToEvents(pdf_event_id, end_event_id);

    // cy.wait(5000);
    process.addScreenToFormTask(task_event_id, coverstaion_screen);
    process.addDisplayScreenToPDFGenrator(pdf_event_id, displayScreen);
    process.addLoopActivity(loopMode, seletListName);
    process.saveTheProcess();

    // Create request
    header.clickOnAddRequest();
    header.searchWithProcessName(name);
    var requestId = await header.clickOnStart(name);
    request.clickOnTaskName(1, 1);
    execution.actionsAndAssertionsOfTCP42227(requestId);
  })

  it('TCP4 - 2248', async () => {
     var name = "QA-Process-" + new Date().getTime();
    // var name = "QA-Process-1652770803840";
    var description = "Created for testing purpose";
    var timeStamp = new Date().getTime();
    // var timeStamp = 1652714404261;

    var create_screen = timeStamp + testData2248.screens[0].name;
    var view_screen = timeStamp + testData2248.screens[1].name;
    var form_screen1 = timeStamp + testData2248.screens[2].name;
    var form_screen2 = timeStamp + testData2248.screens[3].name;

    var loopMode = "Multi-Instance (Sequential)";
    // var dataconnector_screenName="cy_2248WorldBankCountryData-rlzdj";
    var dataConnectorName = "QA-DataConnector-" + timeStamp;
    var dataconnectorType = "No Auth";
    var resourceUrl = "http://api.worldbank.org/v2/country?format=json";
    var resourceMethod = "GET";
    var listName = "GET: list";
    var userName = "admin";
    var collectionName = testData2248.screens[3].controlls[0].datasource.data_connector + timeStamp;

    // Create data connector
    navHelper.navigateToDataConnectorPage();
    dataconnector.createADataConnector(dataConnectorName, description, dataconnectorType);
    dataconnector.AddAListResource(description, resourceMethod, resourceUrl);

    // Create two screens
    navHelper.navigateToScreensPage();
    for (var i = 0; i < 2; i++) {
      screens.addScreen(testData2248.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }

    // Create collection using the two screens
    navHelper.navigateToCollectionPage();
    admin.creatACollection(collectionName, description, create_screen, view_screen, create_screen);
    admin.addRecordstoBookCollection(collectionName);

    // Create remaining screens
    navHelper.navigateToScreensPage();
    for (var i = 2; i < testData2248.screens.length; i++) {
      screens.addScreen(testData2248.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }

    // Create process and add items
    navHelper.navigateToProcessPage();
    process.createProcess(name, description);
    cy.wait(5000); // Will remove later
    // cy.viewport(1920, 1200);
    process.dragEvent('pool', 400, 70);

    process.dragEvent('start', 420, 200);
    const start_event_id = await process.getId("start");

    process.dragEvent('Data Connector', 480, 200);
    //process.selectdataconnector(dataconnector_name);
    const Dataconnector_event_id1 = await process.getId("task");
    process.selectdataconnector(Dataconnector_event_id1, dataConnectorName, listName);
    process.changetaskname("Data Connector A");

    process.dragEvent('task', 680, 200);
    const task_event_id1 = await process.getId("task");
    process.changetaskname('A');
    process.addScreenToFormTask(task_event_id1, form_screen1);
    process.addassignmentRules(task_event_id1, userName);

    process.dragEvent('task', 830, 200);
    const task_event_id2 = await process.getId("task");
    process.changetaskname('B');

    process.dragEvent('Data Connector', 800, 400);
    // process.selectdataconnector(dataconnector_name);
    const Dataconnector_event_id2 = await process.getId("task");
    process.selectdataconnector(Dataconnector_event_id2, dataConnectorName, listName);
    process.changetaskname('Data Connector B');

    process.dragEvent('task', 650, 400);
    const task_event_id3 = await process.getId("task");
    process.changetaskname('c');

    process.dragEvent('end', 480, 400);
    const end_event_id = await process.getId("end");

    // Adding screens to the form task
    process.addScreenToFormTask(task_event_id2, form_screen2);
    process.addScreenToFormTask(task_event_id3, form_screen2);

    process.connectToEvents(start_event_id, Dataconnector_event_id1);
    process.connectToEvents(Dataconnector_event_id1, task_event_id1);
    process.connectToEvents(task_event_id1, task_event_id2);
    process.connectToEvents(task_event_id2, Dataconnector_event_id2);
    process.connectToEvents(Dataconnector_event_id2, task_event_id3);
    process.connectToEvents(task_event_id3, end_event_id);

    // Adding assignment rule as admin user
    process.addassignmentRules(task_event_id1, userName);
    process.addassignmentRules(task_event_id2, userName);
    process.addassignmentRules(task_event_id3, userName);

    process.saveTheProcess();
    cy.wait(5000);
    navHelper.navigateToProcessPage();
    process.addUserToProcessManager(name);

    header.clickOnAddRequest();
    header.searchWithProcessName(name);
    var requestId = await header.clickOnStart(name);
    request.clickOnTaskName(1, 1);
    execution.actionsAndAssertionsOfTCP42248(requestId);
  })

  it('TCP4 - 2311', async () => {
    var name = "QA-Process-" + new Date().getTime();
    // var name = "QA-Process-1652679528218";
    var timeStamp = new Date().getTime();
    // var timeStamp = 1652679261490;
    var description = "Created for testing purpose";
    var form_Screen = timeStamp + testData2311.screens[0].name;
    var display_Screen = timeStamp + testData2311.screens[1].name;
    var seletListName = "2";
    var exitConditionName = "form_input_1";
    var loopMode = "Loop";

    navHelper.navigateToScreensPage();
    for (var i = 0; i < testData2311.screens.length; i++) {
      screens.addScreen(testData2311.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }

    navHelper.navigateToProcessPage();
    process.createProcess(name, description);
    cy.wait(5000); // Will remove later

    process.dragEvent('start', 400, 500);
    const start_event_id = await process.getId("start");

    process.dragEvent('task', 600, 500);
    const task_event_id = await process.getId("task");

    process.dragEvent('pdf generator', 800, 500);
    const pdf_event_id = await process.getId("pdf generator");

    process.dragEvent('task', 1100, 500);
    process.changeToManualTask();
    const manualtask_event_id = await process.getId("task");

    process.dragEvent('end', 1400, 500);
    const end_event_id = await process.getId("end");

    process.connectToEvents(start_event_id, task_event_id);
    process.connectToEvents(task_event_id, pdf_event_id);
    process.connectToEvents(pdf_event_id, manualtask_event_id);
    process.connectToEvents(manualtask_event_id, end_event_id);

    process.addScreenToFormTask(task_event_id, form_Screen);
    process.addDisplayScreenToPDFGenrator(pdf_event_id, display_Screen);
    cy.get(':nth-child(2) > .pl-3 > :nth-child(1)').type('TESTCASE');
    process.addLoopActivity(loopMode, seletListName, exitConditionName);
    process.addScreenToFormTask(manualtask_event_id, display_Screen);
    // process.

    process.saveTheProcess();
    navHelper.navigateToProcessPage();
    process.addUserToProcessManager(name);
    navHelper.navigateToRequestsPage();

    header.clickOnAddRequest();
    header.searchWithProcessName(name);
    var requestId = await header.clickOnStart(name);
    request.clickOnTaskName(1, 1);

    execution.actionsAndAssertionsOfTCP42331(requestId, name, form_Screen, display_Screen);
  })

})