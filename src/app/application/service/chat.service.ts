import {Injectable} from '@angular/core';
import {map, Subject} from "rxjs";
import {SocketService} from "./socket.service";
import {environment} from "../../../environments/environment";
import {Message} from "../../domain/entity/message";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Subject<Message>;

  constructor(wsService: SocketService) {
    this.messages = <Subject<Message>>wsService
      .connect(environment.webSocketUrl)
      .pipe(map((response: MessageEvent): Message => {
        let msg = JSON.parse(response.data);
        msg.formType = 0;
        return msg;
      }));
  }

}
