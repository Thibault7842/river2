import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICarte } from 'app/shared/model/carte.model';
import { CarteService } from './carte.service';

@Component({
  templateUrl: './carte-delete-dialog.component.html'
})
export class CarteDeleteDialogComponent {
  carte?: ICarte;

  constructor(protected carteService: CarteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('carteListModification');
      this.activeModal.close();
    });
  }
}
