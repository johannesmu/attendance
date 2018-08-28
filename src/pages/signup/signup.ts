import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private email:string;
  private password:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password)
    .then((result) => {
        this.user = result;
        // this.navCtrl.push( ListPage );
     });
  }
}
