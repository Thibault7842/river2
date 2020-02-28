import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RiverSharedModule } from 'app/shared/shared.module';
import { FichComponent } from './fich.component';
import { FichDetailComponent } from './fich-detail.component';
import { FichUpdateComponent } from './fich-update.component';
import { FichDeleteDialogComponent } from './fich-delete-dialog.component';
import { fichRoute } from './fich.route';

@NgModule({
  imports: [RiverSharedModule, RouterModule.forChild(fichRoute)],
  declarations: [FichComponent, FichDetailComponent, FichUpdateComponent, FichDeleteDialogComponent],
  entryComponents: [FichDeleteDialogComponent]
})
export class RiverFichModule {}
