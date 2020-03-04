import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades.component';
import { UnidadeComponent } from './unidade.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UnidadesListarComponent } from './unidades.listar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    UnidadesRoutingModule,
    AngularSvgIconModule,
    SlickCarouselModule,
    NgxSpinnerModule,
    NgbModule,
    SharedModule
  ],
  declarations: [UnidadesComponent, UnidadesListarComponent, UnidadeComponent]
})
export class UnidadesModule {}
