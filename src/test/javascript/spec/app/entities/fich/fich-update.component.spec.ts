import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RiverTestModule } from '../../../test.module';
import { FichUpdateComponent } from 'app/entities/fich/fich-update.component';
import { FichService } from 'app/entities/fich/fich.service';
import { Fich } from 'app/shared/model/fich.model';

describe('Component Tests', () => {
  describe('Fich Management Update Component', () => {
    let comp: FichUpdateComponent;
    let fixture: ComponentFixture<FichUpdateComponent>;
    let service: FichService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RiverTestModule],
        declarations: [FichUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FichUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FichUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FichService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fich(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fich();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
