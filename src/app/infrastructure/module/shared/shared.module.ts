import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PipesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {
}
