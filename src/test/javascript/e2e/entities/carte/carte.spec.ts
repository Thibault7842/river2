import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CarteComponentsPage, CarteDeleteDialog, CarteUpdatePage } from './carte.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Carte e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let carteComponentsPage: CarteComponentsPage;
  let carteUpdatePage: CarteUpdatePage;
  let carteDeleteDialog: CarteDeleteDialog;
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

  it('should load Cartes', async () => {
    await navBarPage.goToEntity('carte');
    carteComponentsPage = new CarteComponentsPage();
    await browser.wait(ec.visibilityOf(carteComponentsPage.title), 5000);
    expect(await carteComponentsPage.getTitle()).to.eq('riverApp.carte.home.title');
  });

  it('should load create Carte page', async () => {
    await carteComponentsPage.clickOnCreateButton();
    carteUpdatePage = new CarteUpdatePage();
    expect(await carteUpdatePage.getPageTitle()).to.eq('riverApp.carte.home.createOrEditLabel');
    await carteUpdatePage.cancel();
  });

  it('should create and save Cartes', async () => {
    const nbButtonsBeforeCreate = await carteComponentsPage.countDeleteButtons();

    await carteComponentsPage.clickOnCreateButton();
    await promise.all([
      carteUpdatePage.setNameInput('name'),
      carteUpdatePage.setDescriptionInput('description'),
      carteUpdatePage.setLandingimgInput(absolutePath),
      carteUpdatePage.projetSelectLastOption()
    ]);
    expect(await carteUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await carteUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await carteUpdatePage.getLandingimgInput()).to.endsWith(
      fileNameToUpload,
      'Expected Landingimg value to be end with ' + fileNameToUpload
    );
    await carteUpdatePage.save();
    expect(await carteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await carteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Carte', async () => {
    const nbButtonsBeforeDelete = await carteComponentsPage.countDeleteButtons();
    await carteComponentsPage.clickOnLastDeleteButton();

    carteDeleteDialog = new CarteDeleteDialog();
    expect(await carteDeleteDialog.getDialogTitle()).to.eq('riverApp.carte.delete.question');
    await carteDeleteDialog.clickOnConfirmButton();

    expect(await carteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
