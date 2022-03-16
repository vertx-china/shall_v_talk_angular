import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import {MomentInput} from 'moment';

@Pipe({
  name: 'formNow'
})
export class FormNowPipe implements PipeTransform {

  transform(value: MomentInput, ...args: unknown[]): unknown {
    if (value) {
      return moment(value).fromNow();
    } else {
      return null;
    }
  }

}
