import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setSituacao'
})
export class SetSituacaoPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let retorno: string;
    console.log(value);
    switch (value) {
      case 'AT':
        retorno = 'Ativo';
        break;
    }
    console.log(retorno);
    return retorno;
  }
}
