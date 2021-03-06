import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICarte } from 'app/shared/model/carte.model';
import { CarteService } from './carte.service';
import { CarteDeleteDialogComponent } from './carte-delete-dialog.component';

@Component({
  selector: 'jhi-carte',
  templateUrl: './carte.component.html'
})
export class CarteComponent implements OnInit, OnDestroy {
  cartes?: ICarte[];
  eventSubscriber?: Subscription;

  constructor(
    protected carteService: CarteService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.carteService.query().subscribe((res: HttpResponse<ICarte[]>) => {
      this.cartes = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCartes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICarte): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInCartes(): void {
    this.eventSubscriber = this.eventManager.subscribe('carteListModification', () => this.loadAll());
  }

  delete(carte: ICarte): void {
    const modalRef = this.modalService.open(CarteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.carte = carte;
  }
}
