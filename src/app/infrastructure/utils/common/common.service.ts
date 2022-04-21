import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private eventEmit: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  public event(eventName: string, param?: any): void {
    this.eventEmit.emit({
      eventName,
      param
    });
  }

  public subscribe(actCode: string, func: any): any {
    return this.eventEmit.subscribe((value: any) => {
      if (value.eventName === actCode) {
        return func(value);
      } else {
        return func(null);
      }
    });
  }
}
