
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';



@Injectable()
export class AuthProvider {
  public user:any;
  public displayName:string;
  public uid:string;
  public error:string = null;
  constructor(public afAuth:AngularFireAuth) {
    this.observeStatus();
  }
  public observeStatus(){
    this.afAuth.authState.subscribe( (user) => {
      if( user ){
        this.user = user;
        this.displayName = ( user.displayName ) ? user.displayName : '';
        this.uid = user.uid;
      }
      else{
        this.user = null;
        this.displayName = null;
        this.uid = null;
      }
    });
  }
  public signUp(username,email,password){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then( (user) => {
        this.user = user;
        this.updateUserProfile(username);
    })
    .catch((error) => { return error });
  }
  public signOut(){
    // if(this.dataService.classSub){
    //   this.dataService.classSub.unsubscribe();
    // }
    // if(this.dataService.studentsSub){
    //   this.dataService.studentsSub.unsubscribe();
    // }
    // if(this.dataService.sessionsSub){
    //   this.dataService.sessionsSub.unsubscribe();
    // }
    let signout = this.afAuth.auth.signOut();
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
    .then( (user) => {
      this.user = user;
      return true; })
    .catch( (error) => {
      this.error = error.message;
      return false;
    });
  }
  public getError(){
    return new Promise((resolve, reject) => {
      let err = this.error;
      if(err !== null ){
        resolve(err);
      }
      else{
        reject('no error');
      }
    });
  }
}
