import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FaleconoscoService } from './faleconosco.service';
import Swal from 'sweetalert2';
import { pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-faleconosco-divulgue',
  templateUrl: './faleconosco.divulgue.component.html',
  styleUrls: ['./faleconosco.component.scss']
})
export class FaleconoscoDivulgueComponent implements OnInit {
  divulgueForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private faleconoscoService: FaleconoscoService) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.divulgueForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      telefone: ['', Validators.required],
      site: ['', Validators.required],
      proposta: ['', Validators.required]
    });
  }

  divulgueSuamarca() {
    const divulgue$ = this.faleconoscoService.divulgueSuamarca(this.divulgueForm.value);
    divulgue$
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
