import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../infrastructure/utils";
import {ChatService} from "../../application/service/chat.service";
import {CONNECT, INITDATAS, NEW_MSG, NICKNAMES, ONLINE, SENDMSG, SETTING, TIP} from "../../infrastructure/config";
import {Message} from "../../domain/entity/message";
import {SocketService} from "../../application/service/socket.service";
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../../infrastructure/store/store.module";
import {Setting} from "../../infrastructure/store/reducers/settings.reducer";
import {getSetting} from "../../infrastructure/store/selectors";

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
  showState: any = false;
  animatedClass: any = "slideInRight";
  text: string = '';
  pattern = /https:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?\/(jpg|png|jpeg|gif|null)/gi;

  constructor(
    private readonly wsService: SocketService,
    private store$: Store<AppStoreModule>,
    private readonly commentService: CommonService) {
    commentService.subscribe(CONNECT, (event: any) => {
      if (event) {
        this.initEvent();
      }
    });

    /**
     * @see  NoticeComponent
     * @deprecated 下个版本封装组件
     */
    commentService.subscribe(TIP, (event: any) => {
      if (event && !this.showState) {
        let {param} = event;
        let {type, text} = param;
        this.text = text;
        let openClass = "slideInRight";
        let closeClass = "hinge";
        if (type == 0) {
          closeClass = "hinge";
        } else {
          closeClass = "flipOutX";
        }
        setTimeout(() => {
          setTimeout(() => {
            this.animatedClass = openClass;
            this.showState = false;
            setTimeout(() => {
              this.showState = true;
              this.animatedClass = closeClass;
              setTimeout(() => {
                this.showState = false;
                this.animatedClass = openClass;
              }, type == 0 ? 2000 : 500)
            }, 0);
          }, 1500);
          this.showState = true;
        }, 10);
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
          if (msg.type == 1) {
            msg.message = this.load(msg.message);
          }
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
    var reg = new RegExp(this.pattern, "i");
    if (message) {
      message = `${message}`.toLowerCase();
      if (reg.test(message) || message.search('data:image') != -1) {
        return 1;
      } else if (message.search('http:\\/\\/') != -1 || message.search('https:\\/\\/') != -1) {
        return 2;
      } else {
        return 0;
      }
    }
    return 0;
  }

  load(message: any) {
    let key = "GGGGG";
    let html = '';
    let match = message.match(this.pattern);
    if (match) {
      match.forEach((a: any) => {
        message = message.replace(a, key);
      });
      let arr = message.split(key)
      arr.forEach((a: any) => {
        if (a && a.trim() != '') {
          html += `<div  class="message-box0-right-innerhtml-text" >${a}</div>`
        }
      })
      match.forEach((a: any) => {
        html += `<img src="${a}" class="message-box0-right-innerhtml-img">`
      })
    }
    return html;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
