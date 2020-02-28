import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RiverTestModule } from '../../../test.module';
import { FichComponent } from 'app/entities/fich/fich.component';
import { FichService } from 'app/entities/fich/fich.service';
import { Fich } from 'app/shared/model/fich.model';

describe('Component Tests', () => {
  describe('Fich Management Component', () => {
    let comp: FichComponent;
    let fixture: ComponentFixture<FichComponent>;
    let service: FichService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RiverTestModule],
        declarations: [FichComponent],
        providers: []
      })
        .overrideTemplate(FichComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FichComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FichService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Fich(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fiches && comp.fiches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
