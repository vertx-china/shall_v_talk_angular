import {Component, Input, OnInit} from '@angular/core';
import {INITDATAS, ONLINE, SENDMSG} from "../../../../infrastructure/config";
import {CommonService} from "../../../../infrastructure/utils";
import {Setting} from "../../../../infrastructure/store/reducers/settings.reducer";

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.less']
})
export class LeftComponent implements OnInit {
  users: any = [];
  @Input() setting: Setting = <any>{};

  constructor(private readonly commentService: CommonService) {
    setTimeout(() => {
      this.commentService.event(SENDMSG, {nickname: this.setting.nickname});
    }, 3000);
    this.commentService.subscribe(ONLINE, (event: any) => {
      if (event) {
        let {param} = event;
        this.users = param.map((p: any) => {
          return {'username': p}
        });
      }
    });
  }

  ngOnInit(): void {

  }

}
