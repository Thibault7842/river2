import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Etape2Component } from './etape-2.component';

export const ETAPE_2_ROUTE: Route = {
  path: 'etape-2',
  component: Etape2Component,
  data: {
    authorities: [],
    pageTitle: 'etape-2.title'
  },
  canActivate: [UserRouteAccessService]
};
