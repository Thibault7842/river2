import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'projet',
        loadChildren: () => import('./projet/projet.module').then(m => m.RiverProjetModule)
      },
      {
        path: 'carte',
        loadChildren: () => import('./carte/carte.module').then(m => m.RiverCarteModule)
      },
      {
        path: 'plan',
        loadChildren: () => import('./plan/plan.module').then(m => m.RiverPlanModule)
      },
      {
        path: 'fich',
        loadChildren: () => import('./fich/fich.module').then(m => m.RiverFichModule)
      },
      {
        path: 'post',
        loadChildren: () => import('./post/post.module').then(m => m.RiverPostModule)
      },
      {
        path: 'tag',
        loadChildren: () => import('./tag/tag.module').then(m => m.RiverTagModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class RiverEntityModule {}
