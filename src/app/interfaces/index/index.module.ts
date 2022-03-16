import {NgModule} from '@angular/core';
import {IndexComponent} from "./index.component";
import {IndexRoutingModule} from "./index-routing.module";
import {LeftComponent} from './components/left/left.component';
import {CenterComponent} from './components/center/center.component';
import {RightComponent} from './components/right/right.component';
import {CommonModule} from "@angular/common";
import {TopComponent} from './components/top/top.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [IndexComponent, LeftComponent, CenterComponent, RightComponent, TopComponent],
    imports: [
        IndexRoutingModule,
        CommonModule,
        FormsModule,
    ]
})
export class IndexModule {


}
