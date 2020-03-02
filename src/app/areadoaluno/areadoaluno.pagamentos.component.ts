import { Component, OnInit } from '@angular/core';

import { CredentialsService } from '@app/core';
import { AreadoalunoService } from './areadoaluno.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-areadoaluno-pagamentos',
  templateUrl: './areadoaluno.pagamentos.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoPagamentosComponent implements OnInit {
  isCollapsed: any;
  isCollapsed1: any;
  isCollapsed2: any;
  credentials: any;
  parcelas: any;
  parcelasPagas: any;
  parcelasPendentes: any;
  cartaoForm!: FormGroup;
  numberCard: any;
  validade: any;
  nome: any;

  constructor(
    private credentialsService: CredentialsService,
    private areadoalunoService: AreadoalunoService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.credentials = this.credentialsService.credentials;
    this.getParcelas();
    this.createForm();
  }

  private createForm() {
    this.cartaoForm = this.formBuilder.group({
      codigocliente: [this.credentials.codigocliente],
      codigoempresa: [this.credentials.empresacliente],
      nometitularcartao: ['', Validators.required],
      cpftitular: ['', Validators.required],
      numerocartao: ['', Validators.required],
      validadecartao: ['', Validators.required],
      aceite: ['', Validators.required],
      operadoracartao: ['UNKNOWN']
    });
  }

  getParcelas() {
    this.spinner.show();
    this.areadoalunoService.getParcelas(this.credentials.codigocontrato).subscribe(
      response => {
        this.parcelas = response;

        this.parcelasPagas = this.parcelas.filter((x: any) => x.situacao == 'PG');
        this.parcelasPendentes = this.parcelas.filter((x: any) => x.situacao == 'EA');
        this.spinner.hide();

        console.log('Parcelas pagas', this.parcelasPagas);
        console.log('Parcelas pendentes', this.parcelasPendentes);
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  setCardnumber(e: any) {
    let res;
    if (e.length <= 4) {
      res = e;
    } else {
      res = e;
    }
    return (this.numberCard = res);
    //return setNumberCard(res);
  }

  setVencimento(e: any) {
    let res;
    if (e.length <= 4) {
      res = e;
    } else {
      res = e;
    }
    return (this.validade = res);
    //return setNumberCard(res);
  }

  setNome(e: any) {
    let res;
    if (e.length <= 4) {
      res = e;
    } else {
      res = e;
    }
    return (this.nome = res);
    //return setNumberCard(res);
  }

  alterarCartao() {
    this.spinner.show();

    this.areadoalunoService.alterarCartao(this.cartaoForm.value).subscribe(
      response => {
        console.log(response);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      }
    );
  }
}
