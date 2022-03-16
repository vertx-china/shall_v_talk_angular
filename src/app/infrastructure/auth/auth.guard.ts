import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AnimationService} from "../../application/service/animation.service";
import {environment} from "../../../environments/environment";
import {storage} from "../utils";
import {SETTING} from "../config";
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../store/store.module";
import {getSetting} from "../store/selectors";
import {Setting} from "../store/reducers/settings.reducer";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  setting: Setting = <any>{};

  constructor(private router: Router,
              private animate: AnimationService,
              private store$: Store<AppStoreModule>) {
    this.store$.pipe(select(SETTING as any), select(getSetting as any)).subscribe((res: any) => {
      this.setting = Object.assign(this.setting, res);
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkInit(next, state);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkInit(next, state);
  }

  private checkInit(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let data: any = next.routeConfig?.data;
    if (data) {
      let animate = data.animate;
      let time = data.animateTime;
      if (!this.isEmpty(time)) {
        time = 500;
      }
      if (this.setting.animation) {
        this.animate.init(animate, time).play(null);
      }
    }
    if (!environment.ignore.includes(state.url.replace("/", ""))) {
      let setting = storage.getItem(SETTING);
      if (setting) {
        setting = JSON.parse(setting);
        if (setting.inInit) {
          return of(true);
        } else {
          this.router.navigateByUrl('/init');
        }
      } else {
        this.router.navigateByUrl('/init');
      }
    } else {
      return of(true);
    }
    return false;
  }

  private isEmpty(value: any): boolean {
    return value === undefined || value === 'undefined' || JSON.stringify(value) === '{}' || value === null ||
      typeof value === 'string' && value.length === 0 || value === false;
  }
}
