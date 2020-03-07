import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '@app/shared/services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatriculaService } from './matricula.service';
import { AuthenticationService } from '@app/core';
import { finalize, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss']
})
export class MatriculaComponent implements OnInit {
  etapa: number = 1;
  unidade: any;
  plano: any;
  dataRenovacao: any;
  parcelas: any = [];
  matriculaForm1!: FormGroup;
  matriculaForm2!: FormGroup;
  formaDePagamento: any = 'cartao';
  private senhaGerada: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private matriculaService: MatriculaService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    const nav = this.router.getCurrentNavigation();
    this.unidade = nav.extras.state.unidade;
    this.plano = nav.extras.state.plano;
  }

  ngOnInit() {
    console.log(this.unidade);
    console.log(this.plano);

    this.setDataRenovacao();
    this.setParcelas();
    this.createForm();
  }

  private createForm() {
    this.matriculaForm1 = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      datanasc: ['', Validators.required],
      cpf: ['', Validators.required],
      genero: ['', Validators.required],
      celular: ['', Validators.required]
    });
    this.matriculaForm2 = this.formBuilder.group({
      cep: ['', Validators.required],
      end: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      cpftitular: ['', Validators.required],
      nomecartao: ['', Validators.required],
      numerocartao: ['', Validators.required],
      vencimento: ['', Validators.required],
      // parcela: ['', Validators.required],
      aceite: [false, Validators.requiredTrue]
    });
  }

  setDataRenovacao() {
    this.dataRenovacao = moment(Date.now())
      .add(1, 'year')
      .format('DD/MM/YYYY');
    console.log(this.dataRenovacao);
  }

  setParcelas() {
    let i;
    for (i = 1; i < 13; i++) {
      this.parcelas.push({
        nome: 'Parcela ' + i,
        valor: this.plano.mensalidade
      });
    }

    console.log(this.parcelas);
  }

  getCep(cep: number) {
    this.spinner.show();

    this.sharedService.getCep(cep).subscribe(
      response => {
        this.matriculaForm2.controls['end'].setValue(response.logradouro);
        this.matriculaForm2.controls['bairro'].setValue(response.bairro);
        this.matriculaForm2.controls['estado'].setValue(response.uf);
        this.matriculaForm2.controls['cidade'].setValue(response.localidade);
        this.spinner.hide();
      },
      error => {
        console.log('ERRO', error);
      }
    );
  }

  changePayment(value: any) {
    if (value == 'ngb-nav-0') {
      this.formaDePagamento = 'cartão';
      this.matriculaForm2.controls['cpftitular'].setValidators([Validators.required]);
      this.matriculaForm2.controls['nomecartao'].setValidators([Validators.required]);
      this.matriculaForm2.controls['numerocartao'].setValidators([Validators.required]);
      this.matriculaForm2.controls['vencimento'].setValidators([Validators.required]);
      // this.matriculaForm2.controls['parcela'].setValidators([Validators.required]);
    } else if (value == 'ngb-nav-1') {
      this.formaDePagamento = 'boleto';
      this.matriculaForm2.controls['cpftitular'].setValidators(null);
      this.matriculaForm2.controls['nomecartao'].setValidators(null);
      this.matriculaForm2.controls['numerocartao'].setValidators(null);
      this.matriculaForm2.controls['vencimento'].setValidators(null);
      // this.matriculaForm2.controls['parcela'].setValidators(null);
    }

    this.matriculaForm2.controls['cpftitular'].updateValueAndValidity();
    this.matriculaForm2.controls['nomecartao'].updateValueAndValidity();
    this.matriculaForm2.controls['numerocartao'].updateValueAndValidity();
    this.matriculaForm2.controls['vencimento'].updateValueAndValidity();
    // this.matriculaForm2.controls['parcela'].updateValueAndValidity();
  }

  getRandomNum(lbound: any, ubound: any) {
    return Math.floor(Math.random() * (ubound - lbound)) + lbound;
  }

  getRandomChar(number: any, lower: any, upper: any, other: any, extra: any) {
    const numberChars = '0123456789';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const otherChars = '`~!@#$%^&*()-_=+[{]}\\|;:\'",<.>/? ';
    let charSet = extra;
    if (number == true) charSet += numberChars;
    if (lower == true) charSet += lowerChars;
    if (upper == true) charSet += upperChars;
    if (other == true) charSet += otherChars;
    return charSet.charAt(this.getRandomNum(0, charSet.length));
  }

  getPassword(
    length: any,
    extraChars: any,
    firstNumber: any,
    firstLower: any,
    firstUpper: any,
    firstOther: any,
    latterNumber: any,
    latterLower: any,
    latterUpper: any,
    latterOther: any
  ) {
    let rc = '';
    if (length > 0) rc += this.getRandomChar(firstNumber, firstLower, firstUpper, firstOther, extraChars);
    for (let idx = 1; idx < length; ++idx) {
      rc += this.getRandomChar(latterNumber, latterLower, latterUpper, latterOther, extraChars);
    }
    return rc;
  }

  efetuarMatricula() {
    this.senhaGerada = this.getPassword(6, '', true, true, true, false, true, true, true, false);

    const dadosCliente = {
      nome: this.matriculaForm1.controls['nome'].value,
      cpf: this.matriculaForm1.controls['cpf'].value,
      email: this.matriculaForm1.controls['email'].value,
      sexo: this.matriculaForm1.controls['genero'].value,
      dataNascimento: this.matriculaForm1.controls['datanasc'].value,
      endereco: this.matriculaForm2.controls['end'].value,
      complemento: this.matriculaForm2.controls['complemento'].value,
      numero: this.matriculaForm2.controls['numero'].value,
      bairro: this.matriculaForm2.controls['bairro'].value,
      cep: this.matriculaForm2.controls['cep'].value,
      telCelular: this.matriculaForm1.controls['celular'].value,
      telResidencial: this.matriculaForm1.controls['celular'].value,
      senha: this.senhaGerada
      // codigoCidade: informacoesPessoais.cidade,
      // codigoEstado: informacoesPessoais.estado,
      // nomePai: informacoesPessoais.nomePai,
      // nomeMae: informacoesPessoais.nomeMae
    };

    const dados = {
      plano: this.plano.hash,
      nrParcelasAdesao: 1,
      numeroCupomDesconto: '',
      nrParcelasPagamento: 1,
      tamanhoCamisa: '',
      idEmpresaFinanceiroRede: this.unidade.id_unidade_pacto,
      formaPagamentoCartao: this.formaDePagamento === 'cartao',
      cartaoCreditoTO: {},
      clienteTO: dadosCliente,
      contratoTO: {
        codigoEmpresaProself: this.unidade.codigo
      }
    };

    if (this.formaDePagamento === 'cartão') {
      const cartaoCredito = {
        operadoraCartao: '',
        numeroCartao: this.matriculaForm2.controls['numerocartao'].value,
        validadeCartao: this.matriculaForm2.controls['vencimento'].value,
        cpfTitular: this.matriculaForm2.controls['cpftitular'].value,
        titularCartao: this.matriculaForm2.controls['nomecartao'].value,
        operadoraCartaoSegundaOpcao: '',
        nomeTitularCartaoSegundaOpcao: '',
        cpfTitularCartaoSegundaOpcao: '',
        numeroCartaoSegundaOpcao: '',
        validadeCartaoSegundaOpcao: '',
        cvvSegundaOpcao: ''
      };

      dados.cartaoCreditoTO = cartaoCredito;
    }

    this.spinner.show();

    console.log('Dados a serem enviados', dados);
    this.matriculaService.novoContrato(dados).subscribe(
      response => {
        this.login();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        console.log('ERRO', error);
      }
    );
  }

  login() {
    const login = {
      email: this.matriculaForm1.controls['email'].value,
      senha: this.senhaGerada
    };
    const login$ = this.authenticationService.login(login);
    login$.subscribe(
      response => {
        console.log('Logou', response);

        this.consultarContrato(response.codigo, response.remember);
        if (this.formaDePagamento === 'boleto') {
          this.gerarBoleto(response.codigocliente, response.codigocontrato, this.plano.hash);
        } else {
          this.router.navigate([this.route.snapshot.queryParams.redirect || '/areadoaluno'], {
            replaceUrl: true
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  consultarContrato(codigo: number, remember: any) {
    this.authenticationService.consultarContrato(codigo, remember).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  gerarBoleto(codigoCliente: number, codigoContrato: number, hash: any) {
    const dadosGeracaoBoleto = {
      codigoCliente: codigoCliente,
      codigoContrato: codigoContrato
    };
    this.matriculaService.gerarBoleto(dadosGeracaoBoleto, hash).subscribe(
      response => {
        console.log('GERADO BOLETO', response);
        //return (window.location.href = response);
        this.router.navigate([this.route.snapshot.queryParams.redirect || '/areadoaluno'], {
          replaceUrl: true
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  setEtapa(etapa: number) {
    this.etapa = etapa;
    window.scrollTo(0, 0);
  }
}
