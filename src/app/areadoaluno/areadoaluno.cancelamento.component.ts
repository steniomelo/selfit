import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { AreadoalunoService } from './areadoaluno.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CredentialsService } from '@app/core';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-areadoaluno-cancelamento',
  templateUrl: './areadoaluno.cancelamento.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoCancelamentoComponent implements OnInit {
  valorCancelamento: any;
  valorCancelamentoSub: Subscription;
  cancelamentoForm!: FormGroup;
  credentials: any;
  contratoCancelado: any;

  constructor(
    private areadoalunoService: AreadoalunoService,
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.credentials = this.credentialsService.credentials;
    this.getValorCancelamento(this.credentials.codigocontrato);
    this.createForm();
  }

  ngOnDestroy() {
    this.valorCancelamentoSub.unsubscribe();
  }

  private createForm() {
    this.cancelamentoForm = this.formBuilder.group({
      motivo: ['', Validators.required]
    });
  }

  getValorCancelamento(codigoContrato: number) {
    this.spinner.show();

    this.valorCancelamentoSub = this.areadoalunoService.consultarValorCancelamento(codigoContrato).subscribe(
      response => {
        this.valorCancelamento = response.dados;
        if (!this.valorCancelamento) {
          this.contratoCancelado = response.mensagemResponseTO.descricao;
          Swal.fire('Aviso', response.mensagemResponseTO.descricao, 'warning');
        }
        this.spinner.hide();
      },
      error => {
        console.log(error);
      }
    );
  }

  validarMotivo() {
    let bool = false;
    console.log(this.cancelamentoForm.get('motivo').value);
    switch (this.cancelamentoForm.get('motivo').value) {
      case '1':
        Swal.fire('Aviso', 'O motivo no qual você selecionou. Deve ser cancelado direto na unidade.', 'warning');
        bool = false;
        break;
      case '2':
        Swal.fire('Aviso', 'O motivo no qual você selecionou. Deve ser cancelado direto na unidade.', 'warning');
        bool = true;
        break;
      default:
        if (!this.credentials.plano.pagarcomboleto) {
          Swal.fire({
            title: 'Tem certeza que deseja cancelar ?',
            text:
              'Se o motivo do cancelamento for mudança de cidade ou questões médicas, o mesmo deverá ser feito diretamente na sua unidade.',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#ccc',
            confirmButtonText: 'Efetuar cancelamento',
            allowOutsideClick: () => !Swal.isLoading()
          }).then(result => {
            console.log('Result', result);
            console.log('Credentials', this.credentials);
            if (result.value) {
              this.spinner.show();

              return this.areadoalunoService.cancelarContrato(this.credentials.codigocontrato).subscribe(
                response => {
                  if (response.mensagemResponseTO.erro) {
                    Swal.fire('Erro', response.mensagemResponseTO.descricao, 'error');
                    this.spinner.hide();
                  } else {
                    Swal.fire('Ok!', 'Solicitação de cancelamento realizada com sucesso', 'success');
                    this.spinner.hide();
                  }
                  return response;
                },
                error => {
                  console.log(error);
                }
              );

              Swal.fire('Ok!', 'Solicitação de cancelamento realizada com sucesso', 'success');
              // this.return.emit(this.request.moedaId);
              //this.msgReturn(this.request.moedaId);
            }
          });
        } else {
          Swal.fire(
            'Atenção',
            'Clientes com o pagamento de boletos precisam se dirigir até a academia para efetuação do cancelamento. Obrigado.',
            'warning'
          );
        }
    }

    return bool;
  }

  confirmarCancelamento() {
    if (this.validarMotivo()) {
      console.log('True');
    } else {
      console.log('False');
    }
  }
}
