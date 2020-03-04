import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { MatriculaComponent } from './matricula.component';

const routes: Routes = [{ path: '', component: MatriculaComponent, data: { title: extract('Matrícula') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MatriculaRoutingModule {}
