import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substr'
})
export class SubstrPipe implements PipeTransform {
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
