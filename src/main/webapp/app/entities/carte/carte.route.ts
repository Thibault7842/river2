import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICarte, Carte } from 'app/shared/model/carte.model';
import { CarteService } from './carte.service';
import { CarteComponent } from './carte.component';
import { CarteDetailComponent } from './carte-detail.component';
import { CarteUpdateComponent } from './carte-update.component';

@Injectable({ providedIn: 'root' })
export class CarteResolve implements Resolve<ICarte> {
  constructor(private service: CarteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICarte> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((carte: HttpResponse<Carte>) => {
          if (carte.body) {
            return of(carte.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Carte());
  }
}

export const carteRoute: Routes = [
  {
    path: '',
    component: CarteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.carte.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CarteDetailComponent,
    resolve: {
      carte: CarteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.carte.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CarteUpdateComponent,
    resolve: {
      carte: CarteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.carte.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CarteUpdateComponent,
    resolve: {
      carte: CarteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'riverApp.carte.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
