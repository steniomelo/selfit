import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start.component';

@NgModule({
  imports: [CommonModule, TranslateModule, StartRoutingModule],
  declarations: [StartComponent]
})
export class StartModule {}
