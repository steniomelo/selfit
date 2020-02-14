import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { UnidadeComponent } from './unidade.component';

const routes: Routes = [{ path: '', component: UnidadeComponent, data: { title: extract('Busca') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UnidadeRoutingModule {}
