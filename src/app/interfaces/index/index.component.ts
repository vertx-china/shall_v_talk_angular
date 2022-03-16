import {Component, OnInit} from '@angular/core';
import {CommonService, storage} from "../../infrastructure/utils";
import {ChatService} from "../../application/service/chat.service";
import { NICKNAME,  SENDMSG} from "../../infrastructure/config";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  loading: boolean = true;

  constructor(
    private chat: ChatService,
    private readonly commentService: CommonService) {
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      this.commentService.event(SENDMSG, {nickname: storage.getItem(NICKNAME)});
    }, 350)
  }

}
