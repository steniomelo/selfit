import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { SacComponent } from './sac.component';

const routes: Routes = [
  {
    path: '',
    component: SacComponent,
    data: { title: extract('SAC') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SacRoutingModule {}
