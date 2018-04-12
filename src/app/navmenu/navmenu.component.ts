import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '../authHelper/authHelper';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent {

    accessToken;
    IdToken;
    IdTokenExp;
    IdTokenIssuedAt;

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

  getAccessToken(): void {
    this.authService.getAccessToken().then(
        accessToken => {
            this.accessToken  = accessToken;
          console.log('ACCESS TOKEN: \n ' + this.accessToken);
        },
        acquireTokenSilentError => {
          console.log('acquireTokenSilent- Error:\n' + acquireTokenSilentError);
        }
        );
  }

  getIdToken(): void {
    this.IdToken = this.authService.getIdToken();
    this.IdTokenExp = new Date(this.IdToken.exp * 1000);
    this.IdTokenIssuedAt = new Date(this.IdToken.iat * 1000);
}

}
