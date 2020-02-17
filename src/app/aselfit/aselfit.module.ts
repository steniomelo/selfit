import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AselfitRoutingModule } from './aselfit-routing.module';
import { AselfitComponent } from './aselfit.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [CommonModule, TranslateModule, AselfitRoutingModule, AngularSvgIconModule],
  declarations: [AselfitComponent]
})
export class AselfitModule {}
