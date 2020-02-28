import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ICarte, Carte } from 'app/shared/model/carte.model';
import { CarteService } from './carte.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet/projet.service';

@Component({
  selector: 'jhi-carte-update',
  templateUrl: './carte-update.component.html'
})
export class CarteUpdateComponent implements OnInit {
  isSaving = false;

  projets: IProjet[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(3)]],
    description: [],
    landingimg: [null, [Validators.required]],
    landingimgContentType: [],
    projet: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected carteService: CarteService,
    protected projetService: ProjetService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carte }) => {
      this.updateForm(carte);

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

  updateForm(carte: ICarte): void {
    this.editForm.patchValue({
      id: carte.id,
      name: carte.name,
      description: carte.description,
      landingimg: carte.landingimg,
      landingimgContentType: carte.landingimgContentType,
      projet: carte.projet
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const carte = this.createFromForm();
    if (carte.id !== undefined) {
      this.subscribeToSaveResponse(this.carteService.update(carte));
    } else {
      this.subscribeToSaveResponse(this.carteService.create(carte));
    }
  }

  private createFromForm(): ICarte {
    return {
      ...new Carte(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      landingimgContentType: this.editForm.get(['landingimgContentType'])!.value,
      landingimg: this.editForm.get(['landingimg'])!.value,
      projet: this.editForm.get(['projet'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarte>>): void {
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
