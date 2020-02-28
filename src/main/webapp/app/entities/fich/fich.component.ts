import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFich } from 'app/shared/model/fich.model';
import { FichService } from './fich.service';
import { FichDeleteDialogComponent } from './fich-delete-dialog.component';

@Component({
  selector: 'jhi-fich',
  templateUrl: './fich.component.html'
})
export class FichComponent implements OnInit, OnDestroy {
  fiches?: IFich[];
  eventSubscriber?: Subscription;

  constructor(
    protected fichService: FichService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.fichService.query().subscribe((res: HttpResponse<IFich[]>) => {
      this.fiches = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFiches();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFich): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInFiches(): void {
    this.eventSubscriber = this.eventManager.subscribe('fichListModification', () => this.loadAll());
  }

  delete(fich: IFich): void {
    const modalRef = this.modalService.open(FichDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fich = fich;
  }
}
