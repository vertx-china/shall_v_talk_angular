import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {metaReducers, reducers} from './reducers';
import {environment} from "../../../environments/environment";


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, {
      // @ts-ignore
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      }
    }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    })
  ]
})
export class AppStoreModule {
}
