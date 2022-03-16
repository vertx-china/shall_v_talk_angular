import {Component, ElementRef, OnInit} from '@angular/core';
import {Message} from "../../../../domain/entity/message";
import {CommonService, formatDate, getTime} from "../../../../infrastructure/utils";
import {INITDATAS, NEW_MSG, SENDMSG} from "../../../../infrastructure/config";

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less']
})
export class CenterComponent implements OnInit {

  active: string = 'dark';
  messages: Message[] = [];
  content: any;
  msg: any = {};

  constructor(private el: ElementRef,
              private readonly commentService: CommonService) {

    if (this.messages.length == 0) {
      setTimeout(()=>{
        this.commentService.event(INITDATAS, true);
      },400);
    }
    this.commentService.subscribe(NEW_MSG, (event: any) => {
      if (event) {
        let {param} = event;
        this.messages.push(param);
        this.scrollToBottom();
      }
    });
  }


  ngOnInit(): void {
    this.content = this.el.nativeElement.querySelector('#content');
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollTop = this.content.scrollHeight + 500;
    }, 150);
  }

  changeTheme() {
    this.active = this.active == 'light' ? 'dark' : 'light';
  }

  sendMsg() {
    this.commentService.event(SENDMSG, this.msg);
    this.scrollToBottom();
    this.msg.formType = 1;
    this.msg.time = formatDate(getTime());
    this.messages.push(this.msg);
    this.msg = {};
  }
}
