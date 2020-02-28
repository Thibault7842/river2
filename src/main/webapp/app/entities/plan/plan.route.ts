import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPlan, Plan } from 'app/shared/model/plan.model';
import { PlanService } from './plan.service';
import { PlanComponent } from './plan.component';
import { PlanDetailComponent } from './plan-detail.component';
import { PlanUpdateComponent } from './plan-update.component';

@Injectable({ providedIn: 'root' })
export class PlanResolve implements Resolve<IPlan> {
  constructor(private service: PlanService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlan> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((plan: HttpResponse<Plan>) => {
          if (plan.body) {
            return of(plan.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Plan());
  }
}

export const planRoute: Routes = [
  {
    path: '',
    component: PlanComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.plan.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlanDetailComponent,
    resolve: {
      plan: PlanResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.plan.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlanUpdateComponent,
    resolve: {
      plan: PlanResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.plan.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlanUpdateComponent,
    resolve: {
      plan: PlanResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.plan.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
