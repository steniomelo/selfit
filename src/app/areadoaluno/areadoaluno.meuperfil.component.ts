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
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.credentials = this.credentialsService.credentials;
    this.setEstadoUsuario(this.credentials.codigoEstado);
    this.setCidadeUsuario(this.credentials.codigoEstado, this.credentials.codigoCidade);
  }

  private createForm() {
    this.editForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      nascimento: ['', Validators.required],
      genero: ['', Validators.required],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      enderecoNumero: ['', Validators.required],
      enderecoComplemento: ['', Validators.required],
      enderecoBairro: ['', Validators.required],
      enderecoEstado: ['', Validators.required],
      enderecoCidade: ['', Validators.required],
      celular: ['', Validators.required]
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
          this.estadoUsuario = estado[0].nome;
        },
        error => {
          console.log(error);
        }
      );
  }

  setCidadeUsuario(codigoEstado: number, codigoCidade: number) {
    this.sharedService
      .getCidadesPorEstado(codigoEstado)
      .pipe(
        finalize(() => {
          //this.isLoading = false;
        })
      )
      .subscribe(
        response => {
          this.cidades = response;

          console.log(this.cidades);

          const cidade = response.filter((x: any) => x.codigo == codigoCidade);
          this.cidadeUsuario = cidade[0].nome;
        },
        error => {
          console.log(error);
        }
      );
  }

  getCidadesPorEstado(codigoEstado: any) {
    console.log('evento', codigoEstado);
    this.sharedService
      .getCidadesPorEstado(codigoEstado)
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
      .getCidadesPorEstado(this.editForm.value)
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
}
