import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { RiverSharedModule } from 'app/shared/shared.module';
import { RiverCoreModule } from 'app/core/core.module';
import { RiverAppRoutingModule } from './app-routing.module';
import { RiverHomeModule } from './home/home.module';
import { RiverEntityModule } from './entities/entity.module';
import { RiverAppEtape2Module } from './etape-2/etape-2.module';
import { RiverAppEtape1Module } from './etape-1/etape-1.module';
import { RiverAppPageAcceuilModule } from './page-acceuil/page-acceuil.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    RiverSharedModule,
    RiverCoreModule,
    RiverHomeModule,
    RiverAppEtape2Module,
    RiverAppEtape1Module,
    RiverAppPageAcceuilModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    RiverEntityModule,
    RiverAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class RiverAppModule {}
