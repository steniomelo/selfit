import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { environment } from '@env/environment';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { SharedService } from '@app/shared/services/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AreadoalunoService } from './areadoaluno.service';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-areadoaluno-transferencia',
  templateUrl: './areadoaluno.transferencia.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoTransferenciaComponent implements OnInit {
  credentials: any;
  unidades: Array<object> = [];
  unidadeSelected: any;
  unidadeSelectedPlano: any;
  transferenciaForm!: FormGroup;
  isLoading = false;
  @Output() atualizar = new EventEmitter();

  constructor(
    private credentialsService: CredentialsService,
    private authenticationService: AuthenticationService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private areadoalunoService: AreadoalunoService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.credentials = this.credentialsService.credentials;

    this.getUnidades();
    this.createForm();
  }

  private createForm() {
    this.transferenciaForm = this.formBuilder.group({
      unidade: ['', Validators.required],
      aceite: ['', Validators.required]
    });
  }

  getUnidades() {
    this.spinner.show();

    this.sharedService.getUnidades().subscribe(
      response => {
        console.log(response);
        this.unidades = response;
        this.spinner.hide();

        // const cidade = response.filter((x: any) => x.codigo == codigoCidade);
        // this.cidadeUsuario = cidade[0].nome;
      },
      error => {
        console.log(error);
      }
    );
  }

  selectUnidade() {
    this.unidadeSelected = this.transferenciaForm.get('unidade').value;
    console.log(this.unidadeSelected);
    this.unidadeSelectedPlano = this.unidadeSelected.unidadePlanos.filter(
      (x: any) => x.plano.nome == this.credentialsService.credentials.nomeplano
    );

    this.unidadeSelectedPlano = this.unidadeSelectedPlano[0];
    this.unidadeSelectedPlano.nome = this.unidadeSelected.nome;

    console.log(this.unidadeSelectedPlano);
  }

  confirmarTransferencia() {
    const data = {
      codigoEmpresaDestino: this.unidadeSelected.codigo,
      codigoCliente: this.credentials.codigo
    };

    this.spinner.show();

    this.areadoalunoService.transferirAluno(data).subscribe(
      response => {
        console.log(response);
        if (response.msgValidacao) {
          Swal.fire('Não foi possível transferir de unidade', response.msgValidacao, 'error');
        } else {
          Swal.fire('Sucesso', 'Sua transferência de unidade foi realizada com sucesso!', 'success');
          this.getDadosAtualizados();
        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();

        console.log(error);
      }
    );
  }

  getDadosAtualizados() {
    this.authenticationService.atualizarDados(this.credentials.cpf).subscribe(
      response => {
        this.authenticationService.consultarContrato(this.credentials.codigo, true).subscribe(
          response => {
            this.credentials = this.credentialsService.credentials;
            this.atualizar.emit(true);
          },
          error => {
            this.spinner.hide();

            console.log(error);
          }
        );
      },
      error => {
        this.spinner.hide();

        console.log(error);
      }
    );
  }
}
