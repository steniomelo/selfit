import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FranqueadosRoutingModule } from './investidores-routing.module';
import { InvestidoresComponent } from './investidores.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FranqueadosRoutingModule,
    AngularSvgIconModule,
    SlickCarouselModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgxSpinnerModule,
    ScrollToModule
  ],
  declarations: [InvestidoresComponent]
})
export class InvestidoresModule {}
