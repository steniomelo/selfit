import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { FranqueadosComponent } from './franqueados.component';

const routes: Routes = [{ path: '', component: FranqueadosComponent, data: { title: extract('Franqueados') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FranqueadosRoutingModule {}
