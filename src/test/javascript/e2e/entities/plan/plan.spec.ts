import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlanComponentsPage, PlanDeleteDialog, PlanUpdatePage } from './plan.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Plan e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let planComponentsPage: PlanComponentsPage;
  let planUpdatePage: PlanUpdatePage;
  let planDeleteDialog: PlanDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Plans', async () => {
    await navBarPage.goToEntity('plan');
    planComponentsPage = new PlanComponentsPage();
    await browser.wait(ec.visibilityOf(planComponentsPage.title), 5000);
    expect(await planComponentsPage.getTitle()).to.eq('riverApp.plan.home.title');
  });

  it('should load create Plan page', async () => {
    await planComponentsPage.clickOnCreateButton();
    planUpdatePage = new PlanUpdatePage();
    expect(await planUpdatePage.getPageTitle()).to.eq('riverApp.plan.home.createOrEditLabel');
    await planUpdatePage.cancel();
  });

  it('should create and save Plans', async () => {
    const nbButtonsBeforeCreate = await planComponentsPage.countDeleteButtons();

    await planComponentsPage.clickOnCreateButton();
    await promise.all([
      planUpdatePage.setNameInput('name'),
      planUpdatePage.setDescriptionInput('description'),
      planUpdatePage.setPlanimgInput(absolutePath),
      planUpdatePage.projetSelectLastOption()
    ]);
    expect(await planUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await planUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await planUpdatePage.getPlanimgInput()).to.endsWith(
      fileNameToUpload,
      'Expected Planimg value to be end with ' + fileNameToUpload
    );
    await planUpdatePage.save();
    expect(await planUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await planComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Plan', async () => {
    const nbButtonsBeforeDelete = await planComponentsPage.countDeleteButtons();
    await planComponentsPage.clickOnLastDeleteButton();

    planDeleteDialog = new PlanDeleteDialog();
    expect(await planDeleteDialog.getDialogTitle()).to.eq('riverApp.plan.delete.question');
    await planDeleteDialog.clickOnConfirmButton();

    expect(await planComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
