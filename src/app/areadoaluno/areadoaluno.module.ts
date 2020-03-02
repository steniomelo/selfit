import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AreadoalunoRoutingModule } from './areadoaluno-routing.module';
import { AreadoalunoComponent } from './areadoaluno.component';
import { AreadoalunoHomeComponent } from './areadoaluno.home.component';
import { AreadoalunoMeuperfilComponent } from './areadoaluno.meuperfil.component';
import { AreadoalunoMeutreinoComponent } from './areadoaluno.meutreino.component';
import { AreadoalunoTransferenciaComponent } from './areadoaluno.transferencia.component';
import { AreadoalunoDocumentosComponent } from './areadoaluno.documentos.component';
import { AreadoalunoPagamentosComponent } from './areadoaluno.pagamentos.component';
import { AreadoalunoCancelamentoComponent } from './areadoaluno.cancelamento.component';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { SetSituacaoPipe } from '../shared/pipes/set-situacao.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    AreadoalunoRoutingModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxMaskModule
  ],
  declarations: [
    AreadoalunoComponent,
    AreadoalunoHomeComponent,
    AreadoalunoMeuperfilComponent,
    AreadoalunoMeutreinoComponent,
    AreadoalunoTransferenciaComponent,
    AreadoalunoDocumentosComponent,
    AreadoalunoPagamentosComponent,
    AreadoalunoCancelamentoComponent,
    SetSituacaoPipe
  ]
})
export class AreadoalunoModule {}
