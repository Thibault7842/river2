import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPlan, Plan } from 'app/shared/model/plan.model';
import { PlanService } from './plan.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet/projet.service';

@Component({
  selector: 'jhi-plan-update',
  templateUrl: './plan-update.component.html'
})
export class PlanUpdateComponent implements OnInit {
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
    protected planService: PlanService,
    protected projetService: ProjetService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plan }) => {
      this.updateForm(plan);

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

  updateForm(plan: IPlan): void {
    this.editForm.patchValue({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      planimg: plan.planimg,
      planimgContentType: plan.planimgContentType,
      projet: plan.projet
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
    const plan = this.createFromForm();
    if (plan.id !== undefined) {
      this.subscribeToSaveResponse(this.planService.update(plan));
    } else {
      this.subscribeToSaveResponse(this.planService.create(plan));
    }
  }

  private createFromForm(): IPlan {
    return {
      ...new Plan(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      planimgContentType: this.editForm.get(['planimgContentType'])!.value,
      planimg: this.editForm.get(['planimg'])!.value,
      projet: this.editForm.get(['projet'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlan>>): void {
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
