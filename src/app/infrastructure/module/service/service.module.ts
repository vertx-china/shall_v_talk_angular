import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoggingInterceptor} from "../../interceptors/logging.interceptor";

@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ],
  exports: []
})
export class ServiceModule {
}
