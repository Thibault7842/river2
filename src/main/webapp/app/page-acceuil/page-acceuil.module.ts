import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RiverSharedModule } from '../shared/shared.module';

import { PAGE_ACCEUIL_ROUTE, PageAcceuilComponent } from './';

@NgModule({
  imports: [RiverSharedModule, RouterModule.forRoot([PAGE_ACCEUIL_ROUTE], { useHash: true })],
  declarations: [PageAcceuilComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RiverAppPageAcceuilModule {}
