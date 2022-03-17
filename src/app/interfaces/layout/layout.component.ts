import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../infrastructure/utils";
import {ChatService} from "../../application/service/chat.service";
import {CONNECT, INITDATAS, NEW_MSG, NICKNAMES, ONLINE, SENDMSG, SETTING} from "../../infrastructure/config";
import {Message} from "../../domain/entity/message";
import {SocketService} from "../../application/service/socket.service";
import {select, Store} from "@ngrx/store";
import {getSetting} from "../../infrastructure/store/selectors";
import {AppStoreModule} from "../../infrastructure/store/store.module";
import {Setting} from "../../infrastructure/store/reducers/settings.reducer";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  chat: any;
  loading = true;
  isInit = false;
  bg: string = 'https://www.wallpaperup.com/uploads/wallpapers/2016/10/03/1022492/63c97c977402a371a9bc4ec000704a83.jpg';
  messages: Message[] = [];
  users: any[] = [];
  user: any;
  setting: Setting = <any>{};

  constructor(
    private readonly wsService: SocketService,
    private store$: Store<AppStoreModule>,
    private readonly commentService: CommonService) {
    commentService.subscribe(CONNECT, (event: any) => {
      if (event) {
        this.initEvent();
      }
    });

    this.store$.pipe(select(SETTING as any), select(getSetting as any)).subscribe((res: any) => {
      this.setting = Object.assign(this.setting, res);
    });
    this.initEvent();
  }

  initEvent() {
    if (this.setting.inInit) {
      this.chat = new ChatService(this.wsService);
      this.commentService.subscribe(INITDATAS, (res: any) => {
        if (res && res.param) {
          this.messages.forEach(msg => {
            this.commentService.event(NEW_MSG, msg);
          });
          this.commentService.event(ONLINE, this.users);
        }
      });

      this.commentService.subscribe(SENDMSG, (res: any) => {
        if (res && res.param) {
          setTimeout(() => {
            this.chat.messages.next({nickname: this.setting.nickname});
          }, 300);
          this.chat.messages.next(res.param);
        }
      });

      this.chat.messages.subscribe((msg: any) => {
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
            this.users = nicknames;
            this.commentService.event(ONLINE, this.users);
          }
        }
      });
    }
  }

  messageType(message: any): number {
    if (message) {
      message = `${message}`.toLowerCase();
      if ((message.search('http') != -1 && (
        message.search('jpeg') != -1 ||
        message.search('png') != -1 ||
        message.search('gif') != -1 ||
        message.search('jpg') != -1 ||
        message.search('/null') != -1
      )) || message.search('data:image') != -1) {
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
