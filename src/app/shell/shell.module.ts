import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [CommonModule, TranslateModule, NgbModule, RouterModule, AngularSvgIconModule],
  declarations: [HeaderComponent, FooterComponent, ShellComponent]
})
export class ShellModule {}
