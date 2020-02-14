import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  imports: [CommonModule, TranslateModule, HomeRoutingModule, AngularSvgIconModule, SlickCarouselModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
