
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public user:any;
  public displayName:string;
  constructor(public afAuth:AngularFireAuth) {
    this.observeStatus();
  }
  public observeStatus(){
    this.afAuth.authState.subscribe( (user) => {
      if( user ){
        this.user = user;
        this.displayName = ( user.displayName ) ? user.displayName : '';
      }
      else{
        this.user = null;
      }
    });
  }
  public signUp(username,email,password){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .catch((error) => { return error });
    this.updateUserProfile(username);
  }
  public signOut(){
    this.afAuth.auth.signOut();
  }
  updateUserProfile(username:string){
    this.afAuth.authState.subscribe( (user) => {
      if( user ){
        user.updateProfile({
          displayName: username,
          photoURL: ''
        });
      }
    });
  }
  public signIn(email,password){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then( (user) => { console.log(user) })
    .catch( (error) => { console.log(error) });
  }
}
