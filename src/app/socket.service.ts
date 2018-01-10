import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) { }

  sendMessage(msg: string) {
    this.socket.emit("message", msg);
  }

  getMessage() {
    return this.socket
      .fromEvent<any>("message")
      .map(data => data.msg);
  }

  close() {
    this.socket.disconnect()
  }

}
