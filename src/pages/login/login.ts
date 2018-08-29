import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth'
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private email:string;
  private password:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goToSignUp(){
    this.navCtrl.setRoot(SignupPage);
  }
  signIn(){
    this.authService.signIn(this.email,this.password);
  }
}
