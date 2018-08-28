import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
// import { auth } from 'firebase';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private email:string;
  private password:string;
  public user:any;
  constructor(public navCtrl: NavController, public afAuth:AngularFireAuth ) {

  }
  signUp(){
    console.log( this.email, this.password );
    this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password)
    .then((result) => {
        this.user = result;
        // this.navCtrl.push( ListPage );
     });
  }
}
