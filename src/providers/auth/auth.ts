import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public authState:any
  constructor(public http: HttpClient, public afAuth:AngularFireAuth) {
    this.observeStatus();
  }
  public observeStatus(){
    this.afAuth.authState.subscribe( (user) => {
      if( user ){
        this.authState = user;
      }
      else{
        this.authState = null;
      }
    });
  }
  public signUp(){

  }
  public signIn(){

  }
}
