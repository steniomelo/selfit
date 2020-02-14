import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { BuscaComponent } from './busca.component';

const routes: Routes = [{ path: '', component: BuscaComponent, data: { title: extract('Busca') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BuscaRoutingModule {}
