import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '../authHelper/authHelper';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent {

  constructor(private  authService: AuthHelper) { }

  login(): void {
      this.authService.login();
  }

  logout(): void {
      this.authService.logout();
  }

  get isOnline(): boolean {
      return this.authService.isOnline();
  }

  get user(): string {
      return this.authService.getCurrentLogin().name;
  }

  getToken(): void {
      this.authService.getToken();
  }

}
