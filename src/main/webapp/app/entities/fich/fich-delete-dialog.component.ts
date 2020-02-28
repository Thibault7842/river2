import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFich } from 'app/shared/model/fich.model';
import { FichService } from './fich.service';

@Component({
  templateUrl: './fich-delete-dialog.component.html'
})
export class FichDeleteDialogComponent {
  fich?: IFich;

  constructor(protected fichService: FichService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fichService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fichListModification');
      this.activeModal.close();
    });
  }
}
