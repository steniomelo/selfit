import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [CommonModule, NgxSpinnerModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent]
})
export class SharedModule {}
