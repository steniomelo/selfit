import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HomeRoutingModule,
    AngularSvgIconModule,
    SlickCarouselModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
