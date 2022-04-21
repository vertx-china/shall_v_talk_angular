import {Component, Input, OnInit} from '@angular/core';
import {CommonService, formatDate, getTime} from "../../../../infrastructure/utils";
import {DARK, LIGHT, THEME} from "../../../../infrastructure/config";
import {AnimationService} from "../../../../application/service/animation.service";
import {ANIMATES} from "../../../../domain/entity/animation";
import {Setting} from "../../../../infrastructure/store/reducers/settings.reducer";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.less']
})
export class TopComponent implements OnInit {

  @Input() setting: Setting = <any>{};
  time: any = null;

  constructor(
    private animate: AnimationService,
    private readonly commentService: CommonService) {
    setInterval(() => {
      this.time = formatDate(getTime());
    }, 1000);
  }

  changeTheme(theme: any) {
    theme = this.setting.theme == DARK ? LIGHT : DARK;
    this.animate.init(ANIMATES.Circle, 300).play(() => {
      this.commentService.event(THEME, theme);
    });
  }

  ngOnInit(): void {
  }
}
