import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../../infrastructure/store/store.module";
import {getSetting} from "../../infrastructure/store/selectors";
import {Router} from "@angular/router";
import {Setting} from "../../infrastructure/store/reducers/settings.reducer";
import {cacheSettings} from "../../infrastructure/store/actions";
import {CONNECT, SETTING} from "../../infrastructure/config";
import {CommonService} from "../../infrastructure/utils";

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.less']
})
export class InitComponent implements OnInit {
  loading = true;
  helpState = true;
  setting: Setting = <any>{};

  constructor(
    private router: Router,
    private store$: Store<AppStoreModule>,
    private readonly commentService: CommonService) {
    this.store$.pipe(select(SETTING as any), select(getSetting as any)).subscribe((res: any) => {
      let obj = {};
      this.setting = Object.assign(obj, res);
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      this.helpState = true;
    }, 350)
    if (!this.setting.inInit) {
      setTimeout(() => {
        this.helpState = false;
      }, 3000)
    }
  }

  save() {
    if (this.setting.nickname) {
      this.setting.inInit = true;
      this.changeSetting();
      this.commentService.event(CONNECT, true);
      this.router.navigateByUrl('/');
    } else {
      console.log("昵称不能为空！")
    }
  }

  changeSetting() {
    this.store$.dispatch(cacheSettings({setting: this.setting}));
  }
}
