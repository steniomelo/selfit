import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { FaleconoscoComponent } from './faleconosco.component';
import { FaleconoscoHomeComponent } from './faleconosco.home.component';
import { FaleconoscoDivulgueComponent } from './faleconosco.divulgue.component';

const routes: Routes = [
  {
    path: '',
    component: FaleconoscoComponent,
    children: [
      { path: '', component: FaleconoscoHomeComponent },
      { path: 'divulgue', component: FaleconoscoDivulgueComponent }
    ],
    data: { title: extract('Fale conosco') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FaleconoscoRoutingModule {}
