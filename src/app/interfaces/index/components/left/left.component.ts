import {Component, Input, OnInit} from '@angular/core';
import {INITDATAS, NEW_MSG, ONLINE} from "../../../../infrastructure/config";
import {CommonService} from "../../../../infrastructure/utils";

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.less']
})
export class LeftComponent implements OnInit {
 users: any = [];

  constructor(private readonly commentService: CommonService) {
    if( this.users.length == 0 ){
      setTimeout(()=>{
        this.commentService.event(INITDATAS, true);
      },400);
    }
    this.commentService.subscribe(ONLINE, (event: any) => {
      if (event) {
        let {param} = event;
        this.users.push(param);
      }
    });
  }

  ngOnInit(): void {

  }

}
