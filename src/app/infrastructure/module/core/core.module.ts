import {NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../../app-routing.module';
import zh from '@angular/common/locales/zh';
import {ServiceModule} from '../service/service.module';
import {HashLocationStrategy, PathLocationStrategy, registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ViewsModule} from "../../../interfaces/views.module";
import {SharedModule} from "../shared/shared.module";

registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ServiceModule,
    ViewsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {provide: HashLocationStrategy, useClass: PathLocationStrategy}
  ]
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 只能被appModule引入');
    }
  }
}
