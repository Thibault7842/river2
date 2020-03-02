import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Etape1Component } from './etape-1.component';

export const ETAPE_1_ROUTE: Route = {
  path: 'etape-1',
  component: Etape1Component,
  data: {
    authorities: [],
    pageTitle: 'etape-1.title'
  },
  canActivate: [UserRouteAccessService]
};
