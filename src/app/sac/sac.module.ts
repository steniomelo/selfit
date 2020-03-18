import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SacRoutingModule } from './sac-routing.module';
import { SacComponent } from './sac.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [CommonModule, TranslateModule, SacRoutingModule, AngularSvgIconModule],
  declarations: [SacComponent]
})
export class SacModule {}
