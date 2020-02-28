import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RiverSharedModule } from 'app/shared/shared.module';
import { CarteComponent } from './carte.component';
import { CarteDetailComponent } from './carte-detail.component';
import { CarteUpdateComponent } from './carte-update.component';
import { CarteDeleteDialogComponent } from './carte-delete-dialog.component';
import { carteRoute } from './carte.route';

@NgModule({
  imports: [RiverSharedModule, RouterModule.forChild(carteRoute)],
  declarations: [CarteComponent, CarteDetailComponent, CarteUpdateComponent, CarteDeleteDialogComponent],
  entryComponents: [CarteDeleteDialogComponent]
})
export class RiverCarteModule {}
