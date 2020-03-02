import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RiverSharedModule } from '../shared/shared.module';

import { ETAPE_2_ROUTE, Etape2Component } from './';

@NgModule({
  imports: [RiverSharedModule, RouterModule.forRoot([ETAPE_2_ROUTE], { useHash: true })],
  declarations: [Etape2Component],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RiverAppEtape2Module {}
