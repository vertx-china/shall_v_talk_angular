import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {AnimationService} from "../../application/service/animation.service";
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../store/store.module";
import {getAnimatioVisible} from "../store/selectors";

@Injectable({
  providedIn: 'root'
})
export class PermissionResolve implements Resolve<any> {

  animation: boolean = true;

  constructor(private router: Router, private animate: AnimationService, private store$: Store<AppStoreModule>) {
    this.store$.pipe(select('isVisible' as any), select(getAnimatioVisible as any)).subscribe((res: any) => {
      this.animation = res;
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let data: any = route.routeConfig?.data;
    if (data) {
      if (this.animation) {
        this.animate.hide(data.animateTime);
      }
    }
    return true;
  }
}
