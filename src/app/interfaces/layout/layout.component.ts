import {Component, OnInit} from '@angular/core';
import {CommonService, storage} from "../../infrastructure/utils";
import {ChatService} from "../../application/service/chat.service";
import {INITDATAS, NEW_MSG, NICKNAME, NICKNAMES, ONLINE, SENDMSG} from "../../infrastructure/config";
import {Message} from "../../domain/entity/message";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  loading = true;
  bg: string = 'https://www.wallpaperup.com/uploads/wallpapers/2016/10/03/1022492/63c97c977402a371a9bc4ec000704a83.jpg';

  messages: Message[] = [];
  users: any[] = [];
  user: any;

  constructor(
      private chat: ChatService,
      private readonly commentService: CommonService) {
    commentService.subscribe(INITDATAS, (res: any) => {
      if (res && res.param) {
        this.messages.forEach(msg => {
          this.commentService.event(NEW_MSG, msg);
        });
        this.users.forEach(user => {
          this.commentService.event(ONLINE, user);
        });
      }
    });
    commentService.subscribe(SENDMSG, (res: any) => {
      if (res && res.param) {
        setTimeout(() => {
          chat.messages.next({nickname: storage.getItem(NICKNAME), id: this.user.id});
        }, 300);
        chat.messages.next(res.param);
      }
    });
    chat.messages.subscribe((msg: any) => {
      if (msg.nickname) {
        msg.type = this.messageType(msg.message);
        msg.formType = 0;
        this.messages.push(msg);
        this.commentService.event(NEW_MSG, msg);
      } else if (!(msg.nickname) && msg.id) {
        this.user = msg;
      } else {
        if (msg[NICKNAMES]) {
          let nicknames = msg[NICKNAMES];
          nicknames.forEach((n: any) => {
            let user = {username: n, head: ''};
            this.commentService.event(ONLINE, user);
            this.users.push(user)
          })
        }
      }
    });
  }


  messageType(message: any): number {
    if (message) {
      message = message.toLowerCase();
      if (message.search('http') != -1 && (
          message.search('jpeg') != -1 ||
          message.search('png') != -1 ||
          message.search('gif') != -1 ||
          message.search('jpg') != -1
      )) {
        return 1;
      } else if (message.search('http') != -1) {
        return 2;
      } else {
        return 0;
      }
    }
    return 0;
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
