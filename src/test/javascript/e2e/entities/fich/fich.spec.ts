import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FichComponentsPage, FichDeleteDialog, FichUpdatePage } from './fich.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Fich e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fichComponentsPage: FichComponentsPage;
  let fichUpdatePage: FichUpdatePage;
  let fichDeleteDialog: FichDeleteDialog;
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

  it('should load Fiches', async () => {
    await navBarPage.goToEntity('fich');
    fichComponentsPage = new FichComponentsPage();
    await browser.wait(ec.visibilityOf(fichComponentsPage.title), 5000);
    expect(await fichComponentsPage.getTitle()).to.eq('riverApp.fich.home.title');
  });

  it('should load create Fich page', async () => {
    await fichComponentsPage.clickOnCreateButton();
    fichUpdatePage = new FichUpdatePage();
    expect(await fichUpdatePage.getPageTitle()).to.eq('riverApp.fich.home.createOrEditLabel');
    await fichUpdatePage.cancel();
  });

  it('should create and save Fiches', async () => {
    const nbButtonsBeforeCreate = await fichComponentsPage.countDeleteButtons();

    await fichComponentsPage.clickOnCreateButton();
    await promise.all([
      fichUpdatePage.setNameInput('name'),
      fichUpdatePage.setDescriptionInput('description'),
      fichUpdatePage.setPlanimgInput(absolutePath),
      fichUpdatePage.projetSelectLastOption()
    ]);
    expect(await fichUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await fichUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await fichUpdatePage.getPlanimgInput()).to.endsWith(
      fileNameToUpload,
      'Expected Planimg value to be end with ' + fileNameToUpload
    );
    await fichUpdatePage.save();
    expect(await fichUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fichComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Fich', async () => {
    const nbButtonsBeforeDelete = await fichComponentsPage.countDeleteButtons();
    await fichComponentsPage.clickOnLastDeleteButton();

    fichDeleteDialog = new FichDeleteDialog();
    expect(await fichDeleteDialog.getDialogTitle()).to.eq('riverApp.fich.delete.question');
    await fichDeleteDialog.clickOnConfirmButton();

    expect(await fichComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
