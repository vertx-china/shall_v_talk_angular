import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';
import {LayoutRoutingModule} from "./layout-routing.module";
import {AppStoreModule} from "../../infrastructure/store/store.module";
import {SliderComponent} from "./components/slider/slider.component";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    LayoutComponent, SliderComponent
  ],
  imports: [
    AppStoreModule,
    LayoutRoutingModule,
    CommonModule,
  ]
})
export class LayoutModule {
}
