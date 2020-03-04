import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UnidadeBuscaComponent } from './components/unidade.busca.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, NgxSpinnerModule, NgbModule, RouterModule],
  declarations: [LoaderComponent, UnidadeBuscaComponent],
  exports: [LoaderComponent, UnidadeBuscaComponent]
})
export class SharedModule {}
