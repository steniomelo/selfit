import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FaleconoscoRoutingModule } from './faleconosco-routing.module';
import { FaleconoscoComponent } from './faleconosco.component';
import { FaleconoscoHomeComponent } from './faleconosco.home.component';
import { FaleconoscoDivulgueComponent } from './faleconosco.divulgue.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [CommonModule, TranslateModule, FaleconoscoRoutingModule, AngularSvgIconModule],
  declarations: [FaleconoscoComponent, FaleconoscoHomeComponent, FaleconoscoDivulgueComponent]
})
export class FaleconoscoModule {}
