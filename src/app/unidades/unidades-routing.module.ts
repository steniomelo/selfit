import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { UnidadesComponent } from './unidades.component';
import { UnidadeComponent } from './unidade.component';
import { UnidadesListarComponent } from './unidades.listar.component';

const routes: Routes = [
  {
    path: '',
    component: UnidadesComponent,
    children: [
      { path: '', component: UnidadesListarComponent },
      { path: ':uf', component: UnidadesListarComponent },
      { path: 'unidade/:slug', component: UnidadeComponent }
    ],
    data: { title: extract('Unidades') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UnidadesRoutingModule {}
