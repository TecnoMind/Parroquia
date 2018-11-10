import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'customDate'})
export class CustomDatePipe implements PipeTransform {

  transform(value: string): string {
    moment.locale('es');

    return moment(value).format('LL');
  }
}