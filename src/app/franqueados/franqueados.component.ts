import { Component, OnInit } from '@angular/core';
import { FaleconoscoService } from '@app/faleconosco/faleconosco.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-franqueados',
  templateUrl: './franqueados.component.html',
  styleUrls: ['./franqueados.component.scss']
})
export class FranqueadosComponent implements OnInit {
  form!: FormGroup;
  estados: any;
  cidades: any;

  constructor(
    private formBuilder: FormBuilder,
    private faleconoscoService: FaleconoscoService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.createForm();
    this.getEstados();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['', Validators.email],
      possuiInvestimentoInicial: ['', Validators.required],
      regiaoDeInteresse: ['', Validators.required],
      cidadeDeInteresse: ['', Validators.required]
    });
  }

  enviar() {
    const form$ = this.faleconoscoService.franqueados(this.form.value);
    form$
      .pipe(
        catchError((error): any => {
          Swal.fire('Erro', error, 'error');
        })
      )
      .subscribe(
        response => {
          Swal.fire('Mensagem enviada com sucesso', response.mesagem, 'success');
        },
        error => {
          console.log(error);
        }
      );
  }

  getEstados() {
    this.sharedService.getEstados().subscribe(
      response => {
        this.estados = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCidadesPorEstado() {
    this.sharedService.getCidadesPorEstado(this.form.get('regiaoDeInteresse').value.codigo).subscribe(
      response => {
        this.cidades = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
