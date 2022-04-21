import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {storage} from "../../../../infrastructure/utils";
import {SETTING} from "../../../../infrastructure/config";
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../../../../infrastructure/store/store.module";
import {Setting} from "../../../../infrastructure/store/reducers/settings.reducer";
import {getSetting} from "../../../../infrastructure/store/selectors";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {
  active: any = 1;
  menus: any = [
    {icon: 'chat', path: 'index'},
    {icon: 'setting', path: 'init'},
  ];
  setting: Setting = <any>{};

  constructor(
    private router: Router,
    private store$: Store<AppStoreModule>) {
    this.active = window.location.href.search(this.menus[0]['path']) != -1 ? 0 : 1;
    this.store$.pipe(select(SETTING as any), select(getSetting as any)).subscribe((res: any) => {
      this.setting = Object.assign(this.setting, res);
    });
  }


  ngOnInit(): void {
  }

  navtoPage(menu: any, index: any): void {
    if (this.setting.inInit) {
      this.navigateByUrl(menu.path);
      this.active = index;
    }
  }

  exit(): void {
    storage.removeItem(SETTING);
    window.location.reload();
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url, {replaceUrl: true});
  }
}
