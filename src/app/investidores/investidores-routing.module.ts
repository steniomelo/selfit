import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { InvestidoresComponent } from './investidores.component';

const routes: Routes = [{ path: '', component: InvestidoresComponent, data: { title: extract('Investidores') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FranqueadosRoutingModule {}
