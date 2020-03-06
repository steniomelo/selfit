import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FranqueadosRoutingModule } from './franqueados-routing.module';
import { FranqueadosComponent } from './franqueados.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    NgxSpinnerModule
  ],
  declarations: [FranqueadosComponent]
})
export class FranqueadosModule {}
