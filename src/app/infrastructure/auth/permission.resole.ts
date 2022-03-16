import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {AnimationService} from "../../application/service/animation.service";
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../store/store.module";
import {SETTING} from "../config";
import {getSetting} from "../store/selectors";
import {Setting} from "../store/reducers/settings.reducer";

@Injectable({
  providedIn: 'root'
})
export class PermissionResolve implements Resolve<any> {

  setting: Setting = <any>{};

  constructor(private router: Router, private animate: AnimationService, private store$: Store<AppStoreModule>) {
    this.store$.pipe(select(SETTING as any), select(getSetting as any)).subscribe((res: any) => {
      this.setting = res;
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let data: any = route.routeConfig?.data;
    if (data) {
      if (this.setting.animation) {
        this.animate.hide(data.animateTime);
      }
    }
    return true;
  }
}
