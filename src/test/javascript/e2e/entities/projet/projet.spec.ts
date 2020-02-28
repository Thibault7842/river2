import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProjetComponentsPage, ProjetDeleteDialog, ProjetUpdatePage } from './projet.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Projet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let projetComponentsPage: ProjetComponentsPage;
  let projetUpdatePage: ProjetUpdatePage;
  let projetDeleteDialog: ProjetDeleteDialog;
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

  it('should load Projets', async () => {
    await navBarPage.goToEntity('projet');
    projetComponentsPage = new ProjetComponentsPage();
    await browser.wait(ec.visibilityOf(projetComponentsPage.title), 5000);
    expect(await projetComponentsPage.getTitle()).to.eq('riverApp.projet.home.title');
  });

  it('should load create Projet page', async () => {
    await projetComponentsPage.clickOnCreateButton();
    projetUpdatePage = new ProjetUpdatePage();
    expect(await projetUpdatePage.getPageTitle()).to.eq('riverApp.projet.home.createOrEditLabel');
    await projetUpdatePage.cancel();
  });

  it('should create and save Projets', async () => {
    const nbButtonsBeforeCreate = await projetComponentsPage.countDeleteButtons();

    await projetComponentsPage.clickOnCreateButton();
    await promise.all([
      projetUpdatePage.setNameInput('name'),
      projetUpdatePage.setDescriptionInput('description'),
      projetUpdatePage.setLandingimgInput(absolutePath),
      projetUpdatePage.userSelectLastOption()
    ]);
    expect(await projetUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await projetUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await projetUpdatePage.getLandingimgInput()).to.endsWith(
      fileNameToUpload,
      'Expected Landingimg value to be end with ' + fileNameToUpload
    );
    await projetUpdatePage.save();
    expect(await projetUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await projetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Projet', async () => {
    const nbButtonsBeforeDelete = await projetComponentsPage.countDeleteButtons();
    await projetComponentsPage.clickOnLastDeleteButton();

    projetDeleteDialog = new ProjetDeleteDialog();
    expect(await projetDeleteDialog.getDialogTitle()).to.eq('riverApp.projet.delete.question');
    await projetDeleteDialog.clickOnConfirmButton();

    expect(await projetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
