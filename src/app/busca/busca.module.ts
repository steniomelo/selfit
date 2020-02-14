import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { BuscaRoutingModule } from './busca-routing.module';
import { BuscaComponent } from './busca.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  imports: [CommonModule, TranslateModule, BuscaRoutingModule, AngularSvgIconModule, SlickCarouselModule],
  declarations: [BuscaComponent]
})
export class BuscaModule {}
