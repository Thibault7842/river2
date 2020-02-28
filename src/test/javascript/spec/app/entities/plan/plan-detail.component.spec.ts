import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { RiverTestModule } from '../../../test.module';
import { PlanDetailComponent } from 'app/entities/plan/plan-detail.component';
import { Plan } from 'app/shared/model/plan.model';

describe('Component Tests', () => {
  describe('Plan Management Detail Component', () => {
    let comp: PlanDetailComponent;
    let fixture: ComponentFixture<PlanDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ plan: new Plan(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RiverTestModule],
        declarations: [PlanDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlanDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlanDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load plan on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.plan).toEqual(jasmine.objectContaining({ id: 123 }));
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
