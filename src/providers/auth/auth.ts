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
  public user:any;
  constructor(public http: HttpClient, public afAuth:AngularFireAuth) {
    this.observeStatus();
  }
  public observeStatus(){
    this.afAuth.authState.subscribe( (user) => {
      if( user ){
        this.user = user;
      }
      else{
        this.user = null;
      }
    });
  }
  public signUp(username,email,password){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then( (user) => {
      this.updateUserProfile(user,username,'');
    })
    .catch( (error) =>{
      //handle errors
    });
  }
  private updateUserProfile(user,username,url){
    //set user displayName
    user.updateProfile({
      displayName: username,
      photoURL: url
    })
    .then( () => {
      this.user.displayName = username;
    })
    .catch( (error) =>{
      //handle error
    });
  }
  public signIn(){

  }
}
