import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

import { AuthHelper } from '../../authHelper/authHelper';
import { CONFIG } from '../../config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  userInfo: string[];
  currentLoginName: string;
  currentLoginID: string;

  MsGraphToken: string;
  searchString: string;

  private _router: Router;
  constructor(
      private _auth: AuthHelper, 
      router: Router) {
      this._router = router;
  }

  ngOnInit() {
   // this.checkLogin();
  }

  checkLogin() {
  if (this._auth.isOnline()) {
      console.log('LOGIN: Authenticated');
      this.isAuthenticated = true;
      const user = this._auth.getCurrentLogin();

      this.currentLoginID = user.displayableId;
      this.currentLoginName = user.name;
    } else {
      console.log('LOGIN: Not Authenticated');
      this.isAuthenticated = false;
    }
  }
}