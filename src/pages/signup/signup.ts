import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private email:string;
  private password:string;
  private username:string;
  private error:string = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth:AngularFireAuth,
    private authService:AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp(){
    this.authService.signUp(this.username,this.email,this.password);
  }
  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
