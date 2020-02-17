import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { AselfitComponent } from './aselfit.component';

const routes: Routes = [
  {
    path: '',
    component: AselfitComponent,
    data: { title: extract('A Selfit') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AselfitRoutingModule {}
