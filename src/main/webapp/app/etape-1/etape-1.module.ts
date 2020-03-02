import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RiverSharedModule } from '../shared/shared.module';

import { ETAPE_1_ROUTE, Etape1Component } from './';

@NgModule({
  imports: [RiverSharedModule, RouterModule.forRoot([ETAPE_1_ROUTE], { useHash: true })],
  declarations: [Etape1Component],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RiverAppEtape1Module {}
