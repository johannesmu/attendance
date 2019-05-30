import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any;
  authState:BehaviorSubject<any> = new BehaviorSubject(this.user);
  authSub:Subscription;
  //default profile image 
  defaultProfileImage:string = 'https://firebasestorage.googleapis.com/v0/b/attendance-14ada.appspot.com/o/profile.png?alt=media&token=a805e70f-1cd8-4855-8479-b1bbe0eb2be3';

  constructor( private afAuth:AngularFireAuth ) { 
    this.authSub = this.afAuth.authState.subscribe(
      (user)=>{
        if( user ){
          this.user = user;
          this.authState.next( this.user );
        }
        else{
          this.user = null;
          this.authState.next( this.user );
        }
      }
    );
  }
  async signUp( email, password ){
    await this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then( (user) => {
      //set profile image
      this.afAuth.auth.currentUser.updateProfile({
        displayName: email,
        photoURL: this.defaultProfileImage
      });
      Promise.resolve( user );
    })
    .catch( (error) => {
      Promise.reject( error );
    });
  }

  async signIn( email,password ){
    await this.afAuth.auth.signInWithEmailAndPassword( email, password )
    .then( (user) => {
      Promise.resolve( user );
    })
    .catch( (error) => {
      Promise.reject( error );
    });
  }

  async signOut(){
    await this.afAuth.auth.signOut()
    .then( () => {
      Promise.resolve(true);
    })
  }
}
