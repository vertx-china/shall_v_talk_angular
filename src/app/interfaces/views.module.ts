import {NgModule} from '@angular/core';

import {ViewsRoutingModule} from './views-routing.module';
import {LayoutModule} from "./layout/layout.module";

@NgModule({
  imports: [
    ViewsRoutingModule,
    LayoutModule,
  ],
  declarations: []
})
export class ViewsModule {
}
