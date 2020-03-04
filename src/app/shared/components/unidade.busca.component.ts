import { Component, OnInit } from '@angular/core';
import { UnidadesService } from '../../unidades/unidades.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-unidade-busca',
  templateUrl: './unidade.busca.component.html',
  styleUrls: ['./unidade.busca.component.scss']
})
export class UnidadeBuscaComponent implements OnInit {
  estados: any = [];
  public model: any;
  inputvalue: string;

  constructor(private unidadesService: UnidadesService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.getEstados();
  }

  getEstados() {
    this.spinner.show();

    this.unidadesService.getEstados().subscribe(
      response => {
        this.estados = response;
        this.spinner.hide();
      },
      error => {
        console.log('ERRO', error);
      }
    );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2
          ? []
          : this.estados.filter((v: any) => v.nome.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    );

  formatter = (x: { nome: string }) => x.nome;

  setInputValue(e: any) {
    //console.log(e);
    if (e.sigla) {
      this.inputvalue = e.sigla;
    } else if (Number(e)) {
      this.inputvalue = e;
    }

    console.log('Input value', this.inputvalue);
  }
}
