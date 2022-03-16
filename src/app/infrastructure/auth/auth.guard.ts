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
import {NICKNAME} from "../config";
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../store/store.module";
import {getAnimatioVisible} from "../store/selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  animation:boolean = true ;

  constructor(private router: Router,
              private animate: AnimationService,
              private store$: Store<AppStoreModule>) {
      this.store$.pipe(select('isVisible' as any), select(getAnimatioVisible as any)).subscribe((res: any) => {
        this.animation = res;
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
      if (this.animation) {
        this.animate.init(animate, time).play();
      }
    }
    if (!environment.ignore.includes(state.url.replace("/", ""))) {
      if (storage.getItem(NICKNAME)) {
        return of(true);
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
