import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {storage} from "../../infrastructure/utils";
import {NICKNAME} from "../../infrastructure/config";
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../../infrastructure/store/store.module";
import {getAnimatioVisible} from "../../infrastructure/store/selectors";
import {changeVisible} from "../../infrastructure/store/actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class InitComponent implements OnInit {
  loading = true;
  isInit = false;
  helpState = true;
  animation = true;
  nickname: any;
  constructor(private store$: Store<AppStoreModule>, private router: Router) {
    this.nickname = storage.getItem(NICKNAME);
    if (this.nickname) {
      this.isInit = true;
    }
    this.store$.pipe(select('isVisible' as any), select(getAnimatioVisible as any)).subscribe((res: any) => {
      this.animation = res;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      this.helpState = true;
    }, 350)
    if (!this.isInit) {
      setTimeout(() => {
        this.helpState = false;
      }, 3000)
    }
  }

  save() {
    if (this.nickname) {
      storage.setItem(NICKNAME, this.nickname);
      this.router.navigateByUrl('/');
    } else {
      console.log("昵称不能为空！")
    }
  }

  changeAnimation() {
    this.store$.dispatch(changeVisible());
  }
}
