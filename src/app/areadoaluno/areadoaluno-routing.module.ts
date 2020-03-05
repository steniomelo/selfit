import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@app/core';

import { extract } from '@app/core';
import { AreadoalunoComponent } from './areadoaluno.component';
import { AreadoalunoHomeComponent } from './areadoaluno.home.component';
import { AreadoalunoMeuperfilComponent } from './areadoaluno.meuperfil.component';
import { AreadoalunoMeutreinoComponent } from './areadoaluno.meutreino.component';
import { AreadoalunoTransferenciaComponent } from './areadoaluno.transferencia.component';
import { AreadoalunoDocumentosComponent } from './areadoaluno.documentos.component';
import { AreadoalunoPagamentosComponent } from './areadoaluno.pagamentos.component';
import { AreadoalunoCancelamentoComponent } from './areadoaluno.cancelamento.component';
import { AreadoalunoDetalhesComponent } from './areadoaluno.detalhes.component';
import { AreadoalunoSelfmoveComponent } from './areadoaluno.selfmove.component';

const routes: Routes = [
  {
    path: '',
    component: AreadoalunoComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: AreadoalunoHomeComponent },
      { path: 'meuperfil', component: AreadoalunoMeuperfilComponent },
      { path: 'meutreino', component: AreadoalunoMeutreinoComponent },
      { path: 'transferencia', component: AreadoalunoTransferenciaComponent },
      { path: 'documentos', component: AreadoalunoDocumentosComponent },
      { path: 'pagamentos', component: AreadoalunoPagamentosComponent },
      { path: 'cancelamento', component: AreadoalunoCancelamentoComponent },
      { path: 'detalhes', component: AreadoalunoDetalhesComponent },
      { path: 'selfmove', component: AreadoalunoSelfmoveComponent }
    ],
    data: { title: extract('Área do Aluno') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AreadoalunoRoutingModule {}
