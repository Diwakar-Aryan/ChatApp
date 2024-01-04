import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Message } from '../models/message.model';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  private socket: any = io('http:localhost:3001');
  private apiUrl: string = `127.0.0.1/messages`;
  private usersUrl: string = `127.0.0.1/users`;

  constructor() {}

  joinRoom(data: any) {
    console.log(data);
    this.socket.emit('join', data);
  }
  sendMessage(data: any) {
    this.socket.emit('message', data);
  }
  newMessageReceived() {
    const observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('new message', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }
  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean }>((observer) => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
