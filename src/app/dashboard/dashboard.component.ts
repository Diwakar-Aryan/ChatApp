import { Component, OnInit } from '@angular/core';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isLoggedin: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.isLoggedin = userService.hasAccess();
    if (window.location.pathname === '/login') {
      this.isLoggedin = false;
    }
  }
}
