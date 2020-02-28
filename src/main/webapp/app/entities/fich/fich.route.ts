import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFich, Fich } from 'app/shared/model/fich.model';
import { FichService } from './fich.service';
import { FichComponent } from './fich.component';
import { FichDetailComponent } from './fich-detail.component';
import { FichUpdateComponent } from './fich-update.component';

@Injectable({ providedIn: 'root' })
export class FichResolve implements Resolve<IFich> {
  constructor(private service: FichService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFich> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fich: HttpResponse<Fich>) => {
          if (fich.body) {
            return of(fich.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Fich());
  }
}

export const fichRoute: Routes = [
  {
    path: '',
    component: FichComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.fich.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FichDetailComponent,
    resolve: {
      fich: FichResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.fich.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FichUpdateComponent,
    resolve: {
      fich: FichResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.fich.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FichUpdateComponent,
    resolve: {
      fich: FichResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.fich.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
