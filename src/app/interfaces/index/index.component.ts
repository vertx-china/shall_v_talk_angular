import {Component, OnInit} from '@angular/core';
import {CommonService, storage} from "../../infrastructure/utils";
import {NICKNAME, SENDMSG, SETTING, THEME} from "../../infrastructure/config";
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../../infrastructure/store/store.module";
import {AnimationService} from "../../application/service/animation.service";
import {getSetting} from "../../infrastructure/store/selectors";
import {Setting} from "../../infrastructure/store/reducers/settings.reducer";
import {cacheSettings} from "../../infrastructure/store/actions";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  setting: Setting = <any>{};
  loading: boolean = true;
  showExpressionPanel: boolean = false;

  constructor(
    private animate: AnimationService,
    private store$: Store<AppStoreModule>,
    private readonly commentService: CommonService) {
    this.store$.pipe(select(SETTING as any), select(getSetting as any)).subscribe((res: any) => {
      let obj = {};
      this.setting = Object.assign(obj, res);
      this.animate.hide(null);
    });
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 350)

    this.commentService.subscribe(THEME, (event: any) => {
      if (event) {
        let {param} = event;
        this.setting.theme = param;
        this.store$.dispatch(cacheSettings({setting: this.setting}));
      }
    });
  }
}
