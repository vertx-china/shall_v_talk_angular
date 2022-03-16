import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./infrastructure/module";
import {Setting} from "./infrastructure/store/reducers/settings.reducer";
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "./infrastructure/store/store.module";
import {DARK, SETTING} from "./infrastructure/config";
import {getSetting} from "./infrastructure/store/selectors";
import {cacheSettings} from "./infrastructure/store/actions";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  setting: Setting = <any>{};

  constructor(
    private store$: Store<AppStoreModule>) {
    this.store$.pipe(select(SETTING as any), select(getSetting as any)).subscribe((res: any) => {
      if (res) {
        this.setting = Object.assign(this.setting, res);
      } else {
        this.setting = Object.assign(this.setting, {
          animation: true,
          inInit: false,
          theme: DARK,
          nickname: undefined,
        });
        this.changeSetting();
      }
    });
  }

  changeSetting() {
    this.store$.dispatch(cacheSettings({setting: this.setting}));
  }
}
