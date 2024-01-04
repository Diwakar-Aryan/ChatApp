import { Injectable } from '@angular/core';
import axios from 'axios';

export const AUTH_TOKEN_KEY = 'auth-token';
export const AUTH_USER_DATA = 'user-data';
@Injectable()
export class UserService {
  public authToken: string | null = null;
  public userData: any | null = null;

  saveUser(user) {
    return axios.post('http://localhost:3000/api/signUp', user);
  }

  async login(user) {
    let res = await axios.post('http://localhost:3000/api/signIn', user);
    if (res.status == 200) {
      console.log(res.data);

      sessionStorage.setItem(AUTH_TOKEN_KEY, res.data.token + 'Random_String');
      sessionStorage.setItem(
        AUTH_USER_DATA,
        JSON.stringify(res.data.user_data)
      );
      this.checkLocalStorage();

      return true;
    } else {
      return false;
    }
  }

  getUsers() {
    return axios.get('http://localhost:3000/api/users');
  }

  async getChatRoomsChat(chatRoom) {
    let data = await axios.get('http://localhost:3000/chatroom/' + chatRoom);
    return data.data || [];
  }

  getLoggedInUser() {
    return sessionStorage.getItem(AUTH_USER_DATA);
  }

  hasAccess(): boolean {
    return sessionStorage.getItem(AUTH_TOKEN_KEY) !== null;
  }

  checkLocalStorage() {
    const authToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
    const userData = sessionStorage.getItem(AUTH_USER_DATA);
    this.authToken = authToken;
    if (userData) {
      this.userData = JSON.parse(userData) as any;
    } else {
      this.userData = null;
    }
    console.log(this.authToken, this.userData);
  }
}
