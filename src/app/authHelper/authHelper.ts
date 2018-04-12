import { Component, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import * as Msal from 'msal';


import { CONFIG as C } from '../config';
import { Observable } from 'rxjs/Observable';


const CONFIG = C.Settings;

@Injectable()
export class AuthHelper {
  public access_token = null;

  public app: Msal.UserAgentApplication = null;
  public user;
  public isAuthenticated = false;

  constructor() {
    const logger = new Msal.Logger(this.loggerCallback, { level: Msal.LogLevel.Verbose, correlationId: '12345' });
    this.app = new Msal.UserAgentApplication(CONFIG.CLIENT_ID,  CONFIG.AUTHORITY, this.authCallback
  //      (errorDesc, token, error, tokenType) => {
  //     // This function is called after loginRedirect and acquireTokenRedirect. Use tokenType to determine context. 
  //     // For loginRedirect, tokenType = "id_token". For acquireTokenRedirect, tokenType:"access_token".
  //   if (token) {
  //       console.log('loginRedirect- Success');
  //     } else {
  //       console.log('Error during login:\n' + error);
  //       console.log('Error Description of login error:', errorDesc);
  //     }
  // }
  , { logger: logger, cacheLocation: 'localStorage',
    redirectUri: CONFIG.REDIRECT_URI,
    navigateToLoginRequestUrl: false});
    // this.app = new Msal.UserAgentApplication(
    //   CONFIG.CLIENT_ID,
    //   null,
    //   (errorDesc, token, error, tokenType) => {
    //     // callback for login redirect
    //     if (error) {
    //       console.log(JSON.stringify(error));
    //       return;
    //     }
    //     console.log('Callback for login');
    //     this.access_token = token;
    //   });
   //  this.app.redirectUri = CONFIG.REDIRECT_URI;
  }

   public loggerCallback(logLevel, message, piiLoggingEnabled) {
            console.log(message);
        }

    authCallback = (errorDesc, token, error, tokenType) => {
      // This function is called after loginRedirect and acquireTokenRedirect. Use tokenType to determine context. 
      // For loginRedirect, tokenType = "id_token". For acquireTokenRedirect, tokenType:"access_token".
    if (token) {
        console.log('loginRedirect- Success');
        this.app.acquireTokenSilent(CONFIG.SCOPES).then(
          accessToken => {
            this.access_token = accessToken;
            console.log('ACCESS TOKEN: \n ' + this.access_token);
            this.user = this.app.getUser(); // AZURE AD
            this.isAuthenticated = true;
          },
          acquireTokenSilentError => {
            console.log('acquireTokenSilent- Error:\n' + acquireTokenSilentError);
            this.app.acquireTokenRedirect(CONFIG.SCOPES).then(accessToken => {
              console.log('acquireTokenRedirect- Success:\n' + accessToken);
            },
            acquireTokenRedirectError => {
              console.log('acquireTokenRedirect- Error:\n' + acquireTokenRedirectError);
            });
          }
        );
      } else {
        console.log('Error during login:\n' + error);
        console.log('Error Description of login error:', errorDesc);
      }
  }

  public login() {
  //   return this.app.loginPopup(CONFIG.SCOPES).then((idToken) => {
  //     //Login Success
  //     console.log('loginPopup- Success');
  //     this.app.acquireTokenSilent(CONFIG.SCOPES).then(
  //       (accessToken) => {
  //         console.log('acquireTokenSilent- Success');
  //         //AcquireToken Success
  //         this.access_token = accessToken;
  //         console.log('ACCESS TOKEN: \n ' + this.access_token);
  //         this.user = this.app.getUser(); // AZURE AD
  //         this.isAuthenticated = true;
  //     },  (error) => {
  //       console.log('acquireTokenSilent- Error');
  //         //AcquireToken Failure, send an interactive request.
  //         this.app.acquireTokenPopup(CONFIG.SCOPES).then(
  //           (accessToken) => {
  //             console.log('acquireTokenPopup- Success');
  //         }, (e) => {
  //           console.log('acquireTokenPopup- error');
  //             console.log(e);
  //         });
  //     });
  // }, (error)=> {
  //    console.log('loginPopup-Error');
  //     console.log(error);
  // });
    return this.app.loginRedirect(CONFIG.SCOPES);
  }

  public logout() {
    this.app.logout();
  }

  public isOnline(): boolean {
    return this.app.getUser() != null;
  }

  public getCurrentLogin() {
    const user = this.app.getUser();
    return user;
  }

  getIdToken() {
       return this.app.getUser().idToken;

  }
  public getAccessToken() {
    return this.app.acquireTokenSilent(CONFIG.SCOPES);
   }

  public assignAccessToken() {
    return this.app.acquireTokenSilent(CONFIG.SCOPES).then(
      accessToken => {
        this.access_token = accessToken;
        console.log('ACCESS TOKEN: \n ' + this.access_token);
        this.user = this.app.getUser(); // AZURE AD
        this.isAuthenticated = true;
      },
      acquireTokenSilentError => {
        console.log('acquireTokenSilent- Error:\n' + acquireTokenSilentError);
        this.app.acquireTokenRedirect(CONFIG.SCOPES).then(accessToken => {
          console.log('acquireTokenRedirect- Success:\n' + accessToken);
        },
        acquireTokenRedirectError => {
          console.log('acquireTokenRedirect- Error:\n' + acquireTokenRedirectError);
        });
      }
    );
   }
}