import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Credentials, CredentialsService } from '@app/core/authentication/credentials.service';
import { SharedService } from '@app/shared/services/shared.service';
import { AreadoalunoService } from '@app/areadoaluno/areadoaluno.service';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '@app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-areadoaluno-meuperfil',
  templateUrl: './areadoaluno.meuperfil.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoMeuperfilComponent implements OnInit {
  editing: boolean = false;
  credentials: any;
  estados: any = [];
  cidades: any = [];
  cidadesSelect: any = [];
  editForm!: FormGroup;
  estadoUsuario: string;
  cidadeUsuario: string;

  constructor(
    private credentialsService: CredentialsService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private areadoalunoService: AreadoalunoService
  ) {}

  ngOnInit() {
    this.credentials = this.credentialsService.credentials;
    this.setEstadoUsuario(this.credentials.codigoEstado);
    this.setCidadeUsuario(this.credentials.codigoEstado, this.credentials.codigoCidade);
    this.createForm();
  }

  private createForm() {
    this.editForm = this.formBuilder.group({
      codigoPessoa: [this.credentials.codigopessoa],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      datanasc: ['', Validators.required],
      sexo: ['', Validators.required],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      telcelular: ['', Validators.required]
    });
  }

  setEstadoUsuario(codigoEstado: number) {
    this.sharedService
      .getEstados()
      .pipe(
        finalize(() => {
          //this.isLoading = false;
        })
      )
      .subscribe(
        response => {
          this.estados = response;

          const estado = response.filter((x: any) => x.codigo == codigoEstado);
          console.log('Estado', estado);
          this.editForm.controls['estado'].setValue(estado[0], { onlySelf: true });
          this.estadoUsuario = estado[0].nome;
        },
        error => {
          console.log(error);
        }
      );
  }

  setCidadeUsuario(codigoEstado: number, codigoCidade: number) {
    console.log(codigoEstado);
    console.log(codigoCidade);
    this.sharedService.getCidadesPorEstado(codigoEstado).subscribe(
      response => {
        this.cidadesSelect = response;

        console.log(this.cidades);

        const cidade = response.filter((x: any) => x.codigo == codigoCidade);
        console.log(cidade);
        this.editForm.controls['cidade'].setValue(cidade[0], { onlySelf: true });

        this.cidadeUsuario = cidade[0].nome;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCidadesPorEstado() {
    console.log('evento', this.editForm.get('estado').value);
    this.sharedService
      .getCidadesPorEstado(this.editForm.get('estado').value.codigo)
      .pipe(
        finalize(() => {
          //this.isLoading = false;
        })
      )
      .subscribe(
        response => {
          this.cidadesSelect = response;
        },
        error => {
          console.log(error);
        }
      );
  }

  editarPerfil() {
    this.areadoalunoService
      .editarPerfil(this.editForm.value)
      .pipe(
        finalize(() => {
          //this.isLoading = false;
        })
      )
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }
}
