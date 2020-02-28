import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { RiverTestModule } from '../../../test.module';
import { FichDetailComponent } from 'app/entities/fich/fich-detail.component';
import { Fich } from 'app/shared/model/fich.model';

describe('Component Tests', () => {
  describe('Fich Management Detail Component', () => {
    let comp: FichDetailComponent;
    let fixture: ComponentFixture<FichDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ fich: new Fich(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RiverTestModule],
        declarations: [FichDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FichDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FichDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load fich on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fich).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
