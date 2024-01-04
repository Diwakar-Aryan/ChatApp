import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { io } from 'socket.io-client';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})
export class ChatroomComponent implements OnInit {
  messageList: Array<any>;
  userList: Array<any>;
  showActive: boolean;
  sendForm: FormGroup;
  username: string;
  email: string;
  chatroom: string;
  currentOnline: boolean;
  receiveMessageObs: any;
  receiveActiveObs: any;
  noMsg: boolean;
  conversationId: string;
  notify: boolean;
  notification: any = { timeout: null };
  isTyping: boolean = false;
  private message: string;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService
  ) {
    this.chatService.newMessageReceived().subscribe((data) => {
      this.messageList.push(data);
      this.isTyping = false;
    });
    this.chatService.receivedTyping().subscribe((bool) => {
      this.isTyping = bool.isTyping;
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // ngOnInit(): void {
  //   this.username = this.route.snapshot.queryParamMap.get('name');
  //   this.email = this.route.snapshot.queryParamMap.get('email');
  //   let currentUser = this.userService.getLoggedInUser();
  //   if (currentUser.username < this.username) {
  //     this.chatroom = currentUser.username.concat(this.username);
  //   } else {
  //     this.chatroom = this.username.concat(currentUser.username);
  //   }
  //   this.chatService.joinRoom({
  //     user: this.userService.getLoggedInUser().username,
  //     room: this.chatroom,
  //   });
  //   this.userService.getChatRoomsChat(this.chatroom).then((messages) => {
  //     this.messageList = messages;
  //   });
  // }

  // sendMessage() {
  //   this.chatService.sendMessage({
  //     room: this.chatroom,
  //     user: this.userService.getLoggedInUser().username,
  //     message: this.message,
  //   });
  //   this.message = '';
  // }
  // typing() {
  //   this.chatService.typing({
  //     room: this.chatroom,
  //     user: this.userService.getLoggedInUser().username,
  //   });
  // }
}
