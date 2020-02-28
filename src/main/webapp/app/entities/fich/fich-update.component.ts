import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IFich, Fich } from 'app/shared/model/fich.model';
import { FichService } from './fich.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet/projet.service';

@Component({
  selector: 'jhi-fich-update',
  templateUrl: './fich-update.component.html'
})
export class FichUpdateComponent implements OnInit {
  isSaving = false;

  projets: IProjet[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    planimg: [null, [Validators.required]],
    planimgContentType: [],
    projet: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected fichService: FichService,
    protected projetService: ProjetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fich }) => {
      this.updateForm(fich);

      this.projetService
        .query()
        .pipe(
          map((res: HttpResponse<IProjet[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IProjet[]) => (this.projets = resBody));
    });
  }

  updateForm(fich: IFich): void {
    this.editForm.patchValue({
      id: fich.id,
      name: fich.name,
      description: fich.description,
      planimg: fich.planimg,
      planimgContentType: fich.planimgContentType,
      projet: fich.projet
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('riverApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fich = this.createFromForm();
    if (fich.id !== undefined) {
      this.subscribeToSaveResponse(this.fichService.update(fich));
    } else {
      this.subscribeToSaveResponse(this.fichService.create(fich));
    }
  }

  private createFromForm(): IFich {
    return {
      ...new Fich(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      planimgContentType: this.editForm.get(['planimgContentType'])!.value,
      planimg: this.editForm.get(['planimg'])!.value,
      projet: this.editForm.get(['projet'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFich>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IProjet): any {
    return item.id;
  }
}
