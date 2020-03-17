import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FaleconoscoService } from './faleconosco.service';

import Swal from 'sweetalert2';
import { pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-faleconosco-home',
  templateUrl: './faleconosco.home.component.html',
  styleUrls: ['./faleconosco.component.scss']
})
export class FaleconoscoHomeComponent implements OnInit {
  faleconoscoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private faleconoscoService: FaleconoscoService) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.faleconoscoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      aluno: ['', Validators.required],
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  faleconosco() {
    const dados = {
      descricao: JSON.stringify(this.faleconoscoForm.value),
      token: 'P6VpxCC9Gg',
      empresa: 1,
      procedimentoCodigo: '486',
      usuario: 'wlm3rIMZHavKXsoiKWfUSg=='
    };

    const faleconosco$ = this.faleconoscoService.criarTicket(dados);
    faleconosco$
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
}
