import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PageAcceuilComponent } from './page-acceuil.component';

export const PAGE_ACCEUIL_ROUTE: Route = {
  path: 'page-acceuil',
  component: PageAcceuilComponent,
  data: {
    authorities: [],
    pageTitle: 'page-acceuil.title'
  },
  canActivate: [UserRouteAccessService]
};
