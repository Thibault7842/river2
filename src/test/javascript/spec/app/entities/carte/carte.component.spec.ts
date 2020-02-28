import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RiverTestModule } from '../../../test.module';
import { CarteComponent } from 'app/entities/carte/carte.component';
import { CarteService } from 'app/entities/carte/carte.service';
import { Carte } from 'app/shared/model/carte.model';

describe('Component Tests', () => {
  describe('Carte Management Component', () => {
    let comp: CarteComponent;
    let fixture: ComponentFixture<CarteComponent>;
    let service: CarteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RiverTestModule],
        declarations: [CarteComponent],
        providers: []
      })
        .overrideTemplate(CarteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CarteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Carte(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cartes && comp.cartes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
