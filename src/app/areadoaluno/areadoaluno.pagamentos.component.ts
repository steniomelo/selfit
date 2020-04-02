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

  gerarBoletoParcela(parcela: any) {
    this.spinner.show();
    this.areadoalunoService
      .gerarBoletoParcela(this.credentialsService.credentials.codigopessoa, parcela.codigo)
      .subscribe(
        response => {
          console.log(response);
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

  getCardFlag(cardnumber: any) {
    var cardnumber = cardnumber.replace(/[^0-9]+/g, '');

    var cards = {
      visa: /^4[0-9]{12}(?:[0-9]{3})/,
      mastercard: /^5[1-5][0-9]{14}/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
      amex: /^3[47][0-9]{13}/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
      hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
      elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}/,
      aura: /^(5078\d{2})(\d{2})(\d{11})$/
    };

    for (var flag in cards) {
      if (cards[flag].test(cardnumber)) {
        return flag;
      }
    }

    return false;
  }

  alterarCartao() {
    this.spinner.show();

    this.cartaoForm.controls['operadoracartao'].setValue(
      this.getCardFlag(this.cartaoForm.controls['numerocartao'].value)
    );

    console.log(this.cartaoForm.controls['operadoracartao'].value);

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
