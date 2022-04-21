import {NgModule} from '@angular/core';
import {InitRoutingModule} from "./init-routing.module";
import {InitComponent} from "./init.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    InitComponent
  ],
  imports: [
    InitRoutingModule,
    CommonModule,
    FormsModule,
  ]
})
export class InitModule {


}
