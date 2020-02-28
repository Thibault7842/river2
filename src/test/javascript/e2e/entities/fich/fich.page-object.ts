import { element, by, ElementFinder } from 'protractor';

export class FichComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-fich div table .btn-danger'));
  title = element.all(by.css('jhi-fich div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class FichUpdatePage {
  pageTitle = element(by.id('jhi-fich-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  planimgInput = element(by.id('file_planimg'));
  projetSelect = element(by.id('field_projet'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setPlanimgInput(planimg: string): Promise<void> {
    await this.planimgInput.sendKeys(planimg);
  }

  async getPlanimgInput(): Promise<string> {
    return await this.planimgInput.getAttribute('value');
  }

  async projetSelectLastOption(): Promise<void> {
    await this.projetSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async projetSelectOption(option: string): Promise<void> {
    await this.projetSelect.sendKeys(option);
  }

  getProjetSelect(): ElementFinder {
    return this.projetSelect;
  }

  async getProjetSelectedOption(): Promise<string> {
    return await this.projetSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class FichDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-fich-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-fich'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
