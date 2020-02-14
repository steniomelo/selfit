import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { UnidadeRoutingModule } from './unidade-routing.module';
import { UnidadeComponent } from './unidade.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  imports: [CommonModule, TranslateModule, UnidadeRoutingModule, AngularSvgIconModule, SlickCarouselModule],
  declarations: [UnidadeComponent]
})
export class UnidadeModule {}
